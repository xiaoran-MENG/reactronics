import Menu from './Menu';
import { useEffect, useState } from 'react';
import { Product } from '../../app/models/product';
import axios from 'axios';

const Catalog = () => {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/products")
            .then(({ data }) => setProducts(data))
    }, [])

    return <>
        <Menu products={products} />
    </>
}

export default Catalog
