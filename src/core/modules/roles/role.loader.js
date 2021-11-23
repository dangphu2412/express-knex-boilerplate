import { NotFoundException } from 'packages/httpException';
import { RoleRepository } from './role.repository';

class Loader {
    nameToRole = new Map();

    constructor() {
        this.roleRepository = RoleRepository;
    }

    async getRoleByName(name) {
        if (!this.nameToRole.has(name)) {
            const role = await this.roleRepository.query().where('name', '=', name);
            if (!role) {
                throw NotFoundException(`No role: ${name} found`);
            }
            this.nameToRole.set(name, role);
            return role;
        }

        return this.nameToRole.get(name);
    }
}

export const RoleLoader = new Loader();
