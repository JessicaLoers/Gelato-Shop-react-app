import { Link } from 'react-router-dom'

import { useEffect, useState } from 'react'
import styled from 'styled-components';
import { loadFromLocal, saveToLocal } from './lib/localStorage'
import ProductForm from './components/ProductForm'

function App() {
  const localStorageProducts = loadFromLocal('_products');
  const localStorageFavouriteProducts = loadFromLocal('_favouriteProducts');

  const [products, setProducts] = useState(localStorageProducts ?? []);
  const [favouriteProducts, setFavouriteProducts] = useState(
    localStorageFavouriteProducts ?? []
  );

  useEffect(() => {
    saveToLocal('_products', products);
  }, [products]);

  useEffect(() => {
    saveToLocal('_favouriteProducts', favouriteProducts);
  }, [favouriteProducts]);

  const addProduct = (product) => setProducts([...products, product]);

  function isProductInListOfFavourites(favouriteProductToAdd) {
    return favouriteProducts.some(
      (everyFavouriteProduct) =>
        everyFavouriteProduct.id === favouriteProductToAdd.id
    );
  }

  function removeProductFromListOfFavourites(product) {
    return favouriteProducts.filter(
      (everyFavouriteProduct) => everyFavouriteProduct.id !== product.id
    );
  }

  function addToFavourites(favouriteProductToAdd) {
    // Produkt ist schon auf der Liste der Favourites => Entfernen!
    if (isProductInListOfFavourites(favouriteProductToAdd)) {
      const favouritesToKeep = removeProductFromListOfFavourites(
        favouriteProductToAdd
      );
      setFavouriteProducts(favouritesToKeep);
    } else {
      // Produkt ist noch NICHT auf der Liste der Favourites => Hinzufügen!
      setFavouriteProducts([...favouriteProducts, favouriteProductToAdd]);
    }
  }

  return (
    <Container>
      <ProductForm onAddProduct={addProduct} />
      <ProductCard>
        {products.map((product, index) => (
          <article
            key={index}>
            <h3>{product.name}</h3>
            <p> {product.category} {product.price} €
            </p>
            <FavouriteIcon onClick={() => addToFavourites(product)}>
              {isProductInListOfFavourites(product) ? '❤️' : '♡'}
            </FavouriteIcon>
          </article>
        ))}
      </ProductCard>
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

const ProductCard = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 30rem;
  margin: 2rem auto;
  
  article {
    background: var(--secondary-color);
    color: var(--secondary-font);
    border-radius: 3px;
    padding:1.8rem 1.4rem;
    margin: 5px;
    position: relative;
  }  
`;

const FavouriteIcon = styled.span`
  cursor: pointer;
  font-size: 2rem;
  position: absolute;
  right: 0.5rem;
  bottom: 0.2rem;
`;