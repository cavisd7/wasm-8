import { Cpu } from './Cpu';

memory.grow(1);

export function start(): void {
    init();
};

function init(): void {
    Cpu.init();
};

export function loadProgram(programBuffer: Uint8Array): void {
    Cpu.loadProgram(programBuffer);
};