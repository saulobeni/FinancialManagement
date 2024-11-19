export interface Revenue {
    id: number;
    name: string;
    cost: number;
    date: Date;
    is_recurring?: boolean;
    recurrence_date?: Date;
    user_id: number;
    User: {
        id: number;
        name: string;
        email: string;
    };
}
