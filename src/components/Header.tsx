import classnames from 'classnames';
import { Component, Fragment, h } from 'preact';

import './styles/header.css';

interface Props {
    wasm8State: string;
    isDebugOn: boolean;
    setIsDebugOn: (boolean) => void;
    openRomMenu: () => void;
};

interface State {
};

export class Header extends Component<Props, State> {
    render() {
        const { wasm8State, isDebugOn, setIsDebugOn, openRomMenu } = this.props;

        return (
            <div className='header'>
                <div className='logo'>
                    <h1>Wasm-8</h1>
                </div>
                <div className='menu'>
                    <div className='icon-button'>
                        <div className='icon' onClick={openRomMenu}>
                            <i class="fas fa-compact-disc"></i>
                        </div>
                    </div>
                    <div className='icon-button'>
                        <div className='icon'>
                            <i class="fas fa-info"></i>
                        </div>
                    </div>
                </div>
                <div className='state'>
                    <p>State: <span>{wasm8State}</span></p>
                </div>
            </div>
        );
    };
};