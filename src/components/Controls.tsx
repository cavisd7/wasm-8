import { Component, Fragment, h } from 'preact';

interface Props {};

interface State {};

export class Controls extends Component<Props, State> {
    componentDidMount() {};

    render() {
        return (
            <div className='controls'>
                <h3>Controls</h3>
                <div className='keys'>
                    <div className='key-group'>
                        <p><kbd>1</kbd> - ???</p>
                        <p><kbd>2</kbd> - ???</p>
                        <p><kbd>3</kbd> - ???</p>
                        <p><kbd>4</kbd> - ???</p>
                    </div>
                    <div className='key-group'>
                        <p><kbd>q</kbd> - ???</p>
                        <p><kbd>w</kbd> - ???</p>
                        <p><kbd>e</kbd> - ???</p>
                        <p><kbd>r</kbd> - ???</p>
                    </div>
                    <div className='key-group'>
                        <p><kbd>a</kbd> - ???</p>
                        <p><kbd>s</kbd> - ???</p>
                        <p><kbd>d</kbd> - ???</p>
                        <p><kbd>f</kbd> - ???</p>
                    </div>
                    <div className='key-group'>
                        <p><kbd>z</kbd> - ???</p>
                        <p><kbd>x</kbd> - ???</p>
                        <p><kbd>c</kbd> - ???</p>
                        <p><kbd>v</kbd> - ???</p>
                    </div>
                </div>
            </div>
        );
    };
};