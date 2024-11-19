import { PrismaClient } from "@prisma/client";
import { ICreateRevenue, IUpdateRevenue } from "../Interfaces";

const prisma = new PrismaClient();

export class RevenueRepository {

    async create(data: ICreateRevenue) {
        return prisma.revenue.create({
            data,
        });
    }

    async findAll() {
        return prisma.revenue.findMany({});
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
