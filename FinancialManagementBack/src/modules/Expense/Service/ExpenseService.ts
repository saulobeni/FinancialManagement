import { ICreateExpense, IUpdateExpense } from "../Interfaces";
import { ExpenseRepository } from "../Repository/ExpenseRepository";

const repository = new ExpenseRepository();

export class ExpenseService {

    async create(data: ICreateExpense) {
        return repository.create(data);
    }

    async findAll() {
        return repository.findAll();
    }

    async delete(id: number) {
        return repository.delete(id);
    }

    async update(id: number, data: IUpdateExpense) {
        return repository.update(id, data);
    }

}
