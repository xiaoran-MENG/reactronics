import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Product } from './../../app/models/product';
import { TableBody, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import api from './../../app/api/index';
import Loader from '../../app/layout/Loader';
import { useReactronicsContext } from '../../app/context/ReactronicsContext';
import { LoadingButton } from '@mui/lab';

const ProductDetails = () => {

  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [quantity, setQuantity] = useState(0)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const { cart, setCart, remove } = useReactronicsContext()
  const item = cart?.items.find(i => i.productId === product?.id)

  useEffect(() => {
    if (item) setQuantity(item.quantity)

    api.catalog
      .one(parseInt(id))
      .then(setProduct)
      .catch(console.log)
      .finally(() => setLoading(false))
  }, [id, item])

  const onQuantityChange = (e: any) => {
    const n = parseInt(e.target.value)
    if (n < 0) return
    setQuantity(n)
  }

  const onQuantityUpdate = () => {
    setSubmitting(true)

    if (!item || quantity > item.quantity) {
      const n = item ? quantity - item.quantity : quantity
      api.cart
        .add(product?.id!, n)
        .then(setCart)
        .catch(console.log)
        .finally(() => setSubmitting(false))
    } else {
      const n = item.quantity - quantity
      api.cart
        .remove(product?.id!, n)
        .then(() => remove(product?.id!, n))
        .catch(console.log)
        .finally(() => setSubmitting(false))
    }
  }

  const quantityChanged = item ? quantity !== item.quantity : quantity > 0

  if (loading) return <Loader />

  if (!product) return <h3>Not found</h3>

  return <Grid container spacing={6}>
    <Grid item xs={6}>
      <img src={product.imageUrl} alt='product' style={{ width: '100%' }} />
    </Grid>
    <Grid item xs={6}>
      <Typography variant='h2' sx={{ mb: 2 }}>{product.name}</Typography>
      <TableContainer>
        <Table>
          <TableBody>
            {Object.entries(product).map(([k, v]) =>
              ['id', 'price', 'imageUrl'].includes(k)
                ? null
                : <TableRow key={k}>
                  <TableCell sx={{ fontWeight: 'bold' }}>{k.toUpperCase()}</TableCell>
                  <TableCell>{v}</TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant='h3' sx={{ mt: 5, mb: 5 }}>
        ${(product.price / 100).toFixed(2)}
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <TextField
            onChange={onQuantityChange}
            fullWidth
            variant='outlined'
            type='number'
            label='Quantity'
            value={quantity}
          />
        </Grid>
        <Grid item xs={3}>
          <LoadingButton
            loading={submitting}
            onClick={onQuantityUpdate}
            sx={{ height: '55px' }}
            variant='contained'
            fullWidth
            disabled={!quantityChanged}
          >
            {item ? 'Save' : 'Add to Cart'}
          </LoadingButton>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
}

export default ProductDetails

