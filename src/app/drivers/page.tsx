'use client'

import { createDriver, deleteDriver, updateDriver } from "../../../lib/actions";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, Modal, Paper, Snackbar, TextField } from "@mui/material";
import { MinimumTableProps } from "../components/enhancedTable";
import { fetchDrivers } from "../../../lib/data";
import DriversTable from "../components/Tables/driversTable";
import TablePaperContainer from "../components/TablePaperContainer/tablePaperContainer";
import ModalContainer from "../components/ModalContainer/ModalContainer";

import { SnackbarProvider, VariantType, useSnackbar } from 'notistack';

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
    const { enqueueSnackbar } = useSnackbar();
    const [selectedId, setSelectedId] = useState<string>()

    const [rows, setRows] = useState<DriverTableRow[]>([])

    const [editFormValues, setEditFormValues] = useState<DriverTableRow>({
        id: "",
        name: "",
        document: "",
        vehicleId: ""
    })

    const [error, setError] = useState({status: false, message: ''})

    const areButtonsActive = useMemo(() => {
        return !!selectedId
    }, [selectedId])

    const selectedDriverDisplayData = useMemo(() => {
        return {
            id: "1",
            name: "banana pants",
            document: "99999999999",
            vehicleId: "4"
        }
    }, [selectedId])

    const updateSelectedDriverValues = useCallback(() => {
        if (rows.length === 0) return
        setEditFormValues(rows.find(row => row.id === selectedId) || new DriverTableRow())
    }, [selectedId, rows])

    async function fetchData() {
        try {
            const response = await fetchDrivers()
            if (!response) throw new Error("Erro ao carregar dados")
            setRows(response)
        } catch (e){
            const error: Error = e as Error;
            setError({status: true, message: error.message})
            enqueueSnackbar(error.message, { variant: "error" })
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        updateSelectedDriverValues()
    }, [selectedId, updateSelectedDriverValues])

    const handleEditFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditFormValues((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    function handleSubmitCreateForm(formData: FormData) {
        try {
            createDriver(formData)
            fetchData()
            toggleCreateModal()
            //TODO: show success alert or success snackbar
            enqueueSnackbar("Motorista criado com sucesso!", { variant: "success" })
        } catch (e) {
            //TODO: show error alert or error snackbar
            enqueueSnackbar("Erro ao criar motorista", { variant: "error" })
        }

    }

    function handleSubmitEditForm(formData: FormData) {
        try {
            updateDriver(formData, editFormValues.id)
            fetchData()
            toggleEditModal()
            //TODO: show success alert or success snackbar
            enqueueSnackbar("Motorista atualizar com sucesso!", { variant: "success" })
        } catch (e) {
            //TODO: show error alert or error snackbar
            enqueueSnackbar("Erro ao atualizar motorista", { variant: "error" })

        }
    }

    const handleDriverDeletion = async () => {
        try {
            if (!selectedId) return
            await deleteDriver(selectedId)
            await fetchData()
            //TODO: show success alert or success snackbar
            enqueueSnackbar("Motorista deletado com sucesso!", { variant: "success" })
        } catch (error) {
            //TODO: show error alert or error snackbar
            enqueueSnackbar("Erro ao deletar motorista", { variant: "error" })
        }
    }

    const [isEditModalOpen, setIsEditModalOpen] = useState(false)
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    function toggleEditModal() {
        setIsEditModalOpen((prev) => !prev)
    }

    function toggleCreateModal() {
        setIsCreateModalOpen((prev) => !prev)
    }

    return (
        <main>
            <TablePaperContainer
                areButtonsActive={areButtonsActive}
                handleClickCreate={toggleCreateModal}
                handleClickEdit={toggleEditModal}
                handleClickDelete={handleDriverDeletion}
            >
                <DriversTable
                    rows={rows}
                    selectedId={selectedId}
                    setSelectedId={setSelectedId}
                    error={error}
                />
            </TablePaperContainer>

            <ModalContainer
                isOpen={isCreateModalOpen}
                onClose={toggleCreateModal}
                title="Criar um motorista"
            >
                <form action={handleSubmitCreateForm}>
                    <Box sx={{ width: "100%", display: 'flex', flexWrap: "wrap", justifyContent: 'space-between', justifySelf: 'center', my: 2, gap: 1 }}>
                        <TextField id="create-driver-form__name" label="Nome" variant="outlined" name="name" />
                        <TextField id="create-driver-form__document" label="Documento" variant="outlined" name="document" />
                        <TextField id="outlined-basic" label="Veículo" variant="outlined" name="vehicleId" />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                        <Button onClick={toggleCreateModal}>Cancelar</Button>
                        <Button variant="outlined" type="submit">Criar</Button>
                    </Box>
                </form>
            </ModalContainer>

            <ModalContainer
                isOpen={isEditModalOpen}
                onClose={toggleEditModal}
                title="Editar um motorista"
            >
                <form action={handleSubmitEditForm}>
                    <Box sx={{ width: "100%", display: 'flex', justifyContent: 'space-between', justifySelf: 'center', my: 2, flexWrap: 'wrap', gap: 1 }}>
                        <TextField
                            id="edit-driver-form__id"
                            label="ID do motorista"
                            variant="outlined"
                            name="driverId"
                            value={editFormValues?.id}
                            disabled
                        />

                        <TextField
                            id="edit-driver-form__name"
                            label="Nome"
                            variant="outlined"
                            name="name"
                            value={editFormValues?.name}
                            onChange={handleEditFormChange}
                        />
                        <TextField
                            id="edit-driver-form__document"
                            label="Documento"
                            variant="outlined"
                            name="document"
                            value={editFormValues?.document}
                            onChange={handleEditFormChange}
                        />

                        <TextField
                            id="edit-driver-form__vehicle-id"
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

            </ModalContainer>

        </main>
    )
}