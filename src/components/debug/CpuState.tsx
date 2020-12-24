import { Component, Fragment, h } from "preact";

import "../styles/debug-cpu-state.css";

import { WasmCore } from '../../types';
import { deepCompare } from '../../utils/object';
import { Container } from "./ui/Container";

import { CpuStateItem } from './ui/CpuStateItem';

interface Registers {
    v0: string;
    v1: string;
    v2: string;
    v3: string;
    v4: string;
    v5: string;
    v6: string;
    v7: string;
    v8: string;
    v9: string;
    va: string;
    vb: string;
    vc: string;
    vd: string;
    ve: string;
    vf: string;
};

interface ICpuState {
    opcode: string;
    pc: string;
    sp: string;
    i: string;
};

interface Props {
    wasm8Core: WasmCore;
    startProgram: () => void;
    stopProgram: () => void;
};

interface State {
    registers: Registers;
    cpuState: ICpuState;
};

export class CpuState extends Component<Props, State> {
    private updateInterval;

    constructor(props) {
        super(props);

        this.state = {
            registers: {
                v0: '0',
                v1: '0',
                v2: '0',
                v3: '0',
                v4: '0',
                v5: '0',
                v6: '0',
                v7: '0',
                v8: '0',
                v9: '0',
                va: '0',
                vb: '0',
                vc: '0',
                vd: '0',
                ve: '0',
                vf: '0'
            },
            cpuState: {
                opcode: '0',
                pc: '0',
                sp: '0',
                i: '0',
            }
        };
    };

    componentDidMount() {
        this.updateInterval = setInterval(() => this.handleUpdate(), 2);
    };

    shouldComponentUpdate(_: Props, nextState: State) {
        return !deepCompare(this.state, nextState);
    };

    componentWillUnmount() {
        clearInterval(this.updateInterval);
    };

    handleUpdate() {
        const { wasm8Core } = this.props;

        const registers: Registers = {
            v0: wasm8Core.instance.exports.getRegisterV0().toString(16),
            v1: wasm8Core.instance.exports.getRegisterV1().toString(16),
            v2: wasm8Core.instance.exports.getRegisterV2().toString(16),
            v3: wasm8Core.instance.exports.getRegisterV3().toString(16),
            v4: wasm8Core.instance.exports.getRegisterV4().toString(16),
            v5: wasm8Core.instance.exports.getRegisterV5().toString(16),
            v6: wasm8Core.instance.exports.getRegisterV6().toString(16),
            v7: wasm8Core.instance.exports.getRegisterV7().toString(16),
            v8: wasm8Core.instance.exports.getRegisterV8().toString(16),
            v9: wasm8Core.instance.exports.getRegisterV9().toString(16),
            va: wasm8Core.instance.exports.getRegisterVA().toString(16),
            vb: wasm8Core.instance.exports.getRegisterVB().toString(16),
            vc: wasm8Core.instance.exports.getRegisterVC().toString(16),
            vd: wasm8Core.instance.exports.getRegisterVD().toString(16),
            ve: wasm8Core.instance.exports.getRegisterVE().toString(16),
            vf: wasm8Core.instance.exports.getRegisterVF().toString(16)
        };

        const cpuState: ICpuState = {
            opcode: wasm8Core.instance.exports.getOpcode().toString(16),
            pc: wasm8Core.instance.exports.getPC().toString(16),
            sp: wasm8Core.instance.exports.getSP().toString(16),
            i: wasm8Core.instance.exports.getAddressRegister().toString(16)
        };

        this.setState({ registers, cpuState });
    };

    render() {
        const { cpuState } = this.state;
        const { startProgram, stopProgram } = this.props;

        return (  
            <Container heading='State'>
                <div className='state-container'> 
                    <div className='state-content'> 
                        <div className='debugger-cpu-state'>
                            {
                                Object.entries(cpuState).map(([key, val]) => {
                                    return (
                                        <CpuStateItem title={key} val={val}/>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className='state-content'>
                        <h4>Registers</h4>
                        <table className='cpu-state-table'>
                            <tbody className='cpu-state-tbody'>
                                {
                                    Object.entries(this.state.registers).map(([key, val], i) => {
                                        return (
                                            <tr>
                                                <th className='cpu-state-th'>{key}</th>
                                                <td>0x{val}</td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className='state-buttons'>
                        <button
                            className='filled-button'
                            onClick={startProgram}
                        >
                            start
                        </button>
                        <button
                            className='filled-button'
                            onClick={stopProgram}
                        >
                            stop
                        </button>
                    </div>
                </div>
            </Container>  
        );
    }
}