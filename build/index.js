
const initWasm = async () => {
    const memory = new WebAssembly.memory({ initial: 1 });

    return await fetch('untouched.wasm')
        .then(res => res.arrayBuffer())
        .then(buffer => WebAssembly.instantiate(buffer, {
            env: { memory }
        }))
        .then(module => {
            return module.instance.exports;
        });
};

