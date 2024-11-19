import { Request, Response } from 'express';
import { ExpenseService } from '../Service/ExpenseService';
import { Prisma } from '@prisma/client';

const service = new ExpenseService();

export class ExpenseController {

    async create(req: Request, res: Response) {
        try {
            const expenseData = req.body;
            const newExpense = await service.create(expenseData);
            res.status(201).json(newExpense);
        } catch (error) {
            const typedError = error as Prisma.PrismaClientKnownRequestError;
            res.status(500).json({ message: "Erro ao criar despesa!", error: typedError });
        }
    }

    async getAll(req: Request, res: Response) {
        try {
            const allExpenses = await service.findAll();
            res.status(200).send(allExpenses);
        } catch (error) {
            const typedError = error as Prisma.PrismaClientKnownRequestError;
            res.status(500).json({ message: "Erro ao buscar todas as despesas!", error: typedError });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const expenseData = req.body;
            const expenseId = parseInt(req.params.id);
            const updatedExpense = await service.update(expenseId, expenseData);
            res.status(200).send(updatedExpense);
        } catch (error) {
            const typedError = error as Prisma.PrismaClientKnownRequestError;
            res.status(500).json({ message: "Erro ao atualizar despesa!", error: typedError });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const expenseId = parseInt(req.params.id);
            await service.delete(expenseId);
            res.status(200).send({ message: "Despesa deletada com sucesso!" });
        } catch (error) {
            const typedError = error as Prisma.PrismaClientKnownRequestError;
            res.status(500).send({ message: "Erro ao deletar despesa!", error: typedError });
        }
    }
}
