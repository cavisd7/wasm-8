import { fontset } from './fontset';
import { CHIP8_FONTSET_START, CHIP8_PROGRAM_RAM_START } from './constants';
import { handleOpcode } from './opcodes';
import { log } from './console';

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

    static key: u16;
    static waitingForKeyPress: bool = false;

    static delayTimer: u8;

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
        handleOpcode((opcode >> 8) | (opcode << 8));
    };

    static loadProgram(programBuffer: Uint8Array): void {
        for(let i = 0; i < programBuffer.length; i++) {
            store<u8>(CHIP8_PROGRAM_RAM_START + (sizeof<u8>() * i), programBuffer[i]);
        };
    };

    static keyPressed(key: u16): void {
        Cpu.waitingForKeyPress = false;

        const leOpcode = load<u16>(Cpu.pc);
        const opcode = (leOpcode >> 8) | (leOpcode << 8);
        //store<u16>((opcode & 0x0F00) >> 8, key);
        Cpu.registers[(opcode & 0x0F00) >> 8] = key;

        Cpu.pc += 2;
    };
};