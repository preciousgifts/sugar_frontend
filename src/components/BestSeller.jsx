import React, { useEffect, useState } from 'react';
import ProductCarousel from './ProductCarousel';
import { BestSellersData } from '../apiData/ProductData';

const BestSeller = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await BestSellersData();
      setProducts(data);
    };
    loadProducts();
  }, []);

  return (
    <div className=''>
      <h3 className='d-flex justify-content-center mt-5 mb-4 font-1'>BEST SELLERS</h3>
      <ProductCarousel data={products} />
      <div className='line'></div>
    </div>
  );
};

export default BestSeller;
