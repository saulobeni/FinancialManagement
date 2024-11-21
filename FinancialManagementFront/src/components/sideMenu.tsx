import React, { useState, useEffect } from 'react';
import { Typography, Drawer, List, ListItemButton, ListItemText, IconButton, ListItemIcon } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ExpenseIcon from '@mui/icons-material/RemoveCircleOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import Link from 'next/link';

interface SideMenuProps {
    children: React.ReactNode;
}

const SideMenu: React.FC<SideMenuProps> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const toggleDrawer = (open: boolean) => {
        setOpen(open);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/pages/login';
        setIsLoggedIn(false);
    };

    return (
        <div>
            {/* Header do Menu */}
            <header className="flex justify-between items-center px-6 py-4 shadow-sm bg-white">
                <IconButton onClick={() => toggleDrawer(true)} edge="start" color="primary">
                    <MenuIcon />
                </IconButton>

                <Link href="/" passHref>
                    <Typography variant="h5" color="primary" className="font-bold cursor-pointer">
                        FinancEase
                    </Typography>
                </Link>
            </header>

            {/* Sidebar Drawer */}
            <Drawer
                anchor="left"
                open={open}
                onClose={() => toggleDrawer(false)}
                variant="temporary"
                sx={{
                    width: 260, // Aumenta o tamanho da sidebar
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 260, // Aumenta o tamanho da sidebar
                        height: '100vh',
                        boxSizing: 'border-box',
                        backgroundColor: '#fff',
                        boxShadow: '4px 0px 10px rgba(0, 0, 0, 0.2)',
                        overflow: 'hidden', // Remover a barra de rolagem
                    },
                }}
            >
                <div className="w-64 p-4">
                    <div className="flex justify-center mb-6">
                        <Typography variant="h5" color="primary" className="font-bold text-center">
                            FinancEase
                        </Typography>
                    </div>

                    <List>
                        <ListItemButton
                            component="a"
                            href="/pages/home"
                            sx={{
                                marginBottom: '12px', // Aumenta o espaçamento entre os itens
                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                borderRadius: '8px',
                                '&:hover': {
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                    transform: 'scale(1.02)',
                                },
                            }}
                        >
                            <ListItemIcon>
                                <AnalyticsIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Home" />
                        </ListItemButton>

                        <ListItemButton
                            component="a"
                            href="/pages/revenue"
                            sx={{
                                marginBottom: '12px', // Aumenta o espaçamento entre os itens
                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                borderRadius: '8px',
                                '&:hover': {
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                    transform: 'scale(1.02)',
                                },
                            }}
                        >
                            <ListItemIcon>
                                <MonetizationOnIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Receitas" />
                        </ListItemButton>

                        <ListItemButton
                            component="a"
                            href="/pages/expense"
                            sx={{
                                marginBottom: '12px', // Aumenta o espaçamento entre os itens
                                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                borderRadius: '8px',
                                '&:hover': {
                                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                    transform: 'scale(1.02)',
                                },
                            }}
                        >
                            <ListItemIcon>
                                <ExpenseIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText primary="Despesas" />
                        </ListItemButton>

                        {isLoggedIn && (
                            <ListItemButton
                                onClick={handleLogout}
                                sx={{
                                    marginBottom: '12px', // Aumenta o espaçamento entre os itens
                                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                                    borderRadius: '8px',
                                    '&:hover': {
                                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                                        transform: 'scale(1.02)',
                                    },
                                }}
                            >
                                <ListItemIcon>
                                    <LogoutIcon color="error" />
                                </ListItemIcon>
                                <ListItemText primary="Sair" />
                            </ListItemButton>
                        )}
                    </List>
                </div>
            </Drawer>

            {/* Área para exibir o conteúdo */}
            <main>{children}</main>
        </div>
    );
};

export default SideMenu;
