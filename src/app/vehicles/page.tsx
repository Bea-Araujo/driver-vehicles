'use client'
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
import { fetchVehicles } from "../../../lib/data";
import { createDriver, createVehicle, deleteDriver, updateDriver, updateVehicle } from "../../../lib/actions";
import EnhancedTable, { MinimumTableProps } from "../components/enhancedTable";


export class VehicleTableRow extends MinimumTableProps{
    id: string;
    carPlate: string;
    brand: string;

    constructor(input?: { id: string, carPlate: string, brand: string}){
        super(input?.id || "")
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

    const [rows, setRows] = useState<VehicleTableRow[]>([])
    
    const headCellsDto: {id: keyof VehicleTableRow, label: string}[] = [
        {
            id: 'id',
            label: 'ID',
        },
        {
            id: 'carPlate',
            label: 'Placa',
        },
        {
            id: 'brand',
            label: 'Marca',
        }
    ];

    const [editFormValues, setEditFormValues] = useState<VehicleTableRow>({
        id: "",
        carPlate: "",
        brand: ""
    })

    const updateSelectedVehicleValues = useCallback(() => {
        if (!rows) return
        if (rows.length === 0) return
        setEditFormValues(rows.find(row => row.id === selectedId) || new VehicleTableRow())
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

            <EnhancedTable<VehicleTableRow>
                rows={rows}
                selected={selectedId}
                setSelected={setSelectedId}
                headCellsDto={headCellsDto}
            />
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
                <form action={createVehicle}>
                    <TextField id="outlined-basic" label="Placa" variant="outlined" name="carPlate" />
                    <TextField id="outlined-basic" label="Marca" variant="outlined" name="brand" />
                    <Button type="submit">Send</Button>
                </form>

            </Box>

            <Box sx={{ width: 400 }}>
                <h2 id="parent-modal-title">Editar um motorista</h2>
                <form action={(formData) => updateVehicle(formData, editFormValues.id)}>
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
                    <Button type="submit">Send</Button>
                </form>

            </Box>

        </main>
    )
}