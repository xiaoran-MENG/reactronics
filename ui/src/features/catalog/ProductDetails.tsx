import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Product } from './../../app/models/product';
import { TableBody, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

const ProductDetails = () => {

  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then(({ data }) => setProduct(data))
      .catch(e => console.log(e))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <h3>Loading...</h3>

  if (!product) return <h3>Not found</h3>

  return <Grid container spacing={6}>
    <Grid item xs={6}>
      <img
        src={product.imageUrl}
        alt='product'
        style={{
          width: '100%'
        }}
      />
    </Grid>
    <Grid item xs={6}>
      <Typography variant='h3'>{product.name}</Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant='h4'>${(product.price / 100).toFixed(2)}</Typography>
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
    </Grid>
  </Grid>
}

export default ProductDetails

