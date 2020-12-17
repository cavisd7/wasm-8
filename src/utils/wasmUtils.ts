import wasmBuilder from '../../core/wasm8.wasm';
import type Wasm8Module from '../../core/types';

export const loadWasm = async () => {
    const module = await wasmBuilder<typeof Wasm8Module>({
        env: {
            memory: new WebAssembly.Memory({ initial: 1 }),
            abort(_msg, _file, line, column) {
                console.error("abort called at index.ts:" + line + ":" + column);
            },          
            seed: () => 236723487961
        },
        console: {
            consoleLog: value => console.log('[wasm]: ' + value),
        }
    });

    const instance = module.instance;
    const memory = new Uint8Array((instance.exports.memory as any).buffer);

    return {
        instance,
        memory
    };
};

export const readProgramAsBytes = async (program): Promise<Uint8Array> => {
    return await new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        fileReader.onload = () => {
            const bytes = new Uint8Array(fileReader.result as ArrayBuffer);

            console.log('[readProgramAsBytes] Finished reading program ', bytes);

            resolve(bytes);
        };

        fileReader.readAsArrayBuffer(program);
    });
};