import styled from 'styled-components';
import { loadFromLocal, saveToLocal } from '../lib/localStorage'
import { useEffect, useState } from 'react'


function ProductCard ({onAddProductCard}) {   

    let products = onAddProductCard
  
    const localStorageFavouriteProducts = loadFromLocal('_favouriteProducts');

  
    const [favouriteProducts, setFavouriteProducts] = useState(
        localStorageFavouriteProducts ?? []
      );

     
      useEffect(() => {
        saveToLocal('_favouriteProducts', favouriteProducts);
      }, [favouriteProducts]);


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
        <ProductCardStyle>
        {products.map((product, index) => (
          <article
            key={index}>
            <h3>{product.name}</h3>
            <p>Special: {product.category}</p>
            <p>Size: {product.packageSize}</p>
            <p>{product.price} €</p>
           
            
            <FavouriteIcon onClick={() => addToFavourites(product)}>
              {isProductInListOfFavourites(product) ? '❤️' : '♡'}
            </FavouriteIcon>
          </article>
        ))}
      </ProductCardStyle>
    )}


export default ProductCard


const ProductCardStyle = styled.div`
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
