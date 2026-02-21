import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Item from './Item';
import { ProductCarouselResponsive } from '../apiData/ProductData';

const ProductCarousel = props => {
  const ComponentData = props.data;
  const products = ComponentData.map(item => (
    <Item
      key={item._id}
      pics={item.imageUrl}
      label={item.name}
      discount={item.discount}
      currentPrice={item.currentPrice}
      originalPrice={item.originalPrice}
      ratings={item.ratings}
      colors={item.colors}
    />
  ));

  return (
    <div>
      <Carousel responsive={ProductCarouselResponsive} className='d-flex justify-content-around'>
        {products}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
