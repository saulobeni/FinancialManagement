import { Request, Response } from 'express';
import { ExpenseService } from '../Service/ExpenseService';
import { Prisma } from '@prisma/client';

const service = new ExpenseService();

export class ExpenseController {

    async create(req: Request, res: Response) {
        try {
            const userId = req.user.id;
            const { cost, recurrence_date, ...expenseData } = req.body;

            const expenseWithDecimal = {
                ...expenseData,
                user_id: userId,
                cost: new Prisma.Decimal(cost),
                date: new Date(req.body.date),
            };

            if (recurrence_date) {
                expenseWithDecimal.recurrence_date = new Date(recurrence_date);
            }

            const newExpense = await service.create(expenseWithDecimal);
            res.status(201).json(newExpense);
        } catch (error) {
            console.error(error);
            const typedError = error as Prisma.PrismaClientKnownRequestError;
            res.status(500).json({ message: "Erro ao criar despesa!", error: typedError });
        }
    }


    async getAll(req: Request, res: Response) {
        try {
            const userId = req.user.id;
            const { month } = req.query;

            const allExpenses = await service.findAll(userId, month ? String(month) : undefined);
            res.status(200).send(allExpenses);
        } catch (error) {
            const typedError = error as Prisma.PrismaClientKnownRequestError;
            res.status(500).json({ message: "Erro ao buscar todas as despesas!", error: typedError });
        }
    }


    async update(req: Request, res: Response) {
        try {
            const expenseId = parseInt(req.params.id);
            const { cost, recurrence_date, ...expenseData } = req.body;

            const expenseWithDecimal = {
                ...expenseData,
                cost: cost ? new Prisma.Decimal(cost) : undefined,
                date: new Date(expenseData.date),
            };

            if (recurrence_date) {
                expenseWithDecimal.recurrence_date = new Date(recurrence_date);
            }

            const updatedExpense = await service.update(expenseId, expenseWithDecimal);
            res.status(200).json(updatedExpense);
        } catch (error) {
            console.error(error);
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
