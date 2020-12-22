import { Cpu } from '../Cpu';

export function getRegisterV0(): u8 {
    return Cpu.registers[0];
};

export function getRegisterV1(): u8 {
    return Cpu.registers[1];
};

export function getRegisterV2(): u8 {
    return Cpu.registers[2];
};

export function getRegisterV3(): u8 {
    return Cpu.registers[3];
};

export function getRegisterV4(): u8 {
    return Cpu.registers[4];
};

export function getRegisterV5(): u8 {
    return Cpu.registers[5];
};

export function getRegisterV6(): u8 {
    return Cpu.registers[6];
};

export function getRegisterV7(): u8 {
    return Cpu.registers[7];
};

export function getRegisterV8(): u8 {
    return Cpu.registers[8];
};

export function getRegisterV9(): u8 {
    return Cpu.registers[9];
};

export function getRegisterVA(): u8 {
    return Cpu.registers[10];
};

export function getRegisterVB(): u8 {
    return Cpu.registers[11];
};

export function getRegisterVC(): u8 {
    return Cpu.registers[12];
};

export function getRegisterVD(): u8 {
    return Cpu.registers[13];
};

export function getRegisterVE(): u8 {
    return Cpu.registers[14];
};

export function getRegisterVF(): u8 {
    return Cpu.registers[15];
};

/**
 * Get address register value
 */
export function getAddressRegister(): u16 {
    return Cpu.I;
};

/**
 * Get Program Counter value
 */
export function getPC(): u16 {
    return Cpu.pc;
};

/**
 * Get opcode value
 */
export function getOpcode(): u16 {
    return Cpu.opcode;
};

/**
 * Get stack pointer value
 */
export function getSP(): u16 {
    return Cpu.sp;
};
