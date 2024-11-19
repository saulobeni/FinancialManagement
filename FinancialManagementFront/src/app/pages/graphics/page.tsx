'use client';

import { Box, CssBaseline, Typography, AppBar, Toolbar, IconButton } from '@mui/material';
import { useState } from 'react';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import LayoutWithSidebar from '../../../components/sideMenu';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
            <Box sx={{ flexGrow: 1, bgcolor: 'background.default', paddingTop: 8, padding: 3 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Dashboard de Financeiro
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-around', marginTop: 3 }}>
                    <Box sx={{ width: '45%' }}>
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

                    <Box sx={{ width: '45%' }}>
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
            </Box>
        </LayoutWithSidebar>
    );
};

export default Dashboard;
