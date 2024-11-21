"use client";

import { useState } from "react";
import {
    TextField,
    Button,
    Box,
    Typography,
    Paper,
    Snackbar,
    Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { poster } from "@/utils/axiosConfig";
import Footer from "@/components/footer";
import Header from "@/components/header";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] =
        useState<"error" | "success">("error");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password) {
            setSnackbarMessage("Ambos os campos são obrigatórios.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
            return;
        }

        try {
            const loginData = { username, password };
            const response = await poster("/auth/login", loginData);

            if (response.token) {
                localStorage.setItem("token", response.token);
                setSnackbarMessage("Login bem-sucedido! Redirecionando...");
                setSnackbarSeverity("success");
                setOpenSnackbar(true);

                setTimeout(() => {
                    router.push("/pages/home");
                }, 2000);
            }
        } catch (error: unknown) {
            if (error instanceof Error && "response" in error) {
                const axiosError = error as AxiosError;
                if (axiosError.response?.status === 401) {
                    setSnackbarMessage(
                        "Credenciais inválidas. Por favor, verifique seu usuário e senha."
                    );
                    setSnackbarSeverity("error");
                } else {
                    setSnackbarMessage(`Falha no login. Erro: ${axiosError.message}`);
                    setSnackbarSeverity("error");
                }
            } else {
                setSnackbarMessage(
                    "Falha no login. Verifique suas credenciais e tente novamente."
                );
                setSnackbarSeverity("error");
            }
            setOpenSnackbar(true);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Adicionando o Header no topo da página */}
            <Header />

            {/* Main content */}
            <div className="flex flex-grow items-center justify-center p-4">
                <Paper elevation={3} className="w-full max-w-sm p-6">
                    <Typography variant="h4" className="text-center mb-6">
                        Login
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Box className="flex flex-col gap-4">
                            <TextField
                                label="Usuário"
                                type="text"
                                fullWidth
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <TextField
                                label="Senha"
                                type="password"
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <Button variant="contained" color="primary" type="submit" fullWidth>
                                Entrar
                            </Button>
                        </Box>
                    </form>

                    <div className="mt-4 text-center">
                        <Typography variant="body2" className="text-gray-500">
                            Não tem uma conta?{" "}
                            <a href="/pages/register" className="text-blue-500 hover:underline">
                                Cadastre-se
                            </a>
                        </Typography>
                    </div>
                </Paper>
            </div>

            <Footer />

            {/* Snackbar */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
            >
                <Alert
                    onClose={() => setOpenSnackbar(false)}
                    severity={snackbarSeverity}
                    sx={{ width: "100%" }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Login;
