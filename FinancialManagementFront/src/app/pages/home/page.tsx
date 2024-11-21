"use client";
import { Box, Typography, Container } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import LayoutWithSidebar from "../../../components/sideMenu";
import { useEffect, useState } from "react";
import { fetcher } from "../../../utils/axiosConfig";
import useSWR from "swr";
import { jwtDecode } from "jwt-decode";

interface PayloadItem {
    name: string;
    value: number;
}

interface CustomTooltipProps {
    active: boolean;
    payload: PayloadItem[];
}

interface JwtPayload {
    name: string;
    exp?: number;
}

const getUserNameFromJWT = () => {
    const token = localStorage.getItem("token");
    if (token) {
        try {
            const decoded = jwtDecode<JwtPayload>(token);
            return decoded.name || "Nome não encontrado";
        } catch (error) {
            console.error("Erro ao decodificar o JWT", error);
            return "Erro ao obter nome";
        }
    }
    return "Token não encontrado";
};

const fetchData = async () => {
    const [expenses, income] = await Promise.all([
        fetcher('/expense'), // Endpoint para despesas
        fetcher('/revenue'),  // Endpoint para receitas
    ]);
    return { expenses, income };
};

// Ajuste da tipagem para os dados
interface DashboardData {
    expenses: { name: string; cost: string }[];
    income: { name: string; cost: string }[];
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }: CustomTooltipProps) => {
    if (active && payload && payload.length) {
        const { name, value } = payload[0];
        const totalValue = payload.reduce((sum: number, item: PayloadItem) => sum + item.value, 0);
        const percentage = ((value / totalValue) * 100).toFixed(2);

        return (
            <Box sx={{
                backgroundColor: 'white',
                borderRadius: 2,
                padding: 2,
                boxShadow: 3,
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 10,
            }}>
                <Typography variant="body1" sx={{
                    fontWeight: 'bold',
                    color: '#1976d2'
                }}>
                    {name}
                </Typography>
                <Typography variant="body2" sx={{ color: '#424242' }}>
                    Valor: R$ {value.toFixed(2)}
                </Typography>
                <Typography variant="body2" sx={{ color: '#424242' }}>
                    Percentual: {percentage}%
                </Typography>
            </Box>
        );
    }

    return null;
};


const Dashboard = () => {
    const { data, error } = useSWR<DashboardData>('dashboardData', fetchData, { revalidateOnFocus: false });
    const [expenseData, setExpenseData] = useState<PayloadItem[]>([]);
    const [incomeData, setIncomeData] = useState<PayloadItem[]>([]);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);

    const userName = getUserNameFromJWT();

    useEffect(() => {
        if (data) {
            const expenses = data.expenses.map(expense => ({
                name: expense.name,
                value: parseFloat(expense.cost)
            }));
            const income = data.income.map(income => ({
                name: income.name,
                value: parseFloat(income.cost)
            }));

            setExpenseData(expenses);
            setIncomeData(income);

            setTotalExpenses(expenses.reduce((sum, item) => sum + item.value, 0));
            setTotalIncome(income.reduce((sum, item) => sum + item.value, 0));
        }
    }, [data]);
    

    if (error) {
        console.error('Erro ao carregar dados:', error);
        return <Typography variant="h6" color="error">Erro ao carregar dados</Typography>;
    }

    if (!data) {
        return <Typography variant="h6" color="textSecondary">Carregando...</Typography>;
    }
    

    const renderLegend = (data: PayloadItem[]) => {
        return (
            <Box sx={{ position: 'absolute', right: 10, bottom: 10, maxWidth: 200 }}>
                {data.map((entry, index) => {
                    const percentage = ((entry.value / data.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(2);
                    return (
                        <Box key={`legend-${index}`} sx={{ display: 'flex', alignItems: 'center', marginBottom: 1 }}>
                            <Box
                                sx={{
                                    width: 20,
                                    height: 20,
                                    backgroundColor: ['#8884d8', '#82ca9d', '#ff7300', '#ffbb28', '#d0ed57'][index % 5],
                                    marginRight: 1
                                }}
                            />
                            <Typography variant="body2" sx={{ fontSize: 12, color: 'black' }}>
                                {entry.name}: {percentage}%
                            </Typography>
                        </Box>
                    );
                })}
            </Box>
        );
    };

    const profit = totalIncome - totalExpenses;

    return (
        <LayoutWithSidebar>
            <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', paddingTop: 8 }}>
                <Container maxWidth="lg">
                    <Typography
                        variant="h4"
                        component="h1"
                        className="mb-6 text-center font-bold text-blue-700"
                    >
                        Dashboard de Financeiro
                    </Typography>

                    <Box sx={{ marginBottom: 4 }}>
                        <Typography variant="h5" mt={2} color="gray" sx={{ textAlign: 'center' }}>
                            Olá, {userName}!
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
                        {/* Gráfico de Receitas */}
                        <Box sx={{
                            width: '48%',
                            minHeight: 550,
                            bgcolor: 'white',
                            borderRadius: 2,
                            boxShadow: 3,
                            padding: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                            height: 'auto',
                            paddingBottom: '120px',
                        }}>
                            <Typography
                                variant="h6"
                                component="h2"
                                className="mb-4 text-center font-bold text-blue-700"
                                sx={{ marginBottom: 2 }}
                            >
                                Gráfico de Receitas
                            </Typography>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={incomeData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={140}
                                    >
                                        {incomeData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={['#82ca9d', '#8884d8', '#ff7300', '#ffbb28', '#d0ed57'][index % 5]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip active={false} payload={[]} />} />
                                </PieChart>
                            </ResponsiveContainer>
                            {renderLegend(incomeData)}
                        </Box>

                        {/* Gráfico de Despesas */}
                        <Box sx={{
                            width: '48%',
                            minHeight: 550,
                            bgcolor: 'white',
                            borderRadius: 2,
                            boxShadow: 3,
                            padding: 3,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            overflow: 'hidden',
                            height: 'auto',
                            paddingBottom: '120px',
                        }}>
                            <Typography
                                variant="h6"
                                component="h2"
                                className="mb-4 text-center font-bold text-blue-700"
                                sx={{ marginBottom: 2 }}
                            >
                                Gráfico de Despesas
                            </Typography>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={expenseData}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={140}
                                    >
                                        {expenseData.map((entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={['#8884d8', '#82ca9d', '#ff7300', '#ffbb28', '#d0ed57'][index % 5]}
                                            />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip active={false} payload={[]} />} />
                                </PieChart>
                            </ResponsiveContainer>
                            {renderLegend(expenseData)}
                        </Box>
                    </Box>

                    {/* Quadrados abaixo dos gráficos */}
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
                        <Box sx={{
                            bgcolor: '#82ca9d',
                            width: 150,
                            height: 100,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: 1,
                            borderRadius: 2,
                            boxShadow: 3
                        }}>
                            <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold' }}>
                                Receita
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'white' }}>
                                R$ {totalIncome.toFixed(2)}
                            </Typography>
                        </Box>
                        <Box sx={{
                            bgcolor: '#ff7300',
                            width: 150,
                            height: 100,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: 1,
                            borderRadius: 2,
                            boxShadow: 3
                        }}>
                            <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold' }}>
                                Despesa
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'white' }}>
                                R$ {totalExpenses.toFixed(2)}
                            </Typography>
                        </Box>
                        <Box sx={{
                            bgcolor: '#ffbb28',
                            width: 150,
                            height: 100,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            margin: 1,
                            borderRadius: 2,
                            boxShadow: 3
                        }}>
                            <Typography variant="body1" sx={{ color: 'white', fontWeight: 'bold' }}>
                                Lucro
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'white' }}>
                                R$ {profit.toFixed(2)}
                            </Typography>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </LayoutWithSidebar>
    );
};

export default Dashboard;
