import { PrismaClient } from "@prisma/client";
import { ICreateExpense, IUpdateExpense } from "../Interfaces";

const prisma = new PrismaClient();

export class ExpenseRepository {

    async create(data: ICreateExpense) {
        return prisma.expense.create({
            data,
        });
    }

    async findAll(userId: number) {
        return prisma.expense.findMany({
            where: {
                user_id: userId
            }
        });
    }

    async findAllByMonth(month: string, userId: number) {
        const currentYear = new Date().getFullYear();

        const monthNumber = Number(month);

        return prisma.expense.findMany({
            where: {
                date: {
                    gte: new Date(currentYear, monthNumber - 1, 1),
                    lt: new Date(currentYear, monthNumber, 1),
                },
                user_id: userId
            },
        });
    }

    async update(id: number, data: IUpdateExpense) {
        return prisma.expense.update({
            where: {
                id,
            },
            data,
        });
    }

    async delete(id: number) {
        return prisma.expense.delete({
            where: {
                id,
            },
        });
    }
}
