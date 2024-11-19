import { Request, Response } from 'express';
import { UsersService } from '../Service/UserService';
import { Prisma } from '@prisma/client';

const service = new UsersService();

export class UsersController {

    async getAll(req: Request, res: Response) {
        try {
            const allUsers = await service.findAll();
            res.status(200).send(allUsers);
        } catch (error) {
            const typedError = error as Prisma.PrismaClientKnownRequestError;
            res.status(500).json({ message: "Erro ao buscar usuários!", error: typedError });
        }
    }

    async getUsersById(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.id);
            const userById = await service.getUserById(userId);
            res.status(200).send(userById);
        } catch (error) {
            const typedError = error as Prisma.PrismaClientKnownRequestError;
            res.status(500).json({ message: "Erro ao buscar usuário", error: typedError });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const usersData = req.body;
            const userId = parseInt(req.params.id);
            const user = await service.update(userId, usersData);
            res.status(200).send(user);
        } catch (error) {
            const typedError = error as Prisma.PrismaClientKnownRequestError;
            res.status(500).json({ message: "Erro ao atualizar usuário!", error: typedError });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const userId = parseInt(req.params.id);
            await service.delete(userId);
    
            res.status(200).send({ message: "Usuário deletado com sucesso!" });
        } catch (error) {
            const typedError = error as Prisma.PrismaClientKnownRequestError;
            res.status(500).send({ message: "Erro ao deletar usuário!", error: typedError });
        }
    }
    
}
