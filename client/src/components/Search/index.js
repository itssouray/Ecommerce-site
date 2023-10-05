import { useEffect, useState, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { SearchContext } from "../../Context/SearchContext";
import { WishItemsContext } from "../../Context/WishItemsContext";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { CartItemsContext } from "../../Context/CartItemsContext";
import { Link } from "react-router-dom";
import { IconButton } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import "./index.css";

const Search = () => {
  const search = useContext(SearchContext);
  const [searchResults, setSearchResults] = useState([]);
  const [searchParam, setSearchParam] = useSearchParams();
  const cartItemsContext = useContext(CartItemsContext);
  const wishItemsContext = useContext(WishItemsContext);
  const [isHovered, setIsHovered] = useState(false)


  const fetchSearchResultsByName = async (nameQuery) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/search?query=${nameQuery}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleAddToWishList = (result) => {
    wishItemsContext.addItem(result);
  };

  const handleAddToCart = (result) => {
    cartItemsContext.addItem(result, 1);
  };

  useEffect(() => {
    const nameQuery = search.searchQuery;
    setSearchParam(nameQuery ? { query: nameQuery } : {}, { replace: true });

    if (nameQuery) {
      fetchSearchResultsByName(nameQuery);
    }
  }, [search.searchQuery, setSearchParam]);

  return (
    <div className="search__container ">
    
      {searchResults.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className=" search-result-container">
          {searchResults.map((result, index) => {
            return (
              <div className=" result-card" key={index}>
                <div
                  className="product__image"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {isHovered ? (
                    <img
                      src={`https://shema-backend.vercel.app/public/${result.category}/${result.image[1].filename}`}
                      alt="item"
                      className="product__img"
                    />
                  ) : (
                    <img
                      src={`https://shema-backend.vercel.app/public/${result.category}/${result.image[0].filename}`}
                      alt="item"
                      className="product__img"
                    />
                  )}
                </div>
                <div className="product__card__detail">
                  <div className="product__name">
                    <Link to={`/item/${result.category}/${result._id}`}>
                      {result.name}
                    </Link>
                  </div>
                  <div className="product__description">
                    <span>{result.description}</span>
                  </div>
                  <div className="product__price">
                    <span>${result.price}</span>
                  </div>
                  <div className="product__card__action">
                    <IconButton
                      onClick={()=>{handleAddToWishList(result)}}
                      sx={{
                        borderRadius: "20px",
                        width: "40px",
                        height:
                          "40px" /* borderWidth: '3px', borderStyle: 'solid', borderColor: '#FFE26E' */,
                      }}
                    >
                      <FavoriteBorderIcon
                        sx={{ width: "22px", height: "22px", color: "black" }}
                      />
                    </IconButton>
                    <IconButton
                      onClick={()=>{handleAddToCart(result)}}
                      sx={{
                        borderRadius: "20px",
                        width: "40px",
                        height:
                          "40px" /*  borderWidth: '3px', borderStyle: 'solid', borderColor: '#FFE26E' */,
                      }}
                    >
                      <AddShoppingCartIcon
                        sx={{ width: "22px", height: "22px", color: "black" }}
                      />
                    </IconButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Search;
