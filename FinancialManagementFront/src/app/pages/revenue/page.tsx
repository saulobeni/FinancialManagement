"use client";

import { useEffect, useState } from "react";
import { fetcher, poster, putter, deleter } from "../../../utils/axiosConfig";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    CircularProgress,
    Box,
    Button,
    Modal,
    TextField,
    Grid,
    FormControlLabel,
    Checkbox,
    IconButton,
} from "@mui/material";
import SideMenu from "../../../components/sideMenu";
import { Revenue } from "../../types/IRevenue";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const RevenuesPage = () => {
    const [revenues, setRevenues] = useState<Revenue[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false); // Para controlar se é edição ou criação

    // Campos do formulário
    const [newRevenue, setNewRevenue] = useState({
        name: "",
        cost: "",
        date: "",
        is_recurring: false,
        recurrence_date: "",
    });

    useEffect(() => {
        const fetchRevenues = async () => {
            try {
                const data: Revenue[] = await fetcher("/revenue");
                setRevenues(data);
            } catch (error) {
                console.error("Erro ao buscar receitas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRevenues();
    }, []);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setNewRevenue((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { checked } = e.target;
        setNewRevenue((prev) => ({
            ...prev,
            is_recurring: checked,
            recurrence_date: checked ? prev.recurrence_date : "", // Limpa a data se não for recorrente
        }));
    };

    const handleSubmit = async () => {
        try {
            if (isEditMode) {
                // Se for edição, chama a função putter para atualizar
                await putter(`/revenue/${newRevenue.id}`, {
                    ...newRevenue,
                    cost: parseFloat(newRevenue.cost),
                    recurrence_date: newRevenue.is_recurring
                        ? newRevenue.recurrence_date
                        : null,
                });
            } else {
                // Se for criação, chama a função poster para adicionar
                await poster("/revenue", {
                    ...newRevenue,
                    cost: parseFloat(newRevenue.cost),
                    recurrence_date: newRevenue.is_recurring
                        ? newRevenue.recurrence_date
                        : null,
                });
            }
            setOpenModal(false);
            setLoading(true);
            // Recarregar a lista de receitas
            const updatedRevenues: Revenue[] = await fetcher("/revenue");
            setRevenues(updatedRevenues);
        } catch (error) {
            console.error("Erro ao salvar receita:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await deleter(`/revenue/${id}`);
            setRevenues(revenues.filter((revenue) => revenue.id !== id));
        } catch (error) {
            console.error("Erro ao excluir receita:", error);
        }
    };

    const handleEdit = (revenue: Revenue) => {
        setNewRevenue({
            id: revenue.id,
            name: revenue.name,
            cost: revenue.cost.toString(),
            date: new Date(revenue.date).toISOString().split("T")[0],
            is_recurring: revenue.is_recurring || false,
            recurrence_date: revenue.recurrence_date
                ? new Date(revenue.recurrence_date).toISOString().split("T")[0]
                : "",
        });
        setIsEditMode(true);  // Configura o modo de edição
        setOpenModal(true);
    };

    const handleAddNew = () => {
        setNewRevenue({
            name: "",
            cost: "",
            date: "",
            is_recurring: false,
            recurrence_date: "",
        });
        setIsEditMode(false);  // Configura o modo de adição
        setOpenModal(true);
    };

    return (
        <SideMenu>
            <Box
                sx={{
                    flexGrow: 1,
                    bgcolor: "#f9fafb",
                    padding: 3,
                    minHeight: "100vh",
                }}
            >
                <Typography
                    variant="h4"
                    component="h1"
                    className="mb-6 text-center font-bold text-blue-700"
                >
                    Receitas
                </Typography>

                {/* Botão para adicionar receita */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleAddNew}  // Abre o modal de adição
                    >
                        Adicionar Receita
                    </Button>
                </Box>

                {/* Modal para adicionar/editar receita */}
                <Modal
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                >
                    <Paper
                        sx={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            padding: 4,
                            width: 400,
                            borderRadius: 8,
                        }}
                    >
                        <Typography
                            id="modal-title"
                            variant="h6"
                            component="h2"
                            gutterBottom
                        >
                            {isEditMode ? "Editar Receita" : "Adicionar Receita"}
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Nome"
                                    name="name"
                                    value={newRevenue.name}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Custo"
                                    name="cost"
                                    value={newRevenue.cost}
                                    onChange={handleInputChange}
                                    type="number"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Data"
                                    name="date"
                                    value={newRevenue.date}
                                    onChange={handleInputChange}
                                    type="date"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={newRevenue.is_recurring}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label="Custo Recorrente?"
                                />
                            </Grid>
                            {newRevenue.is_recurring && (
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Data de Recorrência"
                                        name="recurrence_date"
                                        value={newRevenue.recurrence_date}
                                        onChange={handleInputChange}
                                        type="date"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            )}
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={handleSubmit}
                                    fullWidth
                                >
                                    {isEditMode ? "Salvar Alterações" : "Salvar"}
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Modal>

                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <CircularProgress color="primary" />
                    </div>
                ) : (
                    <TableContainer
                        component={Paper}
                        className="shadow-lg rounded-xl overflow-hidden bg-white"
                    >
                        <Table>
                            <TableHead className="bg-blue-500">
                                <TableRow>
                                    <TableCell className="text-white font-bold">Nome</TableCell>
                                    <TableCell className="text-white font-bold">Valor</TableCell>
                                    <TableCell className="text-white font-bold">Data</TableCell>
                                    <TableCell className="text-white font-bold">Recorrente</TableCell>
                                    <TableCell className="text-white font-bold">Data de Recorrência</TableCell>
                                    <TableCell className="text-white font-bold">Ações</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {revenues.length > 0 ? (
                                    revenues.map((revenue) => (
                                        <TableRow key={revenue.id}>
                                            <TableCell>{revenue.name}</TableCell>
                                            <TableCell>{revenue.cost}</TableCell>
                                            <TableCell>{new Date(new Date(revenue.date).getTime() + new Date().getTimezoneOffset() * 60000).toLocaleDateString("pt-BR")}</TableCell>
                                            <TableCell>{revenue.is_recurring ? "Sim" : "Não"}</TableCell>
                                            <TableCell>
                                                {revenue.is_recurring
                                                    ? new Date(new Date(revenue.recurrence_date!).getTime() + new Date().getTimezoneOffset() * 60000).toLocaleDateString("pt-BR")
                                                    : "-"}
                                            </TableCell>

                                            <TableCell>
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => handleEdit(revenue)} // Abre o modal de edição
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleDelete(revenue.id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">
                                            Nenhuma receita encontrada
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
        </SideMenu>
    );
};

export default RevenuesPage;
