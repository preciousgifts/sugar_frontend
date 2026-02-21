import React from 'react';
import { FiPlus } from 'react-icons/fi';
import { FaStar, FaRegStar } from 'react-icons/fa';

const renderStars = count => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(i <= count ? <FaStar key={i} /> : <FaRegStar key={i} />);
  }
  return stars;
};

const Item = props => {
  const { pics, discount, label, currentPrice, originalPrice, ratings, numberOfRatings, colors } = props;

  return (
    <div className='itemss d-flex flex-column align-items-center font-1'>
      {/* product image */}
      <img src={pics} alt={label} className='pics img-fluid mb-3' />
      {/* discount badge */}
      {discount && <div className='discount badge'>{discount}</div>}
      {/* product label */}
      <div className='label d-flex mb-2 font-3 text-center'>{label}</div>
      {/* prices */}
      <div className='price d-flex gap-3 mb-2'>
        <div className='current-price text-dark fw-bold'>₦{currentPrice}</div>
        {originalPrice && (
          <div className='original-price text-muted text-decoration-line-through'>₦{originalPrice}</div>
        )}
      </div>
      {/* color options (if any) */}
      {colors && colors.length > 0 && (
        <div className='color-swatches d-flex justify-content-center gap-2 mb-2'>
          {colors.map((c, i) => (
            <span key={i} className='color-dot' style={{ backgroundColor: c }}></span>
          ))}
        </div>
      )}
      {/* ratings */}
      {ratings && <div className='ratings'>{renderStars(Number(ratings))}</div>}
      {numberOfRatings && <div className=''>{numberOfRatings}</div>}
      {/* add button */}
      <div className='add-button'>
        <FiPlus />
      </div>
    </div>
  );
};

export default Item;
