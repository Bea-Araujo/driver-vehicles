import EnhancedTable, { MinimumTableProps } from "@/app/components/enhancedTable";
import { useMemo, useState } from "react";
import { TableSortOrder, TableSortingUtils } from "../../../../lib/tableSortingUtils";
import { Checkbox, CircularProgress, TableCell, TableRow } from "@mui/material";

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

interface DriverTableProps {
    rows: DriverTableRow[],
    selectedId?: string,
    setSelectedId: React.Dispatch<React.SetStateAction<string | undefined>>,
    error?: {status: boolean, message: string}
}

export default function DriversTable({ rows, selectedId, setSelectedId, error }: DriverTableProps) {
    const [order, setOrder] = useState<TableSortOrder>('asc');
    const [orderBy, setOrderBy] = useState<keyof DriverTableRow>('id');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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

    const isSelected = (id: string) => selectedId === id;

    const handleSelection = (id: string) => {
        selectedId === id ? setSelectedId('') : setSelectedId(id);
    };

    const visibleRows = useMemo(
        () => TableSortingUtils.createVisibleRows({ rows, order, orderBy, page, rowsPerPage }),
        [rows, order, orderBy, page, rowsPerPage],
    );

    return (
        <EnhancedTable<DriverTableRow>
            rows={rows}
            selected={selectedId}
            setSelected={setSelectedId}
            headCellsDto={headCellsDto}
            order={order}
            setOrder={setOrder}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            error={error}
        >
            {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                    <TableRow
                        hover
                        onClick={() => handleSelection(row.id)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={`drivers-table__row-${row.id}`}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                    >
                        <TableCell padding="checkbox">
                            <Checkbox
                                id={`drivers-table__row-${row.id}__checkbox-input`}
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                    'aria-labelledby': labelId,
                                }}
                            />
                        </TableCell>
                        <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                            align="right"
                        >
                            {row.id}
                        </TableCell>

                        <TableCell align="right">{row.name}</TableCell>
                        <TableCell align="right">{row.document}</TableCell>
                        <TableCell align="right">
                            {row.vehicleId ? 'sim' : 'não'}
                        </TableCell>
                    </TableRow>
                );
            })}
        </EnhancedTable>
    )
}