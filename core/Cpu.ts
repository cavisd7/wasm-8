import { log } from './console';
import { fontset } from './graphics';
import { CHIP8_FONTSET_START, CHIP8_PROGRAM_RAM_START } from './constants';

export class Cpu {
    /* Registers V0 - VF */
    static registers: Uint8Array = new Uint8Array(16);

    /* 16-bit address register */
    static I: u16;

    /* Program counter */
    static pc: u16;

    /* 64 x 32 display */
    static graphics: Uint8Array = new Uint8Array(64 * 32);

    /* 48 bytes up to 12 levels of nesting */
    static stack: Uint32Array = new Uint32Array(12);
    static sp: u16;

    static opcode: u16;

    /* Initialize registers and memory */
    static init (): void {
        /**
         * Initialize program counter at 0x200 because most programs start here 
         * since the interpreter occupies the first 512 bytes of memory.
         */
        Cpu.pc = 0x200;
        Cpu.opcode = 0;
        Cpu.I = 0;
        Cpu.sp = 0;

        /* Load fontset */
        for (let i = 0; i < 80; i++) {
            store<u8>(CHIP8_FONTSET_START + (sizeof<u8>() * i), fontset[i]);
        };
    };

    static cycle(): void {
        /**
         * Fetch opcode, decode, execute
         * Update timers
         */

    };

    static loadProgram(programBuffer: Uint8Array): void {
        for(let i = 0; i < programBuffer.length; i++) {
            log(programBuffer[i]);
            store<u8>(CHIP8_PROGRAM_RAM_START + (sizeof<u8>() * i), programBuffer[i]);
        };
    }; 
};