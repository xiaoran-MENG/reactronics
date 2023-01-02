import { LoadingButton } from "@mui/lab";
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Avatar, CardHeader } from "@mui/material"
import { useState } from "react"
import { Link } from "react-router-dom"
import { useReactronicsContext } from "../../app/context/ReactronicsContext";
import { Product } from "../../app/models/product"
import api from './../../app/api/index';

interface Props {
    product: Product
}

const ProductCard = ({ product }: Props) => {

    const { setCart } = useReactronicsContext();

    const [loading, setLoading] = useState(false)

    const onBuy = (id: number) => {
        setLoading(true)
        api.cart
            .add(id)
            .then(setCart)
            .catch(console.log)
            .finally(() => setLoading(false))
    }

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
            <LoadingButton
                onClick={() => onBuy(product.id)}
                loading={loading}
                size="small"
            >Buy</LoadingButton>
            <Button 
                component={Link}
                to={`/catalog/${product.id}`}
                size="small"
            >View</Button>
        </CardActions>
    </Card>
}

export default ProductCard
