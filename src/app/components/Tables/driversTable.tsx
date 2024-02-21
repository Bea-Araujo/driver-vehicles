import EnhancedTable, { MinimumTableProps } from "@/app/components/enhancedTable";
import { useState } from "react";

export class DriverTableRow extends MinimumTableProps{
    id: string
    name: string
    document: string
    vehicleId: string

    constructor(input?: {id: string, name: string, document: string, vehicleId?: string}){
        super(input?.id || '')
        this.id = input?.id || ''
        this.name = input?.name || ''
        this.document = input?.document || ''
        this.vehicleId = input?.vehicleId || ''
    }
}

export default function DriverTable() {
    const headCellsDto: {id: keyof DriverTableRow, label: string}[] = [
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

    const [rows, setRows] = useState<DriverTableRow[]>([])


    return (
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
    )
}