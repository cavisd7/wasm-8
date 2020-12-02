const fs = require("fs");
const loader = require("@assemblyscript/loader");
const imports = { 
    env: {
        abort(_msg, _file, line, column) {
            console.error("abort called at index.ts:" + line + ":" + column);
        },
        memory: new WebAssembly.Memory({ initial: 1 }),
    },
    console: {
        consoleLog: value => console.log('[wasm]: ' + value)
    }
};
const wasmModule = loader.instantiateSync(fs.readFileSync(__dirname + "/build/untouched.wasm"), imports);
const exp = wasmModule.exports;

const readChip8Program = async (path) => {
    return new Promise((resolve, reject) => {
        const readStream = fs.createReadStream(path);
        const buffer = [];
    
        readStream.on('data', (chunk) => {
            buffer.push(Buffer.from(chunk));
        });

        readStream.on('end', () => {
            return resolve(Buffer.concat(buffer));
        });

        readStream.on('error', (err) => {
            console.log('Error reading file', err);
            return reject(err);
        });
    });
};

(async () => {
    const programPath = 'roms/IBM.ch8';
    const programBuffer = await readChip8Program(programPath);
    const programData = new Uint8Array(programBuffer);
    const programPtr = exp.__retain(exp.__newArray(exp.Uint8Array_ID, programData));

    exp.start();
    exp.loadProgram(programPtr);

    const mem = new Uint8Array(exp.memory.buffer);

    for (let i = 0; i < 1000; i++) {
        console.log(`byte ${i}`, mem[i])
    };
})();
