"use client";

import Swal from "sweetalert2";
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
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterSidebar from "../../../components/FilterSideBar"; // Ajuste o caminho conforme necessário
import { Expense } from "../../types/IExpense";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ExpensePage = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [originalExpenses, setOriginalExpenses] = useState<Expense[]>([]);

    const [newExpense, setNewExpense] = useState<{
        id?: number;
        name: string;
        cost: string;
        date: string;
        is_recurring: boolean;
        recurrence_date?: string;
    }>({
        name: "",
        cost: "",
        date: "",
        is_recurring: false,
        recurrence_date: "",
    });

    const [openFilters, setOpenFilters] = useState<boolean>(false);
    const [filters, setFilters] = useState<{
        month?: string;
        order?: "asc" | "desc";
        period?: { from: string; to: string };
    }>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const fetchedExpenses: Expense[] = await fetcher("/expense");
                setExpenses(fetchedExpenses);
                setOriginalExpenses(fetchedExpenses);
            } catch (error) {
                console.error("Erro ao carregar despesas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);




    useEffect(() => {
        if (!filters.month && !filters.order && !filters.period) {
            setExpenses(originalExpenses);
            return;
        }

        let filteredExpenses = [...originalExpenses];

        if (filters.month) {
            const month = filters.month ?? '';
            filteredExpenses = filteredExpenses.filter(
                (expense) => new Date(expense.date).getMonth() + 1 === parseInt(month)
            );
        }

        if (filters.period && filters.period.from && filters.period.to) {
            const from = new Date(filters.period.from);
            const to = new Date(filters.period.to);

            filteredExpenses = filteredExpenses.filter((expense) => {
                const expenseDate = new Date(expense.date);
                return expenseDate >= from && expenseDate <= to;
            });
        }


        if (filters.order) {
            filteredExpenses.sort((a, b) => {
                const comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
                return filters.order === "asc" ? comparison : -comparison;
            });
        }

        console.log(filteredExpenses)

        setExpenses(filteredExpenses);
    }, [filters, originalExpenses]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setNewExpense((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { checked } = e.target;
        setNewExpense((prev) => ({
            ...prev,
            is_recurring: checked,
            recurrence_date: checked ? prev.recurrence_date : "",
        }));
    };



    const handleSubmit = async () => {
        try {
            if (isEditMode) {
                await putter(`/expense/${newExpense.id}`, {
                    ...newExpense,
                    cost: parseFloat(newExpense.cost),
                    recurrence_date: newExpense.is_recurring
                        ? newExpense.recurrence_date
                        : null,
                });
            } else {
                await poster("/expense", {
                    ...newExpense,
                    cost: parseFloat(newExpense.cost),
                    recurrence_date: newExpense.is_recurring
                        ? newExpense.recurrence_date
                        : null,
                });
            }
            setOpenModal(false);
            setLoading(true);
            const updatedExpenses: Expense[] = await fetcher("/expense");
            setExpenses(updatedExpenses);
        } catch (error) {
            console.error("Erro ao salvar despesa:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id?: number) => {
        Swal.fire({
            title: "Tem certeza?",
            text: "Você não poderá reverter esta ação!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sim, excluir!",
            cancelButtonText: "Cancelar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleter(`/expense/${id}`);
                    setExpenses(expenses.filter((expense) => expense.id !== id));
                    Swal.fire({
                        title: "Excluído!",
                        text: "A despesa foi excluída com sucesso.",
                        icon: "success",
                    });
                } catch (error) {
                    console.error("Erro ao excluir despesa:", error);
                    Swal.fire({
                        title: "Erro!",
                        text: "Houve um problema ao excluir a despesa.",
                        icon: "error",
                    });
                }
            }
        });
    };

    const handleEdit = (expense: Expense) => {
        setNewExpense({
            id: expense.id,
            name: expense.name,
            cost: expense.cost.toString(),
            date: new Date(expense.date).toISOString().split("T")[0],
            is_recurring: expense.is_recurring || false,
            recurrence_date: expense.recurrence_date
                ? new Date(expense.recurrence_date).toISOString().split("T")[0]
                : "",
        });
        setIsEditMode(true);
        setOpenModal(true);
    };

    const handleAddNew = () => {
        setNewExpense({
            name: "",
            cost: "",
            date: "",
            is_recurring: false,
            recurrence_date: "",
        });
        setIsEditMode(false);
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
                    Despesas
                </Typography>

                {/* Botão para adicionar despesa */}
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        marginBottom: 2,
                        gap: 2,
                    }}
                >
                    {/* Botão de filtro */}
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setOpenFilters(true)}
                        sx={{
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <FilterAltIcon />
                        Filtrar
                    </Button>

                    {/* Botão de adicionar despesa */}
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleAddNew}
                    >
                        Adicionar Despesa
                    </Button>
                </Box>

                {/* Modal para adicionar/editar despesa */}
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
                            {isEditMode ? "Editar Despesa" : "Adicionar Despesa"}
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Nome"
                                    name="name"
                                    value={newExpense.name}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Custo"
                                    name="cost"
                                    value={newExpense.cost}
                                    onChange={handleInputChange}
                                    type="number"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Data"
                                    name="date"
                                    value={newExpense.date}
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
                                            checked={newExpense.is_recurring}
                                            onChange={handleCheckboxChange}
                                        />
                                    }
                                    label="Custo Recorrente?"
                                />
                            </Grid>
                            {newExpense.is_recurring && (
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Data de Recorrência"
                                        name="recurrence_date"
                                        value={newExpense.recurrence_date}
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
                                {expenses.length > 0 ? (
                                    expenses.map((expense) => (
                                        <TableRow key={expense.id}>
                                            <TableCell>{expense.name}</TableCell>
                                            <TableCell>{expense.cost}</TableCell>
                                            <TableCell>{new Date(new Date(expense.date).getTime() + new Date().getTimezoneOffset() * 60000).toLocaleDateString("pt-BR")}</TableCell>
                                            <TableCell>{expense.is_recurring ? "Sim" : "Não"}</TableCell>
                                            <TableCell>
                                                {expense.is_recurring
                                                    ? new Date(new Date(expense.recurrence_date!).getTime() + new Date().getTimezoneOffset() * 60000).toLocaleDateString("pt-BR")
                                                    : "-"}
                                            </TableCell>

                                            <TableCell>
                                                <IconButton
                                                    color="primary"
                                                    onClick={() => handleEdit(expense)}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    color="error"
                                                    onClick={() => handleDelete(expense.id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">
                                            Nenhuma despesa encontrada
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
            <FilterSidebar
                open={openFilters}
                onClose={() => setOpenFilters(false)}
                onApplyFilters={(newFilters) => {
                    setFilters(newFilters);  // Atualiza os filtros e recarrega as despesas
                    setOpenFilters(false);    // Fecha o filtro
                }}
            />
        </SideMenu>

    );
};

export default ExpensePage;
