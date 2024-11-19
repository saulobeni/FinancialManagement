"use client";

import { Box, CssBaseline, Typography, Container } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import LayoutWithSidebar from "../../../components/sideMenu";

// Dados de exemplo para os gráficos
const expenseData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
];

const incomeData = [
    { name: 'Jan', value: 2400 },
    { name: 'Feb', value: 1398 },
    { name: 'Mar', value: 9800 },
    { name: 'Apr', value: 3908 },
    { name: 'May', value: 4800 },
];

const Dashboard = () => {
    return (
        <LayoutWithSidebar>
            <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', paddingTop: 8 }}>
                <Container maxWidth="lg">
                    <Typography variant="h4" align="center" color="primary" gutterBottom>
                        Dashboard de Financeiro
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 3 }}>
                        <Box sx={{ width: '45%', bgcolor: 'white', borderRadius: 2, boxShadow: 3, padding: 3 }}>
                            <Typography variant="h6" align="center" gutterBottom>
                                Gráfico de Despesas
                            </Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={expenseData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                                </LineChart>
                            </ResponsiveContainer>
                        </Box>

                        <Box sx={{ width: '45%', bgcolor: 'white', borderRadius: 2, boxShadow: 3, padding: 3 }}>
                            <Typography variant="h6" align="center" gutterBottom>
                                Gráfico de Receitas
                            </Typography>
                            <ResponsiveContainer width="100%" height={300}>
                                <LineChart data={incomeData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                                </LineChart>
                            </ResponsiveContainer>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </LayoutWithSidebar>
    );
};

export default Dashboard;
