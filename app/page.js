import { Hero } from "../components/Hero";
import HomePackages from "../components/HomePackages";
import InfoBoxes from "../components/InfoBoxes";
import FeelIMG from '../components/PackageHeaderImage';


const Home = ()=> {

  return (
   <>
   <Hero/>
   <div className="pr-[10rem] pl-[10rem] mt-10 mb-14">
   <FeelIMG/>
   </div>
   <InfoBoxes/>
   <HomePackages/>
   </>
  );
}

export default Home