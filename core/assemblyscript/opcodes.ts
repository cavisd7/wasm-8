import { Screen } from './Screen';
import { Cpu } from './Cpu';
import { Timer } from './Timer';
import { DISPLAY_RERFRESH_START, VERBOSE_DISPLAY_RERFRESH_START } from './constants';
import { log } from './console';

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
            log(69)
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
            /* X (0 - 63) and Y (0 - 31) position where the sprite will be drawn on screen */
            const xPos = Cpu.registers[(opcode & 0x0F00) >> 8]; 
            const yPos = Cpu.registers[(opcode & 0x00F0) >> 4];

            /* Height (0 - 15) of the sprite. Can range from 1 to 16 pixels. */
            const height = opcode & 0x000F;
            
            Cpu.registers[15] = 0;

            /* Dump */
            if (0) {
                log(xPos);              
                log(yPos);              
                log(height);            
                log(Cpu.registers[15]); 
            };

            /* Loop through height of the sprite */
            for (let y: u16 = 0; y < height; y++) {
                /* Load row of sprite */
                const spriteRow = load<u8>(Cpu.I + y);

                /* Dump */
                if (0) log(spriteRow);

                /* Loop through each bit of sprite. Sprite width is fixed to 8 pixels. */
                for (let x: u8 = 0; x < 8; x++) {
                    /* current bit from the sprite row which represents one pixel. */
                    const spritePixel = (spriteRow >> (7 - x)) & 0x01;

                    /* Pixel in framebuffer (0 - 2047) */
                    const index = xPos + x + (yPos + y) * 64; 

                    /* Current byte of the framebuffer */
                    const screenByte = load<u8>(VERBOSE_DISPLAY_RERFRESH_START + index);

                    /* Dump */
                    if (0) {
                        log(spritePixel)
                        log(index)
                        log(screenByte)
                    };

                    if (index > 2047) {
                        continue;   
                    };

                    if (spritePixel == 1 && screenByte != 0) {
                        Cpu.registers[15] = 1;
                    };

                    if ((screenByte != 0 && spritePixel == 0) || (screenByte == 0 && spritePixel == 1)) {
                        store<u8>(VERBOSE_DISPLAY_RERFRESH_START + index, 0x01);
                    } else {
                        store<u8>(VERBOSE_DISPLAY_RERFRESH_START + index, 0x00);
                    };
                };
            };

            break;
        case 0xE000:
            handleOpcode0xE(opcode);

            break;
        case 0xF000:
            handleOpcode0xF(opcode);

            break;
        default:
            throw new Error('Unrecognized opcode');
    };
};

export function handleOpcode0x0(opcode: u16): void {
    switch(opcode) {
        /* Clear screen */
        case 0x00E0:
            Screen.clearVerboseScreen();

            break;
        /* Return from subroutine */
        case 0x00EE:
            Cpu.pc = Cpu.stack.pop();

            break;
        /* 0NNN not supported */
        default:
            throw new Error('[handleOpcode0x0] Unrecognized opcode');
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
            throw new Error('[handleOpcode0x8] Unrecognized opcode');
    };
};

export function handleOpcode0xE(opcode: u16): void {
    switch (opcode & 0x00FF) {
        case 0x9E:
            if (((Cpu.key >> Cpu.registers[(opcode & 0x0F00) >> 8]) & 0x01) == 0x01) {
                Cpu.pc += 2;
            };

            break;
        case 0xA1:
            if (((Cpu.key >> Cpu.registers[(opcode & 0x0F00) >> 8]) & 0x01) != 0x01) {
                Cpu.pc += 2;
            };

            break;
        default:
            throw new Error('[handleOpcode0xE] Unrecognized opcode');
    }
};

export function handleOpcode0xF(opcode: u16): void {
    const x: u16 = (opcode & 0x0F00) >> 8;

    switch(opcode & 0x00FF) {
        case 0x07:
            Cpu.registers[x] = Timer.DelayTimer;

            break;
        case 0x0A:
            Cpu.waitingForKeyPress = true;
            Cpu.pc -= 2;
            
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
            throw new Error('[handleOpcode0xF] Unrecognized opcode');
    };
};