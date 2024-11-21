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
import { Revenue } from "../../types/IRevenue";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const RevenuesPage = () => {
    const [revenues, setRevenues] = useState<Revenue[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [originalRevenues, setOriginalRevenues] = useState<Revenue[]>([]);

    const [newRevenue, setNewRevenue] = useState<{
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
                const fetchedRevenues: Revenue[] = await fetcher("/revenue");
                setRevenues(fetchedRevenues);
                setOriginalRevenues(fetchedRevenues);
            } catch (error) {
                console.error("Erro ao carregar receitas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);




    useEffect(() => {
        if (!filters.month && !filters.order && !filters.period) {
            setRevenues(originalRevenues);
            return;
        }

        let filteredRevenues = [...originalRevenues];

        if (filters.month) {
            const month = filters.month ?? '';
            filteredRevenues = filteredRevenues.filter(
                (revenue) => new Date(revenue.date).getMonth() + 1 === parseInt(month)
            );
        }

        if (filters.period && filters.period.from && filters.period.to) {
            const from = new Date(filters.period.from);
            const to = new Date(filters.period.to);

            filteredRevenues = filteredRevenues.filter((revenue) => {
                const revenueDate = new Date(revenue.date);
                return revenueDate >= from && revenueDate <= to;
            });
        }


        if (filters.order) {
            filteredRevenues.sort((a, b) => {
                const comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
                return filters.order === "asc" ? comparison : -comparison;
            });
        }

        console.log(filteredRevenues)

        setRevenues(filteredRevenues);
    }, [filters, originalRevenues]);

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
            recurrence_date: checked ? prev.recurrence_date : "",
        }));
    };



    const handleSubmit = async () => {
        try {
            if (isEditMode) {
                await putter(`/revenue/${newRevenue.id}`, {
                    ...newRevenue,
                    cost: parseFloat(newRevenue.cost),
                    recurrence_date: newRevenue.is_recurring
                        ? newRevenue.recurrence_date
                        : null,
                });
            } else {
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
            const updatedRevenues: Revenue[] = await fetcher("/revenue");
            setRevenues(updatedRevenues);
        } catch (error) {
            console.error("Erro ao salvar receita:", error);
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
                    await deleter(`/revenue/${id}`);
                    setRevenues(revenues.filter((revenue) => revenue.id !== id));
                    Swal.fire({
                        title: "Excluído!",
                        text: "A receita foi excluída com sucesso.",
                        icon: "success",
                    });
                } catch (error) {
                    console.error("Erro ao excluir receita:", error);
                    Swal.fire({
                        title: "Erro!",
                        text: "Houve um problema ao excluir a receita.",
                        icon: "error",
                    });
                }
            }
        });
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
        setIsEditMode(true);
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
                    Receitas
                </Typography>

                {/* Botão para adicionar receita */}
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

                    {/* Botão de adicionar receita */}
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleAddNew}
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
                                                    onClick={() => handleEdit(revenue)}
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
            <FilterSidebar
                open={openFilters}
                onClose={() => setOpenFilters(false)}
                onApplyFilters={(newFilters) => {
                    setFilters(newFilters);  // Atualiza os filtros e recarrega as receitas
                    setOpenFilters(false);    // Fecha o filtro
                }}
            />
        </SideMenu>

    );
};

export default RevenuesPage;
