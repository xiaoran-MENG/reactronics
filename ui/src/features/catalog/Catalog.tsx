import Menu from './Menu';
import { useEffect, useState } from 'react';
import { Product } from '../../app/models/product';
import api from '../../app/api';

const Catalog = () => {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        api.catalog.all().then(setProducts)
    }, [])

    return <Menu products={products} />
}

export default Catalog
