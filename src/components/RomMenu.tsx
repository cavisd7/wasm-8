import { Component, h, RefObject, createRef } from 'preact';

import "./styles/rom-menu.css";

import { Modal } from '../ui/Modal';
import { WasmCore } from '../types';
import { readProgramAsBytes } from '../utils/wasmUtils';

interface Props {
    isOpen: boolean;
    closeMenu: () => void;
    wasm8Core: WasmCore;
    setROMLoaded: () => void;
};

interface State {
    selected: number;
};

const ROMS = [
    {
        id: 0,
        title: 'PONG2',
        href: ''
    },
    {
        id: 1,
        title: 'PONG2',
        href: ''
    },
    {
        id: 2,
        title: 'PONG2',
        href: ''
    },
    {
        id: 3,
        title: 'PONG2',
        href: ''
    },
    {
        id: 4,
        title: 'PONG2',
        href: ''
    },
    {
        id: 5,
        title: 'PONG2',
        href: ''
    },
    {
        id: 6,
        title: 'PONG2',
        href: ''
    },
    {
        id: 7,
        title: 'PONG2',
        href: ''
    }
];

export class RomMenu extends Component<Props, State> {
    private inputRef: RefObject<HTMLInputElement>;

    constructor(props) {
        super(props);

        this.state = {
            selected: null
        };
        
        this.inputRef = createRef();
    }

    componentDidMount() {};

    componentDidUpdate() {
        console.log('[RomMenu] componentDidUpdate', this.state.selected);
    };

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

    fetchRom = (e) => {
        console.log('Selected rom: ', this.state.selected);

        const romHref = ROMS.filter(rom => rom.id == this.state.selected);

        this.props.closeMenu();
    };

    render() {
        const { isOpen, closeMenu } = this.props;
        const { selected } = this.state;

        return (
            <Modal isOpen={isOpen} closeModal={closeMenu}>
                <div className='rom-menu'>
                    <div className='title'>
                        <h4>ROMS</h4>
                    </div>
                    <div className='close'>
                        <button 
                            className='text-button'
                            onClick={closeMenu}
                        >
                            X
                        </button>
                    </div>
                    <div className='roms'>
                        <div className='remote scrollbar'>
                            <ul>
                                {
                                    ROMS.map(rom => {
                                        return (
                                            <li 
                                                key={rom.id}
                                                className={rom.id == selected ? 'rom-li-selected' : ''}
                                                onClick={() => this.setState({ selected: rom.id })}
                                            >
                                                {rom.title}
                                            </li>
                                        );
                                    })
                                }
                            </ul>
                        </div>
                        <div className='local'>
                            <p>
                                Or click <button
                                    className='text-button'
                                    onClick={() => this.inputRef.current.click()}
                                >
                                    here
                                </button> to upload a rom
                            </p>
                            <input
                                style={{ display: 'none' }} 
                                type='file' 
                                accept='.ch8'
                                ref={this.inputRef}
                                onChange={this.handleChange}
                            />
                        </div>
                    </div>
                    <div className='load'>
                        <button 
                            className='text-button'
                            onClick={this.fetchRom}
                        >
                            Load
                        </button>
                    </div>
                </div>
                
            </Modal>
        );
    };
};