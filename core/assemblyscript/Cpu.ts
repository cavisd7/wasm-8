import { fontset } from './fontset';
import { CHIP8_FONTSET_START, CHIP8_PROGRAM_RAM_START } from './constants';
import { handleOpcode } from './opcodes';

export class Cpu {
    /* Registers V0 - VF */
    static registers: Uint8Array = new Uint8Array(16);

    /* 16-bit address register */
    static I: u16;

    /* Program counter */
    static pc: u16;

    //static stack: Uint16Array = new Uint16Array(16);
    //TODO: limit size
    static stack: u16[] = [];
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

        /* Clear stack */
        Cpu.stack.length = 0;

        /* Load fontset */
        for (let i = 0; i < 80; i++) {
            store<u8>(CHIP8_FONTSET_START + (sizeof<u8>() * i), fontset[i]);
        };
    };

    static step(): void {
        /**
         * Fetch opcode, decode, execute
         * Update timers
         */

         /* Load instruction from program memory */
        let opcode = load<u16>(Cpu.pc);

        /* Increment program counter to point to next instruction */
        Cpu.pc += 2;

        /* Execute instruction */
        handleOpcode(opcode);
    };

    static loadProgram(programBuffer: Uint16Array): void {
        for(let i = 0; i < programBuffer.length; i++) {
            store<u16>(CHIP8_PROGRAM_RAM_START + (sizeof<u16>() * i), programBuffer[i]);
        };
    }; 
};