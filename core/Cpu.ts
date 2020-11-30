import { fontset } from './graphics';

export class Cpu {
    /* 4KB of memory */
    private memory: Uint8Array = new Uint8Array(4096);

    /* Registers V0 - VF */
    private registers: Uint8Array = new Uint8Array(16);

    /* 16-bit address register */
    private I: u16;

    /* Program counter */
    private pc: u16;

    /* 64 x 32 display */
    private graphics: Uint8Array = new Uint8Array(64 * 32);

    /* 48 bytes up to 12 levels of nesting */
    private stack: Uint32Array = new Uint32Array(12);
    private sp: u16;

    private opcode: u16;

    /* Initialize registers and memory */
    public init (): void {
        this.pc = 0x200;        //Initialize program counter at 0x200 because most programs start here since the interpreter occupies the first 512 bytes of memory
        this.opcode = 0;
        this.sp = 0;

        /* Load fontset */
        for (let i = 0; i < 80; i++) {
            this.memory[i] = fontset[i];
        }
    };

    public cycle(): void {
        /**
         * Fetch opcode, decode, execute
         * Update timers
         */

    };

    public dumpMemory (): void {
        this.memory.forEach((byte) => {
        })
    }

};