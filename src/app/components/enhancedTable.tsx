import { Children, ReactNode, useMemo, useState } from 'react';
import { EnhancedTableHead } from './enhancedTableHead';
import { Box, Checkbox, Paper, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@mui/material';


function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

export type TableSortOrder = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: TableSortOrder,
    orderBy: Key,
): (
    a: { [key in Key]: number | string; },
    b: { [key in Key]: number | string; },
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T extends Record<string, string | number>>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

interface EnhancedTableProps<T>{
    rows: T[],
    selected?: string,
    headCellsDto: {id: keyof T, label: string}[],
    setSelected:  React.Dispatch<React.SetStateAction<string | undefined>>,
    children?: ReactNode
}

export class MinimumTableProps {
    [key: string]: string

    constructor(public id: string){}
}

export default function EnhancedTable<T extends MinimumTableProps>({rows, headCellsDto, selected, setSelected, children}: EnhancedTableProps<T>) {
    const [order, setOrder] = useState<TableSortOrder>('asc');
    const [orderBy, setOrderBy] = useState<keyof T>('id');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof T,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelection = (id: string) => {
        selected === id ? setSelected(''): setSelected(id);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

    const isSelected = (id: string) => selected === id;

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const visibleRows = useMemo(
        () =>
            stableSort(rows, getComparator(order, orderBy)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ),
        [rows, order, orderBy, page, rowsPerPage],
    );

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Paper sx={{ width: '95%', mb: 2 }}>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750 }}
                        aria-labelledby="tableTitle"
                        size='medium'
                    >
                        <EnhancedTableHead<T>
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                            headCellsDTO={headCellsDto}
                        />
                        <TableBody>
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
                                        
                                        <TableCell align="right">{row.name}</TableCell>
                                        <TableCell align="right">{row.document}</TableCell>
                                        <TableCell align="right">
                                            {row.vehicleId ? 'sim': 'não'}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: 53 * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
           
        </Box>
    );
}