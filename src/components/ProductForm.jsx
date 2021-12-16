import { useState } from 'react';
import styled from 'styled-components';

import { v4 as uuidv4 } from 'uuid';

import TextInput from './TextInput';
import NumberInput from './NumberInput';
import Checkbox from './Checkbox';
import Select from './Select';
import RadioButton from './RadioButton';
import ProductTags from './ProductTags';

import isProductValid from '../lib/validation';

export default function ProductForm({ onAddProduct }) {
  const initialProduct = {
    name: '',
    price: 0,
    isDecorated: false,
    category: '',
    packageSize: '',
    contactEmail: '',
    tags: [],
  };

  const [product, setProduct] = useState(initialProduct);
  const [hasFormErrors, setHasFormErrors] = useState(false);

  const categories = [
    'Amaretto',
    'Extra Sahne',
    'Extra Waffel',
    'Liköre & Spirituosen',
  ];

  const handleChange = (event) => {
    let inputValue = event.target.value; // "Glühwein"

    if (event.target.type === 'checkbox') {
      inputValue = event.target.checked;
    }

    // if (event.target.name === 'price') { parseInt }

    setProduct({
      // alle bestehenden Properties behalten
      // neu zu setzende Property -> deren Wert überschreiben
      ...product,
      [event.target.name]: inputValue,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isProductValid(product)) {
      onAddProduct({ id: uuidv4(), ...product });
      // setProduct(initialProduct);
      setHasFormErrors(false);
    } else {
      setHasFormErrors(true);
    }
  };

  const updateTags = (tag) =>
    setProduct({ ...product, tags: [...product.tags, tag] });

  const deleteTag = (tagToDelete) => {
    const updatedTags = product.tags.filter((tag) => tag !== tagToDelete);
    setProduct({ ...product, tags: updatedTags });
  };

  return (
    <section>
      <h2>Your favorite Gelato 🍨</h2>
      {hasFormErrors && (
        <ErrorMessage>
          <p>
            <strong>Cosa stai facendo? </strong>
            Please check if all fields are correctly filled.
          </p>
        </ErrorMessage>
      )}
      <Form onSubmit={handleSubmit}>
        <TextInput
          onTextInputChange={handleChange}
          name="name"
          value={product.name}
        >
          Product Name
        </TextInput>

        <InputRow>
          <div>
            <NumberInput
              name="price"
              value={product.price}
              onNumberInputChange={handleChange}
            >
              Price (in €)
            </NumberInput>
          </div>

          <Checkbox
            name="isDecorated"
            value={product.isDecorated}
            onCheckboxChange={handleChange}
          >
           1 € to Papa Pino
          </Checkbox>
        </InputRow>

        <Select
          name="category"
          value={product.category}
          options={categories}
          onSelectChange={handleChange}
        >
          Choose your specials
        </Select>

        <RadioButton value={product.packageSize} onRadioChange={handleChange}>
          Gelato Size
        </RadioButton>

        <ProductTags
          headline="Product Tags"
          tags={product.tags}
          onDeleteTag={deleteTag}
          onUpdateTags={updateTags}
        />

        <TextInput
          name="contactEmail"
          value={product.contactEmail}
          onTextInputChange={handleChange}
          placeholder="Add your email …"
        >
          Contact Email
        </TextInput>

        <div>
          <button>Add Product</button>
          {/* Optional */}
          <button
            type="reset"
            onClick={() => {
              setProduct(initialProduct);
              setHasFormErrors(false);
            }}
          >
            Reset
          </button>
        </div>
      </Form>
    </section>
  );
}

const InputRow = styled.div`
  display: flex;
  align-items: center;
`;

const Form = styled.form`
  background: var(--secondary-bg);
  padding: 0.7rem 0.5rem 1.2rem;
  border-radius: 3px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.1);

  label {
    display: block;
    font-weight: bold;
  }
  input,
  select {
    padding: 0.25rem;
    margin: 0.5rem 0 1rem;
  }

  button {
    background: var(--button-bg);
    border: 2px solid var(--button-bg);
    border-radius: 5px;
    color: #446324;
    font-size: 1.2rem;
    font-weight: 600;
    padding: 0.5rem;
    width: 49%;
  }
  button:first-child {
    margin-right: 2%;
  }
  button:nth-child(even) {
    background: transparent;
  }
`;

const ErrorMessage = styled.div`
  align-items: center;
  background: var(--warning);
  border-radius: 3px;
  color: var(--secondary-font);
  display: flex;
  gap: 2.5rem;
  margin: 0 0 1rem;
  padding: 0.5rem;

  div {
    font-size: 2.5rem;
    position: relative;
    transition: all 0.5s;
  }
  div:hover {
    transform: rotateZ(20deg);
  }

  div.bubble {
    font-size: 3rem;

    position: absolute;
    top: -17px;
    right: -38px;
  }
`;