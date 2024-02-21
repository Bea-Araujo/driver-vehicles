import EnhancedTable, { MinimumTableProps } from "@/app/components/enhancedTable";
import { useMemo, useState } from "react";
import { TableSortOrder, TableSortingUtils } from "../../../../lib/tableSortingUtils";
import { Checkbox, TableCell, TableRow } from "@mui/material";
import { Vehicle } from "../../../../lib/redux/slices";


export class VehicleTableRow extends Vehicle {
    [key: string]: string
    constructor(input?: { id: string, carPlate: string, brand: string}){
        super(input?.id || "", input?.carPlate || "", input?.brand || "")
    }
}

interface VehicleTableProps {
    rows: VehicleTableRow[],
    selectedId?: string,
    setSelectedId: React.Dispatch<React.SetStateAction<string | undefined>>
}

export default function VehiclesTable({ rows, selectedId, setSelectedId }: VehicleTableProps) {
    const [order, setOrder] = useState<TableSortOrder>('asc');
    const [orderBy, setOrderBy] = useState<keyof VehicleTableRow>('id');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

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

    const isSelected = (id: string) => selectedId === id;

    const handleSelection = (id: string) => {
        selectedId === id ? setSelectedId('') : setSelectedId(id);
    };

    const visibleRows = useMemo(
        () => TableSortingUtils.createVisibleRows({ rows: [...rows], order, orderBy, page, rowsPerPage }),
        [rows, order, orderBy, page, rowsPerPage],
    );

    console.log(visibleRows)
    console.log(rows)

    return (
        <EnhancedTable<VehicleTableRow>
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
                        key={row.id}
                        selected={isItemSelected}
                        sx={{ cursor: 'pointer' }}
                    >
                        <TableCell padding="checkbox">
                            <Checkbox
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

                        <TableCell align="right">{row.carPlate}</TableCell>
                        <TableCell align="right">{row.brand}</TableCell>
                    </TableRow>
                );
            })}
        </EnhancedTable>
    )
}