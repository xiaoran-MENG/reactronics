import { Box, Button, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Add, Delete, Remove } from '@mui/icons-material';
import { useReactronicsContext } from '../../app/context/ReactronicsContext';
import { useState } from 'react';
import api from './../../app/api/index';
import { LoadingButton } from '@mui/lab';
import Summary from './Summary';
import { Link } from 'react-router-dom';

const ShoppingCart = () => {
    const { cart, setCart, remove } = useReactronicsContext();
    const [status, setStatus] = useState({
        key: '',
        loading: false
    })

    const key = {
        ADD: 'add',
        REM: 'remove',
        DEL: 'delete'
    }

    const resetStatus = () => setStatus({
        key: '',
        loading: false
    })

    const onAdd = (id: number) => {
        setStatus({
            loading: true,
            key: key.ADD + id
        })

        api.cart
            .add(id)
            .then(setCart)
            .catch(console.log)
            .finally(resetStatus)
    }

    const onRemove = (id: number) => {
        removal(id, 1, key.REM + id)
    }

    const onDelete = (id: number, quantity: number) => {
        removal(id, quantity, key.DEL + id)
    }

    const removal = (id: number, quantity: number, key: string) => {
        setStatus({
            loading: true,
            key
        })

        api.cart
            .remove(id)
            .then(() => remove(id, quantity))
            .catch(console.log)
            .finally(resetStatus)
    }

    if (!cart) return <Typography variant='h3'>Your cart is empty</Typography>

    return <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell align='center'>Product</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">Subtotal</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cart.items.map(i => (
                        <TableRow
                            key={i.productId}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row" >
                                <Box display='flex' alignItems='center'>
                                    <div style={{ width: '50%' }}>
                                        <img
                                            src={i.imageUrl}
                                            alt={i.name}
                                            style={{
                                                height: 50,
                                                marginRight: 20
                                            }}
                                        />
                                    </div>
                                    <span>{i.name}</span>
                                </Box>
                            </TableCell>
                            <TableCell align="center">${(i.price / 100).toFixed(2)}</TableCell>
                            <TableCell align="center">
                                <LoadingButton
                                    loading={status.loading && status.key === key.REM + i.productId}
                                    onClick={() => onRemove(i.productId)}
                                    color='error'
                                >
                                    <Remove />
                                </LoadingButton>
                                {i.quantity}
                                <LoadingButton
                                    loading={status.loading && status.key === key.ADD + i.productId}
                                    onClick={() => onAdd(i.productId)}
                                    color='error'
                                >
                                    <Add />
                                </LoadingButton>
                            </TableCell>
                            <TableCell align="center">${((i.price * i.quantity) / 100).toFixed(2)}</TableCell>
                            <TableCell align="center">
                                <LoadingButton
                                    loading={status.loading && status.key === key.DEL + i.productId}
                                    onClick={() => onDelete(i.productId, i.quantity)}
                                    color='error'
                                >
                                    <Delete />
                                </LoadingButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Grid container spacing={2} mt={2} display='flex' justifyContent='center'>
            <Grid item xs={3}>
                <Summary />
                <Box display='flex' justifyContent='center' mt={2}>
                    <Button
                        component={Link}
                        to='/checkout'
                        variant='contained'
                        size='large'
                    >
                        Checkout
                    </Button>
                </Box>
            </Grid>
        </Grid>
    </>
}

export default ShoppingCart
