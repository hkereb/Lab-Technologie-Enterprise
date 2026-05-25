import { useParams, Link } from 'react-router-dom';

function ProductDetails({ products }) {
  const { id } = useParams();

  const filtered = products.filter(p => p.id === Number(id));

  if (filtered.length === 0) {
    return null;
  }

  const product = filtered[0];

  return (
    <div style={{ textAlign: 'left', padding: '20px' }}>
      <h1>{product.title}</h1>
      <p>
        <strong>Category:</strong> {product.category} <br />
        <strong>Brand:</strong> {product.brand} <br />
        <strong>Description:</strong> {product.description} <br />
        <strong>Price:</strong> ${product.price} <br />
      </p>
      <img 
        src={product.thumbnail} 
        alt={product.title} 
        style={{ maxWidth: '300px', display: 'block', marginBottom: '20px' }} 
      />
      <Link to="/">← Back to product list</Link>
    </div>
  );
}

export default ProductDetails;