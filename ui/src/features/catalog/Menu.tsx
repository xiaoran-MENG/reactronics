import { Grid } from "@mui/material"
import { Product } from "../../app/models/product"
import ProductCard from "./ProductCard"

interface Props {
    products: Product[]
}

const Menu = ({ products }: Props) => {
    return <Grid container spacing={4}>{products.map(p => 
        <Grid key={p.id} item xs={3}>
            <ProductCard product={p} />
        </Grid>)}
    </Grid>
}

export default Menu
