'use client'
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import EnhancedTable, { Rows } from "../../../components/enhancedTable";
import { Box, Button, Modal, TextField } from "@mui/material";
import { fetchDrivers } from "../../../lib/data";
import { createDriver, deleteDriver, updateDriver } from "../../../lib/actions";

export default function Page() {
    const tableRef = useRef(null)
    const [selectedId, setSelectedId] = useState<string>()

    const areButtonsActive = useMemo(() => {
        return !!selectedId
    }, [selectedId])

    const [rows, setRows] = useState<Rows[]>([])

    const [editFormValues, setEditFormValues] = useState<Rows>({
        id: "",
        name: "",
        document: "",
        vehicleId: ""
    })

    const updateSelectedDriverValues = useCallback(() => {
        if (rows.length === 0) return
        setEditFormValues(rows.find(row => row.id === selectedId) || new Rows())
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

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 150 },
        { field: 'name', headerName: 'Nome', width: 150 },
        { field: 'document', headerName: 'Documento', width: 150 },
        {
            field: 'hasVehicle',
            headerName: 'Vínculo',
            description: 'Motorista tem vínculo com um veículo',
            valueGetter: (params: GridValueGetterParams) => params.value ? "Sim" : "Não",
            width: 150
        },
    ];


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


    return (
        <main>

            <EnhancedTable
                rows={rows}
                selected={selectedId}
                setSelected={setSelectedId}
            />
            <Button onClick={toggleCreateModal}>Criar</Button>
            <Button disabled={!areButtonsActive} onClick={toggleEditModal}>Editar</Button>
            <Button disabled={!areButtonsActive} onClick={handleDriverDeletion}>Deletar</Button>

            <Modal
                open={isCreateModalOpen}
                onClose={toggleCreateModal}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ width: 400 }}>
                    <h2 id="parent-modal-title">Criar um motorista</h2>
                    <form action={createDriver}>
                        <TextField id="outlined-basic" label="Nome" variant="outlined" name="name" />
                        <TextField id="outlined-basic" label="Documento" variant="outlined" name="document" />
                        <TextField id="outlined-basic" label="Veículo" variant="outlined" name="vehicleId" />
                        <Button type="submit">Send</Button>
                    </form>

                </Box>
            </Modal>

            <Modal
                open={isEditModalOpen}
                onClose={toggleEditModal}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ width: 400 }}>
                <h2 id="parent-modal-title">Editar um motorista</h2>
                <form action={(formData) => updateDriver(formData, editFormValues.id)}>
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
                    <Button type="submit">Send</Button>
                </form>

            </Box>
            </Modal>


        </main>
    )
}