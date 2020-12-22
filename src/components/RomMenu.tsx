import { Component, h, RefObject, createRef } from 'preact';

import { Modal } from '../ui/Modal';
import { WasmCore } from '../types';
import { readProgramAsBytes } from '../utils/wasmUtils';

interface Props {
    isOpen: boolean;
    closeMenu: () => void;
    wasm8Core: WasmCore;
    setROMLoaded: () => void;
};

interface State {};

export class RomMenu extends Component<Props, State> {
    private inputRef: RefObject<HTMLInputElement>;

    constructor(props) {
        super(props);
        
        this.inputRef = createRef();
    }

    componentDidMount() {};

    loadProgram = (file: File, name: string) => {
        const { exports } = this.props.wasm8Core.instance;

        const task = async () => {
            const buffer = await readProgramAsBytes(file);

            this.props.wasm8Core.memory.set(buffer, exports.CHIP8_PROGRAM_RAM_START);
        };
    
        const runTask = task();
    
        runTask.then(() => {
            this.props.setROMLoaded();
            this.props.closeMenu();
        });
        runTask.catch(err => {
            console.log('[Rom - loadProgram] Error loading program', err);
        });
    };

    handleChange = (e) => {
        const file = e.target.files[0];
        const name = e.target.files[0].name;

        this.loadProgram(file, name);
    };

    render() {
        const { isOpen, closeMenu } = this.props;

        return (
            <Modal isOpen={isOpen} closeModal={closeMenu}>
                <div>
                    Rom Menu
                    <button 
                        className='text-button'
                        onClick={closeMenu}
                    >
                        close
                    </button>
                </div>
                <div>
                    <button
                        className='text-button'
                        onClick={() => this.inputRef.current.click()}
                    >
                        Insert ROM
                    </button>
                    <input
                        style={{ display: 'none' }} 
                        type='file' 
                        accept='.ch8'
                        ref={this.inputRef}
                        onChange={this.handleChange}
                    />
                </div>
            </Modal>
        );
    };
};