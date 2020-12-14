import { DISPLAY_RERFRESH_START, DISPLAY_RERFRESH_SIZE } from './constants';

export class Screen {
    /* 64 x 32 display */
    static framebuffer: Uint8Array = new Uint8Array(64 * 32);

    constructor() {};

    static turnOnScreen(): void {
        for (let i = DISPLAY_RERFRESH_START; i <= DISPLAY_RERFRESH_START + DISPLAY_RERFRESH_SIZE; i++) {
            store<u8>(i, 0xFF);
        };
    };

    static clearScreen(): void {
        for (let i = DISPLAY_RERFRESH_START; i <= DISPLAY_RERFRESH_START + DISPLAY_RERFRESH_SIZE; i++) {
            store<u8>(i, 0x00);
        };
    };
};