
export class Screen {
    /* 64 x 32 display */
    static framebuffer: Uint8Array = new Uint8Array(64 * 32);

    constructor() {};

    static clearScreen(): void {
        for(let i = 0; i < Screen.framebuffer.length; i++) {
            Screen.framebuffer[i] = 0;
        };
    };
};