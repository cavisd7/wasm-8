export function handleOpcode(opcode: u16) {
    const nibble: u16 = opcode & 0xF000;

    switch(nibble) {
        case 0x0000:
            handleOpcode0x0(opcode);
        case 0x1000:
            //
        case 0x2000:
            //
        case 0x3000:
            //
        case 0x4000:
            //
        case 0x5000:
            //
        case 0x6000:
            //
        case 0x7000:
            //
        case 0x8000:
            handleOpcode0x8(opcode);
        case 0x9000:
            //
        case 0xA000:
        case 0xB000:
        case 0xC000:
        case 0xD000:
        case 0xE000:
            handleOpcode0xE(opcode);
        case 0xF000:
            handleOpcode0xF(opcode);
        default:
            break;
    };
};

export function handleOpcode0x0(opcode: u16) {
    switch(opcode) {
        case 0x00E0:

    };
};

export function handleOpcode0x8(opcode: u16) {
    switch(opcode) {
        case 0x0000:

    };
};

export function handleOpcode0xE(opcode: u16) {
    switch(opcode) {
        case 0x0000:

    };
};

export function handleOpcode0xF(opcode: u16) {
    switch(opcode) {
        case 0x0000:

    };
};