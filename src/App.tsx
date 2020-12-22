import { Component, h, Fragment } from 'preact';

import { WasmCore } from './types';
import { loadWasm } from './utils/wasmUtils';

/* Components */
import { Header } from './components/Header';
import { Screen } from './components/Screen';
import { Footer } from './components/Footer';
import { Controls } from './components/Controls';
import { RomMenu } from './components/RomMenu';
import { CpuState } from './components/debug/CpuState';
import { Disassembler } from './components/debug/Disassembler';
import { MemoryViewer } from './components/debug/MemoryViewer';

let wasm8Core: WasmCore;

interface Props {};
interface State {
    loaded: boolean;
    wasm8State: string;
    isDebugOn: boolean;
    isRomMenuOpen: boolean;

    isROMLoaded: boolean;
    isWasm8Running: boolean;
    error: string;
};

export class App extends Component<Props, State> {
    constructor() {
        super();

        this.state = { 
            loaded: false, 
            isROMLoaded: false,
            wasm8State: 'Shutdown',
            isDebugOn: true,
            isRomMenuOpen: false,
            isWasm8Running: false,
            error: ''
        };
    };

    componentDidMount() {
        const init = async () => {
            wasm8Core = await loadWasm();

            if (wasm8Core.instance && wasm8Core.memory) {
                console.log('Successfully loaded wasm core', wasm8Core);
    
                this.setState({ wasm8State: 'Waiting', loaded: true });
                wasm8Core.instance.exports.init();
            } else {
                console.error('Could not load wasm core!');
                this.setState({ error: 'Could not load wasm file' });
            };
        };

        init();
    };

    closeRomMenu = () => {
        this.setState({ isRomMenuOpen: false });
    }

    startProgram = () => {
        if (this.state.isROMLoaded) {
            this.setState({ isWasm8Running: true });
        };
    };

    stopProgram = () => {
        if (this.state.isROMLoaded && this.state.isWasm8Running) {
            this.setState({ isWasm8Running: false });
        };
    };

    render() {
        const { 
            isDebugOn, 
            wasm8State, 
            isROMLoaded, 
            isRomMenuOpen,
            error,
            isWasm8Running
        } = this.state;

        return (
            this.state.loaded ? (
                <div className='container'>
                    <RomMenu 
                        isOpen={isRomMenuOpen} 
                        closeMenu={this.closeRomMenu}
                        wasm8Core={wasm8Core} 
                        setROMLoaded={() => this.setState({ isROMLoaded: true, wasm8State: 'loaded' })}
                    />
                    <Header
                        isDebugOn={isDebugOn} 
                        wasm8State={wasm8State}
                        setIsDebugOn={(value) => this.setState({ isDebugOn: value })}
                        openRomMenu={() => this.setState({ isRomMenuOpen: true })}
                    />
                    <main className='content'>
                        <div className='content-top'>
                            <Screen 
                                wasm8Core={wasm8Core} 
                                isROMLoaded={isROMLoaded}
                                isWasm8Running={isWasm8Running}
                            />
                            <CpuState 
                                wasm8Core={wasm8Core} 
                                startProgram={this.startProgram}
                                stopProgram={this.stopProgram}
                            />
                        </div>
                        <div className='content-bottom'>
                            <Disassembler 
                                wasm8Core={wasm8Core}
                                isRomLoaded={isROMLoaded}
                            />
                            <MemoryViewer wasm8Core={wasm8Core}/>
                        </div>
                    </main>
                    <Controls />
                    <Footer />
                </div>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <p>loading...</p>
            )
        );
    };
};