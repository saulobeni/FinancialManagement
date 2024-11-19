export interface ICreateRevenue {
    name: string;
    cost: number;
    date: Date;
    is_recurring?: boolean;
    recurrence_date?: Date | null;
    user_id: number;
}

export interface IUpdateRevenue {
    name?: string;
    cost?: number;
    date?: Date;
    is_recurring?: boolean;
    recurrence_date?: Date | null;
    user_id?: number;
}
