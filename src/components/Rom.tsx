import { Component, h } from 'preact';

import { WasmCore } from '../types';
import { readProgramAsBytes } from '../utils/wasmUtils';

interface Props {
    wasm8Core: WasmCore;
    setROMLoaded: () => void;
};

interface State {};

export class Rom extends Component<Props, State> {
    componentDidMount() {};

    loadProgram = (file: File, name: string) => {
        const { exports } = this.props.wasm8Core.instance;

        const task = async () => {
            const buffer = await readProgramAsBytes(file);

            this.props.wasm8Core.memory.set(buffer, exports.CHIP8_PROGRAM_RAM_START);
            console.log(this.props.wasm8Core.memory);
        };
    
        const runTask = task();
    
        runTask.then(() => this.props.setROMLoaded());
        runTask.catch(err => {
            console.log('[Rom - loadProgram] Error loading program', err);
        });
    };

    handleChange = (e) => {
        const file = e.target.files[0];
        const name = e.target.files[0].name;

        this.loadProgram(file, name);
    };

    render() {
        return (
            <div>
                <input 
                    type='file' 
                    accept='.ch8'
                    onChange={this.handleChange}
                />
            </div>
        );
    };
};
