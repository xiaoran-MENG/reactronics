import { Card, CardMedia, CardContent, Typography, CardActions, Button, Avatar, CardHeader } from "@mui/material"
import { Link } from "react-router-dom"
import { Product } from "../../app/models/product"

interface Props {
    product: Product
}

const ProductCard = ({ product }: Props) => {
    return <Card>
        <CardHeader
            avatar={
                <Avatar>
                    {product.name.charAt(0).toUpperCase()}
                </Avatar>
            }
            title={product.name}
            subheader={product.type}
        />
        <CardMedia
            height='125'
            component="img"
            image={product.imageUrl}
            alt="image"
        />
        <CardContent>
            <Typography
                gutterBottom
                variant="h6"
                component="div"
            >
                ${(product.price / 100).toFixed(2)}
            </Typography>
            <Typography variant="body2">
                {product.description}
            </Typography>
        </CardContent>
        <CardActions>
            <Button size="small">Buy</Button>
            <Button 
                component={Link}
                to={`/catalog/${product.id}`}
                size="small"
            >View</Button>
        </CardActions>
    </Card>
}

export default ProductCard
