import { Component, h, Fragment } from 'preact';

/* Components */
import { Screen } from './components/Screen';
import { Rom } from './components/Rom';

import { WasmCore } from './types';
import { loadWasm } from './utils/wasmUtils';
import { LoaderOptionsPlugin } from 'webpack';

let wasm8Core: WasmCore;

interface Props {};
interface State {
    loaded: boolean;
    isROMLoaded: boolean;
};

export class App extends Component<Props, State> {
    constructor() {
        super();

        this.state = { loaded: false, isROMLoaded: false };
    };

    componentDidUpdate(nextProps: Props, nextState: State) {
        console.log('update: ', nextState)
    }

    componentDidMount() {
        const init = async () => {
            wasm8Core = await loadWasm();

            console.log('Successfully loaded wasm core', wasm8Core);

            wasm8Core.instance.exports.start();

            this.setState({ ...this.state, loaded: true });
        };

        init();
    };

    render() {
        return (
            this.state.loaded ? (
                <Fragment>
                    <Screen wasm8Core={wasm8Core} isROMLoaded={this.state.isROMLoaded}/>
                    <Rom wasm8Core={wasm8Core} setROMLoaded={() => this.setState({ isROMLoaded: true })}/>
                </Fragment>
            ) : (
                <p>loading...</p>
            )
        );
    };
};