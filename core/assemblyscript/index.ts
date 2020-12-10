export { start, loadProgram, execute } from './wasm8';
export { Cpu } from './Cpu';
export { 
    ASSEMBLYSCRIPT_MEMORY_START,
    CHIP8_RESERVED_START,
    CHIP8_RESERVED_SIZE,
    CHIP8_FONTSET_START,
    CHIP8_FONTSET_SIZE,
    CHIP8_PROGRAM_RAM_START,
    CHIP8_PROGRAM_RAM_SIZE,
    CALL_STACK_START,
    CALL_STACK_SIZE,
    DISPLAY_RERFRESH_START,
    DISPLAY_RERFRESH_SIZE
} from './constants';

export const Uint16Array_ID = idof<Uint16Array>();