import { fontset } from './fontset';
import { 
    CHIP8_FONTSET_START, 
    CHIP8_PROGRAM_RAM_START,
    CHIP8_PROGRAM_COUNTER_START,
    CHIP8_OPCODE_START,
    CHIP8_ADDRESS_REGISTER_START,
    CHIP8_STACK_POINTER_START,
    CHIP8_REGISTERS_START
} from './constants';
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

        /* How these variables will be accessed in the future. Using for debug purposes at the moment. */
        /*store<u16>(CHIP8_PROGRAM_COUNTER_START, 0x0200);
        store<u16>(CHIP8_OPCODE_START, 0x0000);
        store<u16>(CHIP8_ADDRESS_REGISTER_START, 0x0000);
        store<u16>(CHIP8_STACK_POINTER_START, 0x0000);*/

        /* Clear stack */
        Cpu.stack.length = 0;

        /* Reset registers */
        Cpu.registers.forEach((reg, i) => {
            Cpu.registers[i] = 0x00;
            //store<u16>(CHIP8_REGISTERS_START + sizeof<u8>() * i, 0x00);
        });

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
        /* Convert to big endian because webassembly stores data as little endian. */
        let leOpcode = load<u16>(Cpu.pc);
        let opcode = (leOpcode >> 8) | (leOpcode << 8);
        Cpu.opcode = opcode;
        //log(leOpcode)
        //log(opcode)

        /* Increment program counter to point to next instruction */
        Cpu.pc += 2;

        /* Execute instruction */
        handleOpcode(opcode);
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