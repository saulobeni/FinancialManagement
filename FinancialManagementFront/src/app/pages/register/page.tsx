"use client";

import { useState } from "react";
import { TextField, Button, Box, Typography, Paper, Snackbar, Alert } from "@mui/material";
import { useRouter } from "next/navigation";
import { poster } from "../../../utils/axiosConfig";
import Header from "@/components/header";

const SignUp = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"error" | "success">("error");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !username || !email || !password || !confirmPassword) {
            setSnackbarMessage("Todos os campos são obrigatórios.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
            return;
        }

        // Validação de senha
        if (password !== confirmPassword) {
            setSnackbarMessage("As senhas não coincidem.");
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
            return;
        }

        try {
            const signupData = { name, username, email, password };
            const response = await poster("/auth/register", signupData);

            console.log(response)

            if (response) {
                setSnackbarMessage("Conta criada com sucesso! Você será redirecionado para o login.");
                setSnackbarSeverity("success");
                setOpenSnackbar(true);

                setTimeout(() => {
                    router.push("/pages/login");
                }, 2000);
            }
        } catch (error: unknown) {
            if (error instanceof Error) {
                setSnackbarMessage(`Erro ao criar a conta. Por favor, verifique seu usuário e senha.`);
            } else {
                setSnackbarMessage("Erro desconhecido ao criar a conta.");
            }
            setSnackbarSeverity("error");
            setOpenSnackbar(true);
        }
    };

    return (
        <>
            {/* Header stays on top */}
            <Header />

            {/* Main content starts below the header */}
            <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 pt-16">
                <Paper elevation={3} className="w-full max-w-sm p-6">
                    <Typography variant="h4" className="text-center mb-6">
                        Cadastro
                    </Typography>

                    <form onSubmit={handleSubmit}>
                        <Box className="flex flex-col gap-4">
                            <TextField
                                label="Nome Completo"
                                type="text"
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                            <TextField
                                label="Nome de usuário"
                                type="text"
                                fullWidth
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                            <TextField
                                label="Confirmar Senha"
                                type="password"
                                fullWidth
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                            >
                                Registrar
                            </Button>
                        </Box>
                    </form>

                    <div className="mt-4 text-center">
                        <Typography variant="body2" className="text-gray-500">
                            Já tem uma conta?{" "}
                            <a href="/pages/login" className="text-blue-500 hover:underline">
                                Faça login
                            </a>
                        </Typography>
                    </div>
                </Paper>

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
        </>
    );
};

export default SignUp;
