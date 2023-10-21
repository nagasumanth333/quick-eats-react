import RestrauntCard from "./RestrauntCard";
import { useEffect, useRef, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import { filterData } from "../utils/helper";
import useOnline from "../utils/useOnline";
import { useSelector } from "react-redux";


const Body = () => {
  const [allRestraunts, setAllRestraunts] = useState([]);
  const [filteredRestraunts, setFilteredRestraunts] = useState([]);
  const[cityTitle,setCityTitle]=useState("");
  const [searchTxt, setSearchTxt] = useState("");
  const {latitude,longitude} =useSelector((store)=>store.coords);
  console.log(latitude,longitude);
  const containerRef = useRef();
  const [visibleRestaurants, setVisibleRestaurants] = useState(6);


  useEffect(() => {
    getRestraunts();
  }, [latitude, longitude]);

  
  async function getRestraunts() {
    const data = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${latitude}&lng=${longitude}`
    );
     
    const json = await data.json();
    
    console.log("data",json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    setCityTitle(json?.data?.cards[2]?.card?.card?.header?.title);
     
    setAllRestraunts(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setFilteredRestraunts(json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        console.log(entries);
        if (entries[0].isIntersecting) {
          setVisibleRestaurants((prevVisible) => prevVisible + 4);
        }

        if (containerRef.current) {
          observer.observe(containerRef.current);
        }
      },
      {
        root: null, // Use the viewport as the root
        rootMargin: "50px",
        threshold: 1.0, // 100% of the target element is visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [filteredRestraunts]);
 
   const isOnline = useOnline();

   if(!isOnline){
    return <h1>Offline , please check your internet connection !!</h1>
   }

  if (!allRestraunts) return <Shimmer/>;
  if (filteredRestraunts?.length === 0) return <Shimmer />;
  return allRestraunts?.length === 0 ? (
    <Shimmer />
  ) : ( 
    <>
      <div className="search-container">
        <div className="search-outline">
          <input
            type="text"
            className="search-input"
            placeholder="Search Restaurants"
            value={searchTxt}
            onChange={(e) => {
              setSearchTxt(e.target.value);
               
            }}
          />
          <button
            className="search-btn"
            onClick={() => {
              const data = filterData(searchTxt, allRestraunts);
               
              setFilteredRestraunts(data);
              
            }}
          >
            <BsSearch />
          </button>
        </div>
      <h1 className="text-2xl font-semibold">{cityTitle}</h1>

      </div>
      
      <div className="restraunt-list">
        {filteredRestraunts.slice(0, visibleRestaurants)?.map((restraunt) => {
          return (
            <Link
              className="restraunt-link"
              to={"/restaurant/" + restraunt.info.id}
              key={restraunt.info.id}
            >
              <div ref={containerRef}>
                <RestrauntCard data={restraunt.info} />
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};
export default Body;
