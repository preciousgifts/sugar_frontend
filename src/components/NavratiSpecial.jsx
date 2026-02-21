import React, { useEffect, useState } from 'react';
import ProductCarousel from './ProductCarousel';
import { NavratriSpecialData } from '../apiData/ProductData';
import { Link } from 'react-router-dom';

function NavratiSpecial() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await NavratriSpecialData();
      setProducts(data);
    };
    loadProducts();
  }, []);

  return (
    <div className=''>
      <h3 className='d-flex justify-content-center mt-5 mb-4 font-1'>NAVRATI SPECIAL</h3>
      <ProductCarousel data={products} />
      <div className='d-flex justify-content-center'>
        <button className='navrati-button mt-5 mb-5 font-1'>
          <Link className='navrati-but'>VIEW ALL</Link>
        </button>
      </div>
      <div className='d-flex justify-content-center line'></div>
    </div>
  );
}

export default NavratiSpecial;
