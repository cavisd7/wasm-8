import { Screen } from './Screen';
import { Cpu } from './Cpu';
import { Timer } from './Timer';

export function handleOpcode(opcode: u16): void {
    const nibble: u16 = opcode & 0xF000;

    switch(nibble) {
        case 0x0000:
            handleOpcode0x0(opcode);

            break;
        case 0x1000:
            /* Jump to address NNN */
            Cpu.pc = opcode & 0x0FFF;

            break;
        case 0x2000:
            /* Call subroutine at NNN */
            Cpu.stack.push(Cpu.pc);
            Cpu.pc = opcode & 0x0FFF;

            break;
        case 0x3000:
            /**
             * Index registers by 4 bit register identifier from opcode.
             * If the contents of register x == opcode & 0x00FF, skip next instruction by incrementing program counter.  
             */  
            if (Cpu.registers[(opcode & 0x0F00) >> 8] == (opcode & 0x00FF)) {
                Cpu.pc += 2;
            };

            break;
        case 0x4000:
            /**
             * Same concept expect if register x != opcode & 0x00FF, skip next instruction.
             */
            if (Cpu.registers[(opcode & 0x0F00) >> 8] != (opcode & 0x00FF)) {
                Cpu.pc += 2;
            };

            break;
        case 0x5000:
            if (Cpu.registers[(opcode & 0x0F00) >> 8] == Cpu.registers[(opcode & 0x00F0) >> 4]) {
                Cpu.pc += 2;
            };

            break;
        case 0x6000:
            Cpu.registers[(opcode & 0x0F00) >> 8] = (opcode & 0x00FF);

            break;
        case 0x7000:
            Cpu.registers[(opcode & 0x0F00) >> 8] += <u8>(opcode & 0x00FF);

            break;
        case 0x8000:
            handleOpcode0x8(opcode);

            break;
        case 0x9000:
            if (Cpu.registers[(opcode & 0x0F00) >> 8] != Cpu.registers[(opcode & 0x00F0) >> 4]) {
                Cpu.pc += 2;
            };

            break;
        case 0xA000:
            /* Set address register to NNN */
            Cpu.I = opcode & 0x0FFF;

            break;
        case 0xB000:
            /* Jump to address NNN + V0 */
            Cpu.pc = Cpu.registers[0] + (opcode & 0x0FFF);

            break;
        case 0xC000:
            const randomNumber: u16 = <u16>Math.floor(Math.random() * (255 - 0 + 1)) + 0;
            Cpu.registers[(opcode & 0x0F00) >> 8] = randomNumber & (opcode & 0x00FF);

            break;
        case 0xD000:
            /* Draw sprite */
            const xPos = Cpu.registers[(opcode & 0x0F00) >> 8]; 
            const yPos = Cpu.registers[(opcode & 0x00F0) >> 4];
            const n = opcode & 0x000F;
            
            Cpu.registers[15] = 0;

            for (let i: u16 = 0; i < n; i++) {
                const mem = load<u8>(Cpu.I + i);

                for (let j: u8 = 0; j < 8; j++) {
                    const pixel = (mem >> (7 - j)) & 0x01;
                    const index = xPos + j + (yPos + i) * 64; 

                    if (pixel == 1 && Screen.framebuffer[index] != 0) {
                        Cpu.registers[15] = 1;
                    };

                    if ((Screen.framebuffer[index] != 0 && pixel == 0) || (Screen.framebuffer[index] == 0 && pixel == 1)) {
                        Screen.framebuffer[index] = 0xFFFFFFFF;
                    } else {
                        Screen.framebuffer[index] = 0;
                    };
                };
            };

            break;
        case 0xE000:
            handleOpcode0xE(opcode);
        case 0xF000:
            handleOpcode0xF(opcode);
        default:
            break;
    };
};

export function handleOpcode0x0(opcode: u16): void {
    switch(opcode) {
        /* Clear screen */
        case 0x00E0:
            Screen.clearScreen();

            break;
        /* Return from subroutine */
        case 0x00EE:
            Cpu.pc = Cpu.stack.pop();

            break;
        /* 0NNN not supported */
        default:
            break;
    };
};

export function handleOpcode0x8(opcode: u16): void {
    const VF = 15;
    const vx = (opcode & 0x0F00) >> 8;
    const vy = (opcode & 0x00F0) >> 4;

    switch(opcode & 0x000F) {
        case 0:
            Cpu.registers[vx] = Cpu.registers[vy];

            break;
        case 1:
            Cpu.registers[vx] = Cpu.registers[vx] | Cpu.registers[vy];

            break;
        case 2:
            Cpu.registers[vx] = Cpu.registers[vx] & Cpu.registers[vy];

            break;
        case 3:
            Cpu.registers[vx] = Cpu.registers[vx] ^ Cpu.registers[vy];

            break;
        case 4:
            /* VF is set to 1 when there is a carry and 0 when there's not. */
            Cpu.registers[VF] = Cpu.registers[vx] + Cpu.registers[vy] > 255 ? 1 : 0;
            Cpu.registers[vx] = (Cpu.registers[vx] + Cpu.registers[vy]) & 0x00FF;

            break;
        case 5:
            /*  */
            Cpu.registers[VF] = Cpu.registers[vx] > Cpu.registers[vy] ? 1 : 0;
            Cpu.registers[vx] = (Cpu.registers[vx] - Cpu.registers[vy]) & 0x00FF;

            break;
        case 6:
            Cpu.registers[VF] = Cpu.registers[vx] & 0x0001;
            Cpu.registers[vx] = Cpu.registers[vx] >> 1;

            break;
        case 7:
            Cpu.registers[VF] = Cpu.registers[vy] > Cpu.registers[vx] ? 1 : 0;
            Cpu.registers[vx] = (Cpu.registers[vy] - Cpu.registers[vx]) & 0x00FF;

            break;
        case 14:
            Cpu.registers[VF] = (Cpu.registers[vx] & 0x80) == 0x80 ? 1 : 0;
            Cpu.registers[vx] = Cpu.registers[vx] << 1; 

            break;
        default:
            /* Unsupported opcode */
            break;
    };
};

export function handleOpcode0xE(opcode: u16): void {
    switch (opcode & 0x00FF) {
        case 0x9E:
            break;
        case 0xA1:
            break;
        default:
            break;
    }
};

export function handleOpcode0xF(opcode: u16): void {
    const x: u16 = (opcode & 0x0F00) >> 8;

    switch(opcode & 0x00FF) {
        case 0x07:
            Cpu.registers[x] = Timer.DelayTimer;

            break;
        case 0x0A:
            break;
        case 0x15:
            Timer.DelayTimer = Cpu.registers[x];

            break;
        case 0x18:
            Timer.SoundTimer = Cpu.registers[x];

            break;
        case 0x1E:
            Cpu.I += Cpu.registers[x];

            break;
        case 0x29:
            Cpu.I = Cpu.registers[x] * 5;

            break;
        case 0x33:
            store<u16>(Cpu.I, Cpu.registers[x] / 100);
            store<u16>(Cpu.I + 1, (Cpu.registers[x] % 100) / 10);
            store<u16>(Cpu.I + 2, Cpu.registers[x] % 100);

            break;
        case 0x55:
            for (let i: u16 = 0; i <= x; i++) {
                store<u8>(Cpu.I + i, Cpu.registers[i]);
            };

            break;
        case 0x65:
            for (let i: u16 = 0; i <= x; i++) {
                Cpu.registers[i] = load<u8>(Cpu.I + i);
            };

            break;
        default:
            break;
    };
};