import { IUpdateUser } from "../Interfaces";
import { UsersRepository } from "../Repository/UserRepository"



const repository = new UsersRepository();

export class UsersService {

    async findAll() {
        return await repository.findAll()
    }

    async getUserById(id: number) {
        const user = await repository.getUserById(id);

        if (!user) {
            throw new Error("Usuário não encontrado");
        }

        return user;
    }

    async update(id: number, data: IUpdateUser) {
        return repository.update(id, data);
    }

    async delete(id: number) {
        return repository.delete(id);
    }

}