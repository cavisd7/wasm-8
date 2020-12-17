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
                        <p><kbd>w</kbd> - up</p>
                        <p><kbd>a</kbd> - left</p>
                        <p><kbd>d</kbd> - right</p>
                        <p><kbd>s</kbd> - down</p>
                    </div>
                    <div className='key-group'>
                        <p><kbd>space</kbd> - jump</p>
                        <p><kbd>space</kbd> - jump</p>
                    </div>
                    <div className='key-group'>
                        <p><kbd>space</kbd> - jump</p>
                        <p><kbd>space</kbd> - jump</p>
                    </div>
                </div>
            </div>
        );
    };
};