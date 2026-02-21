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
    </div>
  );
};

export default Home;
