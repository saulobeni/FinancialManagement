"use client";

import { Button, Typography } from "@mui/material";
import Link from "next/link";

const Header = () => {
    return (
        <header className="flex justify-between items-center px-6 py-4 shadow-sm bg-white">
            <Link href="/" passHref>
                <Typography variant="h5" color="primary" className="font-bold cursor-pointer">
                    FinancEase
                </Typography>
            </Link>

            <nav className="space-x-4">
                <Button href="#solucoes" variant="text" color="primary">
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
            </nav>
        </header>
    );
};

export default Header;
