import React, { Fragment, useEffect, useState } from "react";
import Landing from "../components/Landing/Landing";
import FeaturedItems from "../components/Featured/Items/FetauredItems";
import FeaturedCategories from "../components/Featured/Categories/FeaturedCategories";
import { TabTitle } from "../utils/General";
import ReactLoading from 'react-loading';


const Home = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Define TabTitle within a useEffect with a dependency array to set the title
  useEffect(() => {
    TabTitle("Home");
  }, []);

 
  useEffect(() => {
    fetch("http://localhost:5000/api/items")
      .then((response) => response.json())
      .then((data) => {
        setFeaturedItems(data);
        setIsLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <Fragment>
      {isLoaded === false ? (
        <ReactLoading type="balls" color='#FFE26E'  height={100} width={100} className='container h-100 w-10 justify-self-center align-self-center m-auto'/>
      ) : (
        <>
          <Landing />
          <FeaturedCategories />
          <FeaturedItems items={featuredItems} />
        </>
      )}
    </Fragment>
  );
};

export default Home;
