class Assembler {
    convertToEntity(dto) {
        return {
            username: dto.username,
            password: dto.password,
            email: dto.email,
            fullname: dto.fullName
        };
    }
}

export const UserAssembler = new Assembler();
