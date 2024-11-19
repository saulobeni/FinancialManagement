import { ICreateRevenue, IUpdateRevenue } from "../Interfaces";
import { RevenueRepository } from "../Repository/RevenueRepository";

const repository = new RevenueRepository();

export class RevenueService {

    async create(data: ICreateRevenue) {
        return repository.create(data);
    }

    async findAll() {
        return repository.findAll();
    }

    async delete(id: number) {
        return repository.delete(id);
    }

    async update(id: number, data: IUpdateRevenue) {
        return repository.update(id, data);
    }
}
