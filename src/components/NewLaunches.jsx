import React from 'react';
import ProductCarousel from './ProductCarousel';
import { NewArrivalData } from '../apiData/ProductData';
import { useState } from 'react';
import { useEffect } from 'react';

const NewLaunches = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await NewArrivalData();
      setProducts(data);
    };

    loadProducts();
  }, []);

  // if (products.length === 0) {
  //   return <p className='text-center'>Loading new arrivals...</p>;
  // }

  return (
    <div className=''>
      <h3 className='d-flex justify-content-center mt-5 mb-4 font-1'>NEW LAUNCHES</h3>
      <ProductCarousel data={products} />
      <div className='line'></div>
    </div>
  );
};

export default NewLaunches;
