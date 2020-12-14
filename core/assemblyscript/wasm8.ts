import { Cpu } from './Cpu';
import { Screen } from './Screen';
import { log } from './console';

memory.grow(1);

export function start(): void {
    init();
};

function init(): void {
    Cpu.init();
    Screen.turnOnScreen();
};

export function loadProgram(programBuffer: Uint8Array): void {
    Cpu.loadProgram(programBuffer);
};

export function execute(): void {
    Cpu.step();
};

export function checkWasmMemory(start: i32, offset: i32): void {
    for (let i = start; i < offset + start; i++) {
        const byte = load<u8>(i);
        log(byte);
    };
};