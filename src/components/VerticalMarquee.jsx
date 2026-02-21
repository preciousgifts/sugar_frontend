import { useState, useEffect } from 'react';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import '../VerticalMarquee.css';
import { MarqueeData } from '../apiData/NavBarData';

export default function VerticalMarquee() {
  const items = MarqueeData;

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(prev => (prev + 1) % items.length);
    }, 3000); // change every 3s
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className='marquee-container'>
      <p key={index} className='marquee-text d-flex align-items-center justify-content-around'>
        <IoIosArrowBack />
        {items[index].text}
        <IoIosArrowForward />
      </p>
    </div>
  );
}
