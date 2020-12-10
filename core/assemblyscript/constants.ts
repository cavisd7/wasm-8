export const ASSEMBLYSCRIPT_MEMORY_START: i32 = 0x000000;

/* Where the CHIP-8 interpreter would reside in an original system. */
export const CHIP8_RESERVED_START: i32 = ASSEMBLYSCRIPT_MEMORY_START;
/* 0x000 - 0x200 */
export const CHIP8_RESERVED_SIZE: i32 = 0x000200;

/**
 * This emulator uses the memory reserved for the CHIP-8 interpreter to store the fontset 
 * since there is no interpreter running natively.
 */
export const CHIP8_FONTSET_START: i32 = ASSEMBLYSCRIPT_MEMORY_START + 0x000050;
/*  0x050 - 0x0A0 */
export const CHIP8_FONTSET_SIZE: i32 = 0x000050;

/**
 * Where most programs for original CHIP-8 machines start.
 */
export const CHIP8_PROGRAM_RAM_START: i32 = ASSEMBLYSCRIPT_MEMORY_START + CHIP8_RESERVED_SIZE;
/* 0x200 - 0xEA0 */
export const CHIP8_PROGRAM_RAM_SIZE: i32 = 0x000CA0;

export const CALL_STACK_START: i32 = CHIP8_PROGRAM_RAM_START + CHIP8_PROGRAM_RAM_SIZE;
/* 0xEA0 - 0xEFF */
export const CALL_STACK_SIZE: i32 = 0x00005F;

export const DISPLAY_RERFRESH_START: i32 = CALL_STACK_START + CALL_STACK_SIZE;
/* 0xF00 - 0xFFF */
export const DISPLAY_RERFRESH_SIZE: i32 = 0x0000FF;