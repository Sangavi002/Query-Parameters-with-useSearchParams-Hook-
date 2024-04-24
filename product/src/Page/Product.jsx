import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-products?page=${page}&limit=5`);
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [page]);
    
  const handlePageChange = (e) => {
    const selectedPage = parseInt(e.target.value);
    setPage(selectedPage);
    setSearchParams({ page: selectedPage, limit: 5 });
  };

  return (
    <>
        <select onChange={handlePageChange} >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
        </select>
      <div className="box">
        {products.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className='card-link'>
            <div className="card">
              <div className="card-img">
                <img src={product.image} alt={product.category} />
              </div>
              <h4>{product.title}</h4>
              <h5>₹ {product.price}</h5>
              <h5>Brand: {product.brand}</h5>
              <h5>Category: {product.category}</h5>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Product;
