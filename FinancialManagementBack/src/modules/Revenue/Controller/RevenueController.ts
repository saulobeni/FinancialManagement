import { Request, Response } from 'express';
import { RevenueService } from '../Service/RevenueService';
import { Prisma } from '@prisma/client';

const service = new RevenueService();

export class RevenueController {

    async create(req: Request, res: Response) {
        try {
            const revenueData = req.body;
            const newRevenue = await service.create(revenueData);
            res.status(201).json(newRevenue);
        } catch (error) {
            const typedError = error as Prisma.PrismaClientKnownRequestError;
            res.status(500).json({ message: "Erro ao criar receita!", error: typedError });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const allRevenues = await service.findAll();
            res.status(200).send(allRevenues);
        } catch (error) {
            const typedError = error as Prisma.PrismaClientKnownRequestError;
            res.status(500).json({ message: "Erro ao buscar todas as receitas!", error: typedError });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const revenueData = req.body;
            const revenueId = parseInt(req.params.id);
            const updatedRevenue = await service.update(revenueId, revenueData);
            res.status(200).send(updatedRevenue);
        } catch (error) {
            const typedError = error as Prisma.PrismaClientKnownRequestError;
            res.status(500).json({ message: "Erro ao atualizar receita!", error: typedError });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const revenueId = parseInt(req.params.id);
            await service.delete(revenueId);
            res.status(200).send({ message: "Receita deletada com sucesso!" });
        } catch (error) {
            const typedError = error as Prisma.PrismaClientKnownRequestError;
            res.status(500).send({ message: "Erro ao deletar receita!", error: typedError });
        }
    }
}
