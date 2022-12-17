import './styles.css'
import { useEffect, useState } from 'react';
import { Product } from '../models/product';

const App = () => {

  const [products, setProducts] = useState<Product[] | null>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  if (!products) return <>
    <h1>Loading...</h1>
  </>

  return <>
    <h1>App</h1>
    <ul>{products.map((p, i) => <li key={i}>{p.name}</li>)}</ul>
  </>
}

export default App
