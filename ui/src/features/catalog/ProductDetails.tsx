import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { Product } from './../../app/models/product';
import { TableBody, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import api from './../../app/api/index';

const ProductDetails = () => {

  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.catalog.one(parseInt(id))
      .then(x => setProduct(x))
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
      <Typography 
        variant='h2' 
        sx={{ mb: 2 }}
      >
        {product.name}
      </Typography>
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
      <Typography 
        variant='h3' 
        sx={{ mt: 3 }}
      >
        ${(product.price / 100).toFixed(2)}
      </Typography>
    </Grid>
  </Grid>
}

export default ProductDetails

