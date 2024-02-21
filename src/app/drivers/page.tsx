'use client'
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import EnhancedTable from "../components/enhancedTable";
import { Box, Button, Modal, Paper, TableCell, TableRow, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { fetchDrivers } from "../../../lib/data";
import { createDriver, deleteDriver, updateDriver } from "../../../lib/actions";
import { MinimumTableProps } from "../components/enhancedTable";

export class DriverTableRow extends MinimumTableProps {
    id: string
    name: string
    document: string
    vehicleId: string

    constructor(input?: { id: string, name: string, document: string, vehicleId?: string }) {
        super(input?.id || '')
        this.id = input?.id || ''
        this.name = input?.name || ''
        this.document = input?.document || ''
        this.vehicleId = input?.vehicleId || ''
    }
}

export default function Page() {
    const [selectedId, setSelectedId] = useState<string>()

    const areButtonsActive = useMemo(() => {
        return !!selectedId
    }, [selectedId])

    const [rows, setRows] = useState<DriverTableRow[]>([])

    const headCellsDto: { id: keyof DriverTableRow, label: string }[] = [
        {
            id: 'id',
            label: 'ID',
        },
        {
            id: 'name',
            label: 'Nome',
        },
        {
            id: 'document',
            label: 'Documento',
        },
        {
            id: 'vehicleId',
            label: 'Vínculo',
        }
    ];

    const [editFormValues, setEditFormValues] = useState<DriverTableRow>({
        id: "",
        name: "",
        document: "",
        vehicleId: ""
    })

    const updateSelectedDriverValues = useCallback(() => {
        if (rows.length === 0) return
        setEditFormValues(rows.find(row => row.id === selectedId) || new DriverTableRow())
    }, [selectedId, rows])

    const selectedDriverDisplayData = useMemo(() => {
        return {
            id: "1",
            name: "banana pants",
            document: "99999999999",
            vehicleId: "4"
        }
    }, [selectedId])

    async function fetchData() {
        const response = await fetchDrivers()
        setRows(response)
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        updateSelectedDriverValues()
    }, [selectedId, updateSelectedDriverValues])

    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    function toggleEditModal() {
        setIsEditModalOpen((prev) => !prev)
    }

    function toggleCreateModal() {
        setIsCreateModalOpen((prev) => !prev)
    }

    const handleEditFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditFormValues((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleDriverDeletion = () => {
        if (!selectedId) return
        deleteDriver(selectedId)
    }

    function sendDataForCreation(formData: FormData) {
        try {
            console.log('SEND DATA FOR CREATION')
            createDriver(formData)
            toggleCreateModal()
            //TODO: show success alert or success snackbar
        } catch (e) {
            //TODO: show error alert or error snackbar
        }

    }

    //TODO: componentiza modals
    //TODO: componentiza table paper (still have to decide component name)


    return (
        <main>
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Paper sx={{ width: '95%', mb: 2 }}>
                    <Box sx={{ mt: 1, ml: 1, display: "flex", justifyContent: "space-between" }}>
                        <Button
                            variant="contained"
                            sx={{ mr: 1 }}
                            onClick={toggleCreateModal}
                            startIcon={<AddIcon />}
                        >
                            Criar
                        </Button>

                        <Box>
                            <Button
                                variant="outlined"
                                sx={{ mr: 1 }}
                                disabled={!areButtonsActive}
                                onClick={toggleEditModal}
                                startIcon={<EditIcon />}
                            >
                                Editar
                            </Button>

                            <Button
                                variant="outlined"
                                color="error"
                                sx={{ mr: 1 }}
                                disabled={!areButtonsActive}
                                onClick={handleDriverDeletion}
                                startIcon={<DeleteIcon />}
                            >
                                Deletar
                            </Button>
                        </Box>
                    </Box>

                    <EnhancedTable<DriverTableRow>
                        rows={rows}
                        selected={selectedId}
                        setSelected={setSelectedId}
                        headCellsDto={headCellsDto}
                    >
                        <TableRow>
                            <TableCell>
                                asdasdasd
                            </TableCell>
                        </TableRow>
                    </EnhancedTable>
                </Paper>
            </Box>

            <Modal
                open={isCreateModalOpen}
                onClose={toggleCreateModal}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Box sx={{ width: 9 / 10, justifySelf: 'center' }}>
                    <Paper sx={{ p: 2 }}>
                        <h2 id="parent-modal-title">Criar um novo motorista</h2>
                        <form action={sendDataForCreation}>
                            <Box sx={{ width: "100%", display: 'flex', justifyContent: 'space-between', justifySelf: 'center', my: 2 }}>
                                <TextField id="outlined-basic" label="Nome" variant="outlined" name="name" />
                                <TextField id="outlined-basic" label="Documento" variant="outlined" name="document" />
                                <TextField id="outlined-basic" label="Veículo" variant="outlined" name="vehicleId" />
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                <Button onClick={toggleCreateModal}>Cancelar</Button>
                                <Button variant="outlined" type="submit">Criar</Button>
                            </Box>
                        </form>
                    </Paper>

                </Box>
            </Modal>

            <Modal
                open={isEditModalOpen}
                onClose={toggleEditModal}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Box sx={{ width: 9 / 10, justifySelf: 'center' }}>
                    <Paper sx={{ p: 2 }}>
                        <h2 id="parent-modal-title">Editar um motorista</h2>
                        <form action={(formData) => updateDriver(formData, editFormValues.id)}>
                            <Box sx={{ width: "100%", display: 'flex', justifyContent: 'space-between', justifySelf: 'center', my: 2, flexWrap: 'wrap', gap: 1 }}>
                                <TextField
                                    id="outlined-basic"
                                    label="ID do motorista"
                                    variant="outlined"
                                    name="driverId"
                                    value={editFormValues?.id}
                                    disabled
                                />

                                <TextField
                                    id="outlined-basic"
                                    label="Nome"
                                    variant="outlined"
                                    name="name"
                                    value={editFormValues?.name}
                                    onChange={handleEditFormChange}
                                />
                                <TextField
                                    id="outlined-basic"
                                    label="Documento"
                                    variant="outlined"
                                    name="document"
                                    value={editFormValues?.document}
                                    onChange={handleEditFormChange}
                                />

                                <TextField
                                    id="outlined-basic"
                                    label="Veículo"
                                    variant="outlined"
                                    name="vehicleId"
                                    value={editFormValues?.vehicleId}
                                    onChange={handleEditFormChange}
                                />
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                                <Button onClick={toggleCreateModal}>Cancelar</Button>
                                <Button variant="outlined" type="submit">Salvar</Button>
                            </Box>
                        </form>
                    </Paper>
                </Box>
            </Modal>


        </main>
    )
}