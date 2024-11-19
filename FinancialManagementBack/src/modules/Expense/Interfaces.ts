export interface ICreateExpense {
    name: string;
    cost: number;
    date: Date;
    is_recurring?: boolean;
    recurrence_date?: Date | null;
    user_id: number;
}

export interface IUpdateExpense {
    name?: string;
    cost?: number;
    date?: Date;
    is_recurring?: boolean;
    recurrence_date?: Date | null;
    user_id?: number;
}
