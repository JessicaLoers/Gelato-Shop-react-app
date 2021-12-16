import { Link } from 'react-router-dom'

import { useEffect, useState } from 'react'
import styled from 'styled-components';
import { loadFromLocal, saveToLocal } from './lib/localStorage'
import ProductForm from './components/ProductForm'
import ProductCard from './components/ProductCard'

function App() {
  const localStorageProducts = loadFromLocal('_products');
  const [products, setProducts] = useState(localStorageProducts ?? []);

  useEffect(() => {
    saveToLocal('_products', products);
  }, [products]);

  const addProduct = (product) => {
    return setProducts([...products, product]);
   
  };
  const addProductCard = (products) => {
    return setProducts([...products, products]);
  }

  return (
    <Container>
      <ProductForm onAddProduct={addProduct} />
      <ProductCard onAddNewCard={addProductCard} />
    </Container>
  );
}

export default App;

const Container = styled.div`
 h2 {
    font-size: 1.6rem;
  }
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 30rem;
  margin: 0 auto;
`;
