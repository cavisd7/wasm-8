import { Cpu } from './Cpu';
import { Screen } from './Screen';
import { log } from './console';

memory.grow(1);

export function start(): void {
    init();
};

function init(): void {
    Cpu.init();
    Screen.clearScreen();
};

export function loadProgram(programBuffer: Uint16Array): void {
    Cpu.loadProgram(programBuffer);
    log(42);
};

export function execute(): void {
    while(true) {
        Cpu.step();
    };
};