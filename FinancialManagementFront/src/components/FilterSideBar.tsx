import {
    Drawer,
    Box,
    Typography,
    TextField,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    SelectChangeEvent,
    Divider,
} from "@mui/material";
import { useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

interface FilterSidebarProps {
    open: boolean;
    onClose: () => void;
    onApplyFilters: (filters: {
        month?: string;
        order?: "asc" | "desc" | undefined;
        period?: { from: string; to: string };
    }) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ open, onClose, onApplyFilters }) => {
    const [filters, setFilters] = useState<{
        month: string | undefined;
        order: "asc" | "desc" | undefined;
        period: { from: string; to: string };
    }>({
        month: undefined,
        order: undefined,
        period: { from: "", to: "" },
    });

    const handleSelectChange = (e: SelectChangeEvent<string>, field: string) => {
        const value = e.target.value === "Todos" || e.target.value === "" ? undefined : e.target.value;
        setFilters((prev) => ({ ...prev, [field]: value }));
    };

    const applyFilters = () => {
        onApplyFilters(filters);
        onClose();
    };

    return (
        <Drawer anchor="right" open={open} onClose={onClose}>
            <Box
                sx={{
                    width: 300,
                    padding: 3,
                    "& .MuiFormControl-root, & .MuiButton-root, & .MuiTextField-root": {
                        my: 2,
                        minHeight: "56px",
                    },
                }}
            >
                <Typography variant="h6" gutterBottom>
                    Filtros
                </Typography>

                {/* Filtro por Mês */}
                <FormControl fullWidth>
                    <InputLabel id="month-label">Mês</InputLabel>
                    <Select
                        labelId="month-label"
                        value={filters.month ?? "Todos"}
                        onChange={(e) => handleSelectChange(e, "month")}
                    >
                        <MenuItem value="Todos">Todos</MenuItem>
                        <MenuItem value="1">Janeiro</MenuItem>
                        <MenuItem value="2">Fevereiro</MenuItem>
                        <MenuItem value="3">Março</MenuItem>
                        <MenuItem value="4">Abril</MenuItem>
                        <MenuItem value="5">Maio</MenuItem>
                        <MenuItem value="6">Junho</MenuItem>
                        <MenuItem value="7">Julho</MenuItem>
                        <MenuItem value="8">Agosto</MenuItem>
                        <MenuItem value="9">Setembro</MenuItem>
                        <MenuItem value="10">Outubro</MenuItem>
                        <MenuItem value="11">Novembro</MenuItem>
                        <MenuItem value="12">Dezembro</MenuItem>
                    </Select>
                </FormControl>

                <FormControl fullWidth>
                    <InputLabel id="order-label">Ordenar por</InputLabel>
                    <Select
                        labelId="order-label"
                        value={filters.order ?? ""} // Garantir que seja uma string vazia se undefined
                        onChange={(e) => handleSelectChange(e, "order")}
                    >
                        <MenuItem value="">Todos</MenuItem>
                        <MenuItem value="asc">Crescente</MenuItem>
                        <MenuItem value="desc">Decrescente</MenuItem>
                    </Select>
                </FormControl>

                {/* Filtro por Período */}
                <Typography variant="body1" gutterBottom>
                    Data:
                </Typography>
                <Box>
                    <TextField
                        name="from"
                        label="De"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        value={filters.period.from}
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                period: { ...prev.period, from: e.target.value },
                            }))
                        }
                    />
                    <TextField
                        name="to"
                        label="Até"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        fullWidth
                        value={filters.period.to}
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                period: { ...prev.period, to: e.target.value },
                            }))
                        }
                    />
                </Box>

                {/* Divisor e Botão */}
                <Divider sx={{ my: 2 }} />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={applyFilters}
                    startIcon={<FilterAltIcon />}
                    sx={{
                        borderRadius: "8px",
                        textTransform: "none",
                    }}
                >
                    Filtrar
                </Button>
            </Box>
        </Drawer>
    );
};

export default FilterSidebar;
