export const ASSEMBLYSCRIPT_MEMORY_START: i32 = 0x000000;

/* Where the CHIP-8 interpreter would reside in an original system. */
/* This emulator stores registers, sp, and other variables here */
export const CHIP8_RESERVED_START: i32 = ASSEMBLYSCRIPT_MEMORY_START;
/* 0x000 - 0x200 */
export const CHIP8_RESERVED_SIZE: i32 = 0x000200;

/* Registers V0 - VF */
/* 0x000 - 0x010 */
export const CHIP8_REGISTERS_START: i32 = 0x000000;
export const CHIP8_REGISTERS_SIZE: i32 = 0x000010;

/* 16-bit address register */
/* 0x010 - 0x012 */
export const CHIP8_ADDRESS_REGISTER_START: i32 = 0x000010;
export const CHIP8_ADDRESS_REGISTER_SIZE: i32 = 0x000002;

/* Program counter */
/* 0x012 - 0x014 */
export const CHIP8_PROGRAM_COUNTER_START: i32 = 0x000012;
export const CHIP8_PROGRAM_COUNTER_SIZE: i32 = 0x000002;

/* Stack pointer */
/* 0x014 - 0x016 */
export const CHIP8_STACK_POINTER_START: i32 = 0x000014;
export const CHIP8_STACK_POINTER_SIZE: i32 = 0x000002;

/* Opcode */
/* 0x016 - 0x018 */
export const CHIP8_OPCODE_START: i32 = 0x000016;
export const CHIP8_OPCODE_SIZE: i32 = 0x000002;

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

export const VERBOSE_DISPLAY_RERFRESH_START: i32 = DISPLAY_RERFRESH_START + DISPLAY_RERFRESH_SIZE;
/* 0xFFF - OUT OF BOUNDS (6144)*/
export const VERBOSE_DISPLAY_RERFRESH_SIZE: i32 = 0x000800;