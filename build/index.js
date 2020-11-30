fetch('untouched.wasm')
    .then(res => res.arrayBuffer())
    .then(buffer => WebAssembly.instantiate(buffer, {}))
    .then(module => {
        const exports = module.instance.exports;

        console.log(exports);
    });
