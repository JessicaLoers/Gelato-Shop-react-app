import { Link } from 'react-router-dom'

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { loadFromLocal, saveToLocal } from './lib/localStorage';
import ProductForm from './components/ProductForm';
import ProductCard from './components/ProductCard';

function App() {
  
  const localStorageProducts = loadFromLocal('_products');
  const [products, setProducts] = useState(localStorageProducts ?? []);


  useEffect(() => {
    saveToLocal('_products', products);
  }, [products]);

  // funktion um den setProducts als Prop runterzureichen. 
  //Wenn es nur als setPrdouct runtergereicht wird, kann es zu Differenzen im useState kommen
  const addProduct = (product) => setProducts([...products, product]);

  return (
    <Container>
      <ProductForm onAddProduct={addProduct} />
      <ProductCard
      onAddProductCard={products}
      />
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

