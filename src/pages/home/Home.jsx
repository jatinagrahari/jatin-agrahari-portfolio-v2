import { Hero } from "./Hero";
import { About } from "../../components";
import Work from "./Work";
import NowBuilding from "./NowBuilding";
import LetsWork from "./LetsWork";
import TechStack from "./TechStack";

const Home = () => {
  return (
    <>
      {/* hero section */}

      <Hero />

      {/* about me section */}
      <About />

      {/* work section */}
      <Work />

      {/* now building section */}
      <NowBuilding />

      {/* tech stack */}
      <TechStack />

      {/* lets work section */}
      <LetsWork />
    </>
  );
};

export default Home;
