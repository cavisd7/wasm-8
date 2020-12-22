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

const inRange = (value, lower, upper) => value >= lower && value <= upper;
//https://github.com/ColinEberhardt/wasm-rust-chip8/blob/master/web/chip8.js
export const dissassemble = (opcode) => {
    const x = (opcode & 0x0f00) >> 8;
    const y = (opcode & 0x00f0) >> 4;
    const nnn = opcode & 0x0fff;
    const kk = opcode & 0x00ff;
    const n = opcode & 0x000f;
  
    if (opcode === 0x00e0) return "CLS";
    if (opcode === 0x00ee) return "RET";
    if (inRange(opcode, 0x1000, 0x1fff)) return `JP 0x${nnn.toString(16)}`;
    if (inRange(opcode, 0x2000, 0x2fff)) return `CALL 0x${nnn.toString(16)}`;
    if (inRange(opcode, 0x3000, 0x3fff)) return `SE V${n} ${kk}`;
    if (inRange(opcode, 0x4000, 0x4fff)) return `SNE V${n} ${kk}`;
    if (inRange(opcode, 0x5000, 0x5fff)) return `SE V${x} V${y}`;
    if (inRange(opcode, 0x6000, 0x6fff)) return `LD V${x} ${kk}`;
    if (inRange(opcode, 0x7000, 0x7fff)) return `ADD V${x} ${kk}`;
    if (inRange(opcode, 0x8000, 0x8fff)) {
      if (n === 0x0) return `LD V${x} V${y}`;
      if (n === 0x1) return `OR V${x} V${y}`;
      if (n === 0x2) return `AND V${x} V${y}`;
      if (n === 0x3) return `XOR V${x} V${y}`;
      if (n === 0x4) return `ADD V${x} V${y}`;
      if (n === 0x5) return `SUB V${x} V${y}`;
      if (n === 0x6) return `SHR V${x}`;
      if (n === 0x7) return `SUBN V${x} V${y}`;
      if (n === 0xe) return `SHL V${x}`;
    }
    if (inRange(opcode, 0x9000, 0x9fff)) return `SNE V${x} V${y}`;
    if (inRange(opcode, 0xa000, 0xafff)) return `LDI 0x${nnn.toString(16)}`;
    if (inRange(opcode, 0xb000, 0xbfff)) return `JP V0 + ${nnn}`;
    if (inRange(opcode, 0xc000, 0xcfff)) return `RND ${kk}`;
    if (inRange(opcode, 0xd000, 0xdfff)) return `DRW V${x} V${y} ${n}`;
    if (inRange(opcode, 0xe000, 0xefff)) {
      if (kk === 0x9e) return `SKP V${x}`;
      if (kk === 0xa1) return `SKNP V${x}`;
    }
    if (inRange(opcode, 0xf000, 0xffff)) {
      if (kk === 0x07) return `LD V${x} DT`;
      if (kk === 0x0a) return `LD V${x} K`;
      if (kk === 0x15) return `LD DT, V${x}`;
      if (kk === 0x1e) return `ADD I, V${x}`;
      if (kk === 0x29) return `LD F, V${x}`;
      if (kk === 0x33) return `LD B, V${x}`;
      if (kk === 0x55) return `LD [I], ${x}`;
      if (kk === 0x65) return `LD ${x}, [I]`;
    }
    return "";
};