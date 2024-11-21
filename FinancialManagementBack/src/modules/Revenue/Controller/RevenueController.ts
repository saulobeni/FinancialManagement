import { Request, Response } from 'express';
import { RevenueService } from '../Service/RevenueService';
import { Prisma } from '@prisma/client';

const service = new RevenueService();

export class RevenueController {

    async create(req: Request, res: Response) {
        try {
            const userId = req.user.id;
            const { cost, recurrence_date, ...revenueData } = req.body;

            const revenueWithDecimal = {
                ...revenueData,
                user_id: userId,
                cost: new Prisma.Decimal(cost),
                date: new Date(req.body.date),
            };

            if (recurrence_date) {
                revenueWithDecimal.recurrence_date = new Date(recurrence_date);
            }

            const newRevenue = await service.create(revenueWithDecimal);
            res.status(201).json(newRevenue);
        } catch (error) {
            console.error(error); 
            const typedError = error as Prisma.PrismaClientValidationError;
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
            const revenueId = parseInt(req.params.id);
            const { cost, recurrence_date, ...revenueData } = req.body;

            const revenueWithDecimal = {
                ...revenueData,
                cost: cost ? new Prisma.Decimal(cost) : undefined,
                date: new Date(revenueData.date),
            };

            if (recurrence_date) {
                revenueWithDecimal.recurrence_date = new Date(recurrence_date);
            }

            const updatedRevenue = await service.update(revenueId, revenueWithDecimal);
            res.status(200).json(updatedRevenue);
        } catch (error) {
            console.error(error);  
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
