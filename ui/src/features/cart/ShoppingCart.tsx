import { useState, useEffect } from 'react';
import { Cart } from '../../app/models/cart';
import api from './../../app/api/index';
import Loader from './../../app/layout/Loader';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';

const ShoppingCart = () => {

    const [loading, setLoading] = useState(true)
    const [cart, setCart] = useState<Cart | null>(null);

    useEffect(() => {
        api.cart
            .get()
            .then(setCart)
            .catch(console.log)
            .finally(() => setLoading(false))
    }, [])

    if (loading) return <Loader message='Loading' />

    if (!cart) return <Typography variant='h3'>Your cart is empty</Typography>

    return <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
            <TableHead>
                <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                    <TableCell align="right"></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {cart.items.map(i => (
                    <TableRow
                        key={i.productId}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">{i.name}</TableCell>
                        <TableCell align="right">${(i.price / 100).toFixed(2)}</TableCell>
                        <TableCell align="right">{i.quantity}</TableCell>
                        <TableCell align="right">${((i.price * i.quantity) / 100).toFixed(2)}</TableCell>
                        <TableCell align="right">
                            <IconButton color='error'>
                                <Delete />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </TableContainer>
}

export default ShoppingCart
