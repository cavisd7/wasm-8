module.exports = {
    /** Globs that represent the test entry points. */
    include: ["core/__tests__/**/*.spec.ts"],
    /** Modules that should be added to the compilation */
    add: ["core/__tests__/**/*.include.ts"],
    /** Compiler flags for each module. */
    flags: {
      /** To output a wat file, uncomment the following line. */
      // "--textFile": ["output.wat"],
      /** A runtime must be provided here. */
      "--runtime": ["full"], // Acceptable values are: full, half, stub (arena), and none
    },
    /** Disclude tests that match this regex. */
    disclude: [/node_modules/],
    /** Add your required AssemblyScript imports here in this function. */
    imports(memory, createImports, instantiateSync, binary) {
      let result; // Imports can reference this
      const myImports = {
        // put your web assembly imports here, and return the module
      };
      result = instantiateSync(binary, createImports(myImports));
      // return the entire result object from the loader
      return result;
    },
    outputBinary: false,
  };