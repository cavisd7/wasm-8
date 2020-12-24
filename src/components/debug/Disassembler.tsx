import { Component, h } from "preact";
import classnames from 'classnames';

import "../styles/debug-disassembler.css";

import { WasmCore } from '../../types';
import { dissassemble } from '../../utils/wasmUtils';

import { Container } from './ui/Container';

interface Props {
    wasm8Core: WasmCore;
    isRomLoaded: boolean;
};

interface State {
    instructions: string[];
    selected: number;
};

export class Disassembler extends Component<Props, State> {
    constructor(props) {
        super(props);

        this.state = {
            instructions: [],
            selected: null
        };
    };

    componentDidUpdate(prevProps: Props, prevState: State) {
        const { wasm8Core, isRomLoaded } = this.props;

        if (isRomLoaded && !prevProps.isRomLoaded) {
            const programMemory = new Uint8Array(
                wasm8Core.memory.buffer, 
                wasm8Core.instance.exports.CHIP8_PROGRAM_RAM_START, 
                wasm8Core.instance.exports.CHIP8_PROGRAM_RAM_SIZE
            );

            const instructions = [];

            for (let i = 0; i < programMemory.length; i++) {
                if (i % 2) {
                    let opcode = (programMemory[i - 1] << 8) | programMemory[i];
                    let instruction = dissassemble(opcode);

                    if (instruction) {
                        instructions.push(instruction);
                    };
                };
            };

            this.setState({ instructions });
        };

        if (prevProps.isRomLoaded && !this.props.isRomLoaded) {
            this.setState({ instructions: [] });
        }
    };

    render() {
        const { instructions, selected } = this.state;

        return (  
            <Container heading='Disassembly'>
                <div className='disassembly-content scrollbar'>
                    <ul>
                        {
                            instructions.map((instruction, i) => {
                                return (
                                    <li 
                                        key={i}
                                        onClick={() => this.setState({ selected: i })}
                                        className={
                                            classnames({'list-item-selected': i == selected})
                                        }
                                    >
                                        {instruction}
                                    </li>
                                );
                            })
                        }
                    </ul>
                </div>
            </Container>
        );
    };
};
