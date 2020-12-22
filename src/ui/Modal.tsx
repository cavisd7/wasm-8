import { Component, h, RefObject } from "preact";
import classnames from 'classnames';

interface Props {
    isOpen: boolean;
    closeModal: () => void;
};

interface State {};

export class Modal extends Component<Props, State> {
    //private modalRef: any;

    componentDidMount() {
        //document.addEventListener('mousedown', this.handleClick, false);
    }

    componentWillUnmount() {
        //document.removeEventListener('mousedown', this.handleClick, false);
    }

    handleClose = () => {
        this.props.closeModal();
    }

    /*handleClick = (e) => {
        if (!this.modalRef.contains(e.target)) {
            console.log('outside');
            this.handleClose();
        };
    };*/

    render() {
        const { isOpen } = this.props;

        return (
            <div
                /*ref={node => this.modalRef = node}*/ 
                className={classnames({
                    'modal': isOpen,
                    'modal-off': !isOpen
                })}
            >
                <div className={!isOpen ? 'off' : 'modal-content'}>
                    {this.props.children}
                </div>
            </div>
        );
    };
};