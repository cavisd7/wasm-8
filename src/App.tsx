import { Component, h, Fragment } from 'preact';

/* Components */
import { Header } from './components/Header';
import { Screen } from './components/Screen';
import { Rom } from './components/Rom';
import { Debugger } from './components/Debugger';
import { Footer } from './components/Footer';
import { Controls } from './components/Controls';
import { RomMenu } from './components/RomMenu';

import { WasmCore } from './types';
import { loadWasm } from './utils/wasmUtils';

let wasm8Core: WasmCore;

interface Props {};
interface State {
    loaded: boolean;
    isROMLoaded: boolean;
    wasm8State: string;
    isDebugOn: boolean;
    isRomMenuOpen: boolean;
};

export class App extends Component<Props, State> {
    constructor() {
        super();

        this.state = { 
            loaded: false, 
            isROMLoaded: false,
            wasm8State: 'Shutdown',
            isDebugOn: true,
            isRomMenuOpen: false
        };
    };

    componentDidUpdate(nextProps: Props, nextState: State) {
        console.log('update: ', nextState)
    }

    componentDidMount() {
        const init = async () => {
            wasm8Core = await loadWasm();

            console.log('Successfully loaded wasm core', wasm8Core);

            wasm8Core.instance.exports.start();
            //wasm8Core.instance.exports.fontDrawTest();

            this.setState({ ...this.state, wasm8State: 'Waiting', loaded: true });
        };

        init();
    };

    closeRomMenu = () => {
        this.setState({ isRomMenuOpen: false });
    }

    render() {
        const { 
            isDebugOn, 
            wasm8State, 
            isROMLoaded, 
            isRomMenuOpen
        } = this.state;

        return (
            this.state.loaded ? (
                <Fragment>
                    <RomMenu 
                        isOpen={isRomMenuOpen} 
                        closeMenu={this.closeRomMenu}
                        wasm8Core={wasm8Core} 
                        setROMLoaded={() => this.setState({ isROMLoaded: true, wasm8State: 'running' })}
                    />
                    <Header
                        isDebugOn={isDebugOn} 
                        wasm8State={wasm8State}
                        setIsDebugOn={(value) => this.setState({ isDebugOn: value })}
                        openRomMenu={() => this.setState({ isRomMenuOpen: true })}
                    />
                    <Screen 
                        wasm8Core={wasm8Core} 
                        isROMLoaded={isROMLoaded}
                    />
                    
                    <Debugger isDebugOn={isDebugOn}/>
                    <Controls />
                    <Footer />
                </Fragment>
            ) : (
                <p>loading...</p>
            )
        );
    };
};