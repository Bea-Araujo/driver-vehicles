import { Box, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { visuallyHidden } from '@mui/utils';
import { TableSortOrder } from "./enhancedTable";

interface EnhancedTableHeaderProps<T> {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof T) => void;
    order: TableSortOrder;
    orderBy: string | number | symbol;
    rowCount: number;
    headCellsDTO: {id: keyof T, label: string}[];
}


export function EnhancedTableHead<T>(props: EnhancedTableHeaderProps<T>) {
    class HeadCell{
        numeric=false
        disablePadding=false
        constructor(public id: keyof T, public label: string){
        }
    }

    const headCells: readonly HeadCell[] = props.headCellsDTO.map(cell => new HeadCell(cell.id, cell.label))
    
    const { order, orderBy, onRequestSort } =
        props;
    
    const createSortHandler =
        (property: keyof T) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        key={`table-head-${String(headCell.id)}`}
                        align='right'
                        padding='normal'
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}