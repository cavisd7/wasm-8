export const readProgramAsBytes = async (program) => {
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