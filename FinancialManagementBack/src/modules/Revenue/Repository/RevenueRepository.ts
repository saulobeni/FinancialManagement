import { PrismaClient } from "@prisma/client";
import { ICreateRevenue, IUpdateRevenue } from "../Interfaces";

const prisma = new PrismaClient();

export class RevenueRepository {

    async create(data: ICreateRevenue) {
        return prisma.revenue.create({
            data,
        });
    }

    async findAll(userId: number) {
        return prisma.revenue.findMany({
            where: {
                user_id: userId
            }
        });
    }

    async findAllByMonth(month: string, userId: number) {
        const currentYear = new Date().getFullYear();

        const monthNumber = Number(month);

        return prisma.revenue.findMany({
            where: {
                date: {
                    gte: new Date(currentYear, monthNumber - 1, 1),
                    lt: new Date(currentYear, monthNumber, 1),
                },
                user_id: userId
            },
        });
    }

    async update(id: number, data: IUpdateRevenue) {
        return prisma.revenue.update({
            where: {
                id,
            },
            data,
        });
    }

    async delete(id: number) {
        return prisma.revenue.delete({
            where: {
                id,
            },
        });
    }
}
