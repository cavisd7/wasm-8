const opcode = 0x00E0;

describe("Handle Opcodes", () => {
    test("It should switch based on first nibble of opcode", () => {
        const nibble = opcode & 0xF000;
        expect(nibble).toStrictEqual(0x0000);
    });
});