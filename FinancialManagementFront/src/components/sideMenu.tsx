"use client";

import { Button, Typography, Drawer, List, ListItemButton, ListItemText, IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Link from "next/link";
import { useState } from "react";

const SideMenu = () => {
    const [open, setOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado de login do usuário

    const toggleDrawer = (open: boolean) => {
        setOpen(open);
    };

    const handleLogout = () => {
        setIsLoggedIn(false); // Simula o logout, você pode adicionar a lógica de logout aqui
    };

    return (
        <div>
            <header className="flex justify-between items-center px-6 py-4 shadow-sm bg-white">
                {/* Botão de menu à esquerda */}
                <IconButton onClick={() => toggleDrawer(true)} edge="start" color="primary">
                    <MenuIcon />
                </IconButton>

                <Link href="/" passHref>
                    <Typography variant="h5" color="primary" className="font-bold cursor-pointer">
                        FinancEase
                    </Typography>
                </Link>

                <nav className="space-x-4">
                    {!isLoggedIn ? (
                        <>
                            <Button variant="text" color="primary">
                                Soluções
                            </Button>
                            <Link href="#sobre" passHref>
                                <Button variant="text" color="primary">
                                    Sobre
                                </Button>
                            </Link>
                            <Button variant="contained" color="primary" href="/pages/login">
                                Login
                            </Button>
                        </>
                    ) : (
                        <Button variant="contained" color="primary" onClick={handleLogout}>
                            Logout
                        </Button>
                    )}
                </nav>
            </header>

            <Drawer anchor="left" open={open} onClose={() => toggleDrawer(false)}>
                <div className="w-64 p-4">
                    <Typography variant="h5" color="primary" className="font-bold mb-4">
                        FinancEase
                    </Typography>

                    <List>
                        <ListItemButton component="a" href="/receitas">
                            <ListItemText primary="Receitas" />
                        </ListItemButton>
                        <ListItemButton component="a" href="/despesas">
                            <ListItemText primary="Despesas" />
                        </ListItemButton>
                        <ListItemButton component="a" href="/dashboard">
                            <ListItemText primary="DashBoard" />
                        </ListItemButton>
                        {isLoggedIn && (
                            <ListItemButton component="a" onClick={handleLogout}>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        )}
                    </List>
                </div>
            </Drawer>
        </div>
    );
};

export default SideMenu;
