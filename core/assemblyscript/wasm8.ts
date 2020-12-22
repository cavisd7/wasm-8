import { Cpu } from './Cpu';
import { Screen } from './Screen';
import { log } from './console';
import { CHIP8_FONTSET_START, DISPLAY_RERFRESH_START } from './constants';

memory.grow(1);

export function init(): void {
    Cpu.init();
    Screen.clearVerboseScreen();
    //Screen.turnOnVerboseScreen();
};

export function loadProgram(programBuffer: Uint8Array): void {
    Cpu.loadProgram(programBuffer);
};

export function emulateCycle(): void {
    Cpu.step();
};

export function key_down(keycode: i32): void {
    Cpu.key |= (1 << <u16>keycode);
    log(Cpu.key)

    if(Cpu.waitingForKeyPress) {
        Cpu.keyPressed(<u16>keycode);
    }; 
};

export function key_up(keycode: i32): void {
    Cpu.key &= ~(1 << <u16>keycode);
    log(Cpu.key)
};

export function decrementDeleyTimer(): void {
    if (Cpu.delayTimer > 0) {
        Cpu.delayTimer -= 1;
    };
};

export function checkWasmMemory(start: i32, offset: i32): void {
    for (let i = start; i < offset + start; i++) {
        const byte = load<u8>(i);
        log(byte);
    };
};

function loadFontSprite(offset: u16): u8[] {
    const sprite: u8[] = [];

    for (let i = 0; i < 5; i++) {
        const row = load<u8>(CHIP8_FONTSET_START + offset + (sizeof<u8>() * i));
        sprite.push(row);
    };

    return sprite;
};

export function fontDrawTest(): void {
    Screen.clearScreen();

    for (let c: u16 = 0; c < 16; c++) {
        const sprite = loadFontSprite(c * 0x05);

        for (let j = 0; j < sprite.length; j++) {
            const xPos = c * 8;
            const yPos = c < 8 ? 0 : 5;
            const pixel = yPos * 64 + xPos;
            const index = pixel / 8;

            store<u8>(DISPLAY_RERFRESH_START + index + j * 8, sprite[j]);
        };
    };

    /*const xPos = 21;
    const yPos = 8;
    const pixel = yPos * 64 + xPos;
    const index = pixel / 8;
    
    log(pixel)
    log(index)*/
};