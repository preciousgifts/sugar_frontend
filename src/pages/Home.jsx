import { Link } from 'react-router-dom';
import { NavBarCarouselImageData, NavBarCarouselVedioData } from '../apiData/NavBarData';
import BestSeller from '../components/BestSeller';
import Carousal from '../components/Carousal';
import NavBar from '../components/NavBar';
import NavratiSpecial from '../components/NavratiSpecial';
import NewLaunches from '../components/NewLaunches';

const Home = () => {
  return (
    <div>
      <NavBar />
      <Carousal cImageData={NavBarCarouselImageData} cVedioData={NavBarCarouselVedioData} />
      <NewLaunches />
      <NavratiSpecial />
      <BestSeller />
      <Link to='/admin-page'>
        <button className='flex  items-center' style={{ margin: '20px', padding: '10px 20px', fontSize: '16px' }}>
          Go to Admin Page
        </button>
      </Link>
    </div>
  );
};

export default Home;
