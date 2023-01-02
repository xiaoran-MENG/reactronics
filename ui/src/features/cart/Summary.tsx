import { useReactronicsContext } from "../../app/context/ReactronicsContext"
import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from '@mui/material';

const Summary = () => {

    const { cart } = useReactronicsContext()

    const subtotal = () => {
        const n = cart?.items.reduce((sum, i) => sum + (i.quantity * i.price), 0) ?? 0
        return (n / 100).toFixed(2)
    }

    return <TableContainer component={Paper} variant={'outlined'}>
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell colSpan={2}>Subtotal</TableCell>
                    <TableCell align='center'>${subtotal()}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
}

export default Summary
