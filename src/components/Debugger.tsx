import { Component, Fragment, h } from 'preact';

interface Props {
    isDebugOn: boolean;
};

interface State {};

export class Debugger extends Component<Props, State> {
    componentDidMount() {};

    render() {
        const { isDebugOn } = this.props;

        return (
            <div className={isDebugOn ? 'debugger-container' : 'hide-debugger'}>
                <input class='d-t' id='dt' type='checkbox'/>
                <div className='de'>
                    <h3 htmlFor='dt'>
                        <span>
                            Debugger
                        </span>
                    </h3>
                    <div className='c'>
                        logging...
                    </div>
                </div>
            </div>
        );
    };
};

/**
 * <input class='debug-toggle' id='debugger' type='checkbox'/>
                <label htmlFor='debugger'>
                    <span>
                        Debugger
                    </span>
                </label>
 */

/**
 * <div className='debugger'>
                <input class='debug-toggle' id='debugger' type='checkbox'/>
                <label htmlFor='debugger'><span className='test'>Debugger</span></label>
                <div className='debugger-content'>
                    logging...
                </div>
        </div>
 */