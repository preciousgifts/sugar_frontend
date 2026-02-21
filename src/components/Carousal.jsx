import { React, useRef, useState } from 'react';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

const Carousel = props => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setMuted(videoRef.current.muted);
    }
  };

  const { cImageData, cVedioData } = props;

  return (
    <div className=''>
      <div
        id='carouselExampleIndicators'
        className='carousel slide carousel-fade'
        data-bs-ride='carousel'
        data-bs-pause='hover'>
        {/* <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div> */}
        <div className='carousel-inner'>
          {cImageData.map((data, index) => (
            <div key={data.id} className={`carousel-item ${index === 0 ? 'active' : ''}`} data-bs-interval='3000'>
              <img src={data.imgUrl} alt={data.alt} className='d-block w-100' />
            </div>
          ))}

          {cVedioData.map(data => (
            <div key={data.id} className='carousel-item video-container position-relative' data-bs-interval='false'>
              <video ref={videoRef} muted={muted} autoPlay playsInline className='d-block w-100 h-100'>
                <source src={data.vedioUrl} type='video/mp4'></source>
              </video>
              <button onClick={toggleMute} className='speaker-btn position-absolute top-50 start-0 translate-middle-y'>
                {muted ? <FaVolumeMute /> : <FaVolumeUp />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
