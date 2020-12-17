import { Component, Fragment, h } from 'preact';

interface Props {
};

interface State {};

export class Footer extends Component<Props, State> {
    componentDidMount() {};

    render() {
        return (
            <div className='footer'>
                <div>
                    <p>Made by Casey Davis</p>
                    <div className='icon'>
                        <i style={{ marginRight: '0.3rem' }} class="fab fa-github"></i>
                        View source on<a href='https://github.com/cavisd7/wasm-8'>github</a>| v0.0.1
                    </div>
                </div>
            </div>
        );
    };
};