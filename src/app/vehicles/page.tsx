'use client'
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import EnhancedTable, { Rows } from "../../../components/enhancedTable";
import { Box, Button, Modal, TextField } from "@mui/material";
import { fetchDrivers, fetchVehicles } from "../../../lib/data";
import { createDriver, deleteDriver, updateDriver } from "../../../lib/actions";


export class VehicleTableRows{
    id: string;
    carPlate: string;
    brand: string;

    constructor(input?: { id: string, carPlate: string, brand: string}){
        this.id = input?.id || ""
        this.carPlate = input?.carPlate || ""
        this.brand = input?.brand || ""
    }
}
export default function Page() {
    const [selectedId, setSelectedId] = useState<string>()

    const areButtonsActive = useMemo(() => {
        return !!selectedId
    }, [selectedId])

    const [rows, setRows] = useState<VehicleTableRows[]>([])

    const [editFormValues, setEditFormValues] = useState<VehicleTableRows>({
        id: "",
        carPlate: "",
        brand: ""
    })

    const updateSelectedVehicleValues = useCallback(() => {
        if (!rows) return
        if (rows.length === 0) return
        setEditFormValues(rows.find(row => row.id === selectedId) || new VehicleTableRows())
    }, [selectedId, rows])

    async function fetchData() {
        const response = await fetchVehicles()
        setRows(response)
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        updateSelectedVehicleValues()
    }, [selectedId, updateSelectedVehicleValues])

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


    const [isOpen, setIsOpen] = useState(false)
    function toggleModal() {
        setIsOpen((prev) => !prev)
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

            {/* <EnhancedTable
                rows={rows}
                selected={selectedId}
                setSelected={setSelectedId}
            /> */}
            <Button onClick={toggleModal}>Criar</Button>
            <Button disabled={!areButtonsActive}>Editar</Button>
            <Button disabled={!areButtonsActive} onClick={handleDriverDeletion}>Deletar</Button>

            <Modal
                open={isOpen}
                onClose={toggleModal}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <p>
                    this is a model
                </p>
            </Modal>
            <Box sx={{ width: 400 }}>
                <h2 id="parent-modal-title">Criar um motorista</h2>
                <form action={createDriver}>
                    <TextField id="outlined-basic" label="Placa" variant="outlined" name="carPlate" />
                    <TextField id="outlined-basic" label="Marca" variant="outlined" name="brand" />
                    <Button type="submit">Send</Button>
                </form>

            </Box>

            <Box sx={{ width: 400 }}>
                <h2 id="parent-modal-title">Editar um motorista</h2>
                <form action={(formData) => updateDriver(formData, editFormValues.id)}>
                    <TextField
                        id="outlined-basic"
                        label="Placa"
                        variant="outlined"
                        name="carPlate"
                        value={editFormValues?.carPlate}
                        onChange={handleEditFormChange}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Marca"
                        variant="outlined"
                        name="brand"
                        value={editFormValues?.brand} 
                        onChange={handleEditFormChange}
                        />
                </form>

            </Box>

        </main>
    )
}