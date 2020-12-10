
import wasmBuilder from '../core/wasm8.wasm';
import type Wasm8Module from '../core/types';
import { FileElement } from './types';
import { readProgramAsBytes } from './loadProgram';

function loadProgram(file: File, name: string, load) {
    const task = async () => {
        const buffer = await readProgramAsBytes(file);

        load(buffer);
    };

    const runTask = task();

    runTask.catch(err => {
        console.log('[loadProgram] Error loading program');
    });
};

wasmBuilder<typeof Wasm8Module>({
    env: {
        memory: new WebAssembly.Memory({ initial: 1 }),
        abort(_msg, _file, line, column) {
            console.error("abort called at index.ts:" + line + ":" + column);
        },
        seed: () => 236723487961
    },
    console: {
        consoleLog: value => console.log('[wasm]: ' + value)
    }
}).then(module => {
    const wasm8 = module.instance.exports;

    const romInput = document.getElementById('rom-input');
    romInput.addEventListener('change', (e) => {
        const file = (e.target as FileElement).files[0];
        const name = (e.target as FileElement).files[0].name;
    
        loadProgram(file, name, wasm8.loadProgram);
    });

    const canvas = <HTMLCanvasElement>document.getElementById("screen");
    if(!canvas) {
        throw new Error('Could not find canvas element');
    };

    const ctx = canvas.getContext("2d");
    const width = 64;
    const height = 32;
    const scale = 6;

    canvas.width = width * scale;
    canvas.height = height * scale;

    ctx.fillRect(0, 0, width * scale, height * scale);
});