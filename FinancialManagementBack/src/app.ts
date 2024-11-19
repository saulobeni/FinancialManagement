import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import UserRoutes from './modules/User/Routes/UserRoutes';
import { authenticate } from './middlewares/authenticate';
import AuthRoutes from './modules/Auth/Routes/AuthRoutes';
import RevenueRoutes from './modules/Revenue/Routes/RevenueRoutes';
import ExpenseRoutes from './modules/Expense/Routes/ExpenseRoutes';

dotenv.config();

export const app = express();
export const port = 3333;

app.use(express.json({ limit: '50mb' }));
app.use(cors());

app.use('/auth', AuthRoutes);
app.use(authenticate);
app.use('/users', UserRoutes);
app.use('/revenue', RevenueRoutes);
app.use('/expense', ExpenseRoutes);


