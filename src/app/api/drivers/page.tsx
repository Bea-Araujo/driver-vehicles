'use client'
import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useEffect, useRef, useState } from "react";
import { Box, Button, Modal, TextField } from "@mui/material";
import EnhancedTable from "../../../../components/enhancedTable";
import { fetchDrivers } from "../../../../lib/data";
import { createDriver } from "../../../../lib/actions";

export default function Page() {
    const tableRef = useRef(null)

    async function fetchData() {
        const response = await fetchDrivers()
        setRows(response)
    }

    useEffect(() => {
        fetchData()
    }, [])

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

    const [rows, setRows] = useState([])

    const [isOpen, setIsOpen] = useState(false)
    function toggleModal(){
        setIsOpen((prev) => !prev)
    }


    return (
        <main>
            <EnhancedTable
                rows={rows}
            />
            <Button onClick={toggleModal}>Criar</Button>
            <Button>Editar</Button>
            <Button>Deletar</Button>

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
                    <h2 id="parent-modal-title">Text in a modal</h2>
                    <form action={createDriver}>
                        <TextField id="outlined-basic" label="Nome" variant="outlined" name="name"/>
                        <TextField id="outlined-basic" label="Documento" variant="outlined" name="document"/>
                        <TextField id="outlined-basic" label="Veículo" variant="outlined" name="vehicleId"/>
                        <Button type="submit">Send</Button>
                    </form>
                    
                </Box>
                
        </main>
    )
}