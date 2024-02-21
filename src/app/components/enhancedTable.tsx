import { ReactNode } from 'react';
import { EnhancedTableHead } from './enhancedTableHead';
import { Box, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@mui/material';
import { TableSortOrder } from '../../../lib/tableSortingUtils';

interface EnhancedTableProps<T> {
    rows: T[],
    selected?: string,
    headCellsDto: { id: keyof T, label: string }[],
    setSelected: React.Dispatch<React.SetStateAction<string | undefined>>,
    order: TableSortOrder,
    setOrder: React.Dispatch<React.SetStateAction<TableSortOrder>>,
    orderBy: keyof T,
    setOrderBy: React.Dispatch<React.SetStateAction<keyof T>>,
    page: number,
    setPage: React.Dispatch<React.SetStateAction<number>>,
    rowsPerPage: number,
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>,

    children?: ReactNode
}

export class MinimumTableProps {
    [key: string]: string

    constructor(public id: string) { }
}

export default function EnhancedTable<T extends MinimumTableProps>({
    rows,
    headCellsDto,
    selected,
    setSelected,
    order,
    setOrder,
    orderBy,
    setOrderBy,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    children
}: EnhancedTableProps<T>) {

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof T,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value));
        setPage(0);
    };

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box>
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
                        {children}
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
                id={`enhanced-table-pagination-input`}
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Box>
    );
}