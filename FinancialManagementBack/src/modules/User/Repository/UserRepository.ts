import { PrismaClient } from "@prisma/client";
import { IUpdateUser } from "../Interfaces";

const prisma = new PrismaClient()

export class UsersRepository {

    async findByUsername(username: string) {
        return prisma.user.findFirst({
            where: { username },
        });
    }

    async findAll() {
        return await prisma.user.findMany({
            orderBy: {
                username: 'asc',
            },
            select: {
                id: true,
                name: true,
                username: true,
                email: true
            }
        });
    }

    async getUserById(id: number) {
        return prisma.user.findUnique({
            where: {
                id
            },
            select: {
                id: true,
                name: true,
                username: true,
                email: true
            }


        })
    }
    async update(id: number, data: IUpdateUser) {
        return prisma.user.update({
            where: {
                id
            },
            data

        })
    }

    async delete(id: number) {
        return prisma.user.delete({
            where: {
                id
            }
        })
    }

}