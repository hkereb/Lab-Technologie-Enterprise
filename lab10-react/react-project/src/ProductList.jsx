import { useState } from 'react';
import ProductItem from './ProductItem';

function ProductList({ products }) {
  const [filter, setFilter] = useState('');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h1>List of products</h1>
      <div>
        <label htmlFor="search">Filter by product title: </label>
        <input id="search" type="text" value={filter} onChange={handleFilterChange} />
      </div>
      <ul>
        {products
          .filter(p => p.title.toLowerCase().includes(filter.toLowerCase()))
          .map(product => (
            <ProductItem 
              key={product.id} 
              id={product.id} 
              title={product.title} 
              brand={product.brand} 
            />
          ))}
      </ul>
    </div>
  );
}

export default ProductList;