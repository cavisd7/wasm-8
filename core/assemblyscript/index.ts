export { 
    init, 
    loadProgram, 
    emulateCycle,
    key_down,
    key_up, 
    decrementDeleyTimer,
    checkWasmMemory, 
    fontDrawTest 
} from './wasm8';
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
export { 
    getRegisterV0,
    getRegisterV1,
    getRegisterV2,
    getRegisterV3,
    getRegisterV4,
    getRegisterV5,
    getRegisterV6,
    getRegisterV7,
    getRegisterV8,
    getRegisterV9,
    getRegisterVA,
    getRegisterVB,
    getRegisterVC,
    getRegisterVD,
    getRegisterVE,
    getRegisterVF,
    getAddressRegister,
    getPC,
    getOpcode,
    getSP
} from './debug/debugCpu';

export const Uint8Array_ID = idof<Uint8Array>();