import { Component, h } from "preact";

import "../styles/debug-memory.css";

import { WasmCore } from '../../types';
import { deepCompare } from '../../utils/object';

import { Container } from './ui/Container';

interface Props {
    wasm8Core: WasmCore;
};

interface State {
    memory: number[];
};

export class MemoryViewer extends Component<Props, State> {
    private updateInterval;

    constructor(props) {
        super(props);

        this.state = {
            memory: new Array(4096).fill(0)
        };
    };

    componentDidMount() {
        this.updateInterval = setInterval(() => this.handleUpdate(), 2);
    };

    shouldComponentUpdate(_: Props, nextState: State) {
        return !deepCompare(this.state, nextState);
    };

    componentDidUpdate() {
        //console.log('[MemoryViewer] componentDidUpdate');
    };

    componentWillUnmount() {
        clearInterval(this.updateInterval);
    };

    handleUpdate = () => {
        const { wasm8Core } = this.props;
    
        const memory = new Uint8Array(
            wasm8Core.memory.buffer, 
            wasm8Core.instance.exports.CHIP8_RESERVED_START, 
            4096
        );

        this.setState({ memory: Array.from(memory) });
    };

    createTableRows = () => {
        let table = [];

        for (let i = 0; i < 256; i++) {
            let rowItems = [];

            for (let j = 0; j < 16; j++) {
                if (j == 0) {
                    rowItems.push(<th>{i}</th>);
                };

                rowItems.push(<td>{this.state.memory[j + i * 16].toString(16)}</td>);
            };

            table.push(<tr>{rowItems}</tr>);
        };

        return table;
    };

    render() {
        return (
            <Container heading='Memory'>
                <div className='memory-content scrollbar'>
                    <table className='memory-table'>
                        <thead className='memory-thead'>
                            <tr>
                                <th></th>
                                <td>00</td>
                                <td>01</td>
                                <td>02</td>
                                <td>03</td>
                                <td>04</td>
                                <td>05</td>
                                <td>06</td>
                                <td>07</td>
                                <td>08</td>
                                <td>09</td>
                                <td>0A</td>
                                <td>0B</td>
                                <td>0C</td>
                                <td>0D</td>
                                <td>0E</td>
                                <td>0F</td>
                            </tr>
                        </thead>
                        <tbody className='memory-tbody'>
                            {this.createTableRows()}
                        </tbody>
                    </table>
                </div>
            </Container>
        );
    };
};