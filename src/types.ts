import type Wasm8Module from '../core/types';

export interface WasmCore {
    instance: WebAssembly.Instance & { exports: typeof Wasm8Module };
    memory: Uint8Array;
};

export type FileElement = HTMLInputElement & { files: File[] };
