import { Component, Fragment, h } from 'preact';

import "./styles/controls.css";

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
                        <p><kbd>1</kbd> - 0</p>
                        <p><kbd>2</kbd> - 1</p>
                        <p><kbd>3</kbd> - 2</p>
                        <p><kbd>4</kbd> - 3</p>
                    </div>
                    <div className='key-group'>
                        <p><kbd>q</kbd> - 4</p>
                        <p><kbd>w</kbd> - 5</p>
                        <p><kbd>e</kbd> - 6</p>
                        <p><kbd>r</kbd> - 7</p>
                    </div>
                    <div className='key-group'>
                        <p><kbd>a</kbd> - 8</p>
                        <p><kbd>s</kbd> - 9</p>
                        <p><kbd>d</kbd> - A</p>
                        <p><kbd>f</kbd> - B</p>
                    </div>
                    <div className='key-group'>
                        <p><kbd>z</kbd> - C</p>
                        <p><kbd>x</kbd> - D</p>
                        <p><kbd>c</kbd> - E</p>
                        <p><kbd>v</kbd> - F</p>
                    </div>
                </div>
            </div>
        );
    };
};