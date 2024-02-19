'use client'
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { useEffect, useMemo, useRef, useState } from "react";
import { getDriversData } from "../../../lib/fetchDrivers";

export default function Page() {
    const tableRef = useRef(null)
    
    async function fetchData() {
        const response = await getDriversData()
        setRows(response)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 150},
        { field: 'name', headerName: 'Nome', width: 150},
        { field: 'document', headerName: 'Documento', width: 150},
        {
            field: 'hasVehicle',
            headerName: 'Vínculo',
            description: 'Motorista tem vínculo com um veículo',
            valueGetter: (params: GridValueGetterParams) => params.value? "Sim" : "Não",
            width: 150
        },
      ];
      
      const [rows, setRows] = useState([])

    return (
        <main>
            <DataGrid
                ref={tableRef}
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                    paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            />
        </main>
    )
}