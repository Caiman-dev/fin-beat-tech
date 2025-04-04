import { useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { DataItem } from '../types/DataItem'
import { Box, TableFooter, TablePagination } from '@mui/material'
import TablePaginationActions from './TablePaginationActions'

type DataProps = {
	Data: DataItem[]
}

const DataTable = ({ Data }: DataProps) => {
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(5)

	const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - Data.length) : 0

	const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => setPage(newPage)

	const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setRowsPerPage(parseInt(event.target.value, 10))
		setPage(0)
	}

	return (<Box mt={2}>
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell><b>Id</b></TableCell>
						<TableCell align="right"><b>Код</b></TableCell>
						<TableCell align="right"><b>Значение</b></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{(rowsPerPage > 0
						? Data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
						: Data
					).map((row) => (
						<TableRow
							key={`${row.id}-${row.code}-${row.value}`}
							sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
						>
							<TableCell component="th" scope="row">{row.id}</TableCell>
							<TableCell align="right">{row.code}</TableCell>
							<TableCell align="right">{row.value}</TableCell>
						</TableRow>
					))}
					{emptyRows > 0 && (
						<TableRow style={{ height: 53 * emptyRows }}>
							<TableCell colSpan={3} />
						</TableRow>
					)}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TablePagination
							rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
							colSpan={3}
							count={Data.length}
							rowsPerPage={rowsPerPage}
							page={page}
							slotProps={{
								select: {
									inputProps: {
										'aria-label': 'rows per page',
									},
									native: true,
								},
							}}
							onPageChange={handleChangePage}
							onRowsPerPageChange={handleChangeRowsPerPage}
							ActionsComponent={TablePaginationActions}
						/>
					</TableRow>
				</TableFooter>
			</Table>
		</TableContainer>
	</Box>
	)
}

export default DataTable