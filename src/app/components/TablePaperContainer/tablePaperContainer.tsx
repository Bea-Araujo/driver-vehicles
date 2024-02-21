import { Box, Button, Paper } from "@mui/material";
import DriversTable from "../Tables/driversTable";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ReactNode } from "react";

interface TablePaperContainerProps {
    areButtonsActive: boolean;
    children: ReactNode;
    handleClickCreate: () => void;
    handleClickEdit: () => void;
    handleClickDelete: () => void;
}
export default function TablePaperContainer({areButtonsActive, handleClickCreate, handleClickEdit, handleClickDelete, children}: TablePaperContainerProps) {
    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Paper sx={{ width: '95%', mb: 2 }}>
                    <Box sx={{ mt: 1, ml: 1, display: "flex", justifyContent: "space-between" }}>
                        <Button
                            variant="contained"
                            sx={{ mr: 1 }}
                            onClick={handleClickCreate}
                            startIcon={<AddIcon />}
                        >
                            Criar
                        </Button>

                        <Box>
                            <Button
                                variant="outlined"
                                sx={{ mr: 1 }}
                                disabled={!areButtonsActive}
                                onClick={handleClickEdit}
                                startIcon={<EditIcon />}
                            >
                                Editar
                            </Button>

                            <Button
                                variant="outlined"
                                color="error"
                                sx={{ mr: 1 }}
                                disabled={!areButtonsActive}
                                onClick={handleClickDelete}
                                startIcon={<DeleteIcon />}
                            >
                                Deletar
                            </Button>
                        </Box>
                    </Box>

                    {children}
                </Paper>
            </Box>
    )
}