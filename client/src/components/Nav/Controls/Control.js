import "./Control.css";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import Cart from "../../Card/Cart/Cart";
import { useContext, useEffect, useState } from "react";
import { WishItemsContext } from "../../../Context/WishItemsContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase";



const Control = () => {
  const wishItems = useContext(WishItemsContext);
  const [user, setUser] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
       
        setUser(user);
        setProfilePicture(user.photoURL);
      } else {
        
        setUser(null);
        setProfilePicture(null);
      }
    });
  }, [auth]);

  return (
    <div className="control__bar__container">
      <div className="controls__container">
        <div className="control" style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          {user ? (
            <Link to="/account/profile">
              <img
                src={profilePicture}
                alt="Profile"
                className="profile-picture"
                style={{width:'100%',borderRadius:'10px'}}
              />
            </Link>
          ) : (
            <Link to="/account/login">
              <PersonOutlineIcon
                color="black"
                size="large"
                sx={{ width: "35px" }}
              />
            </Link>
          )}
        </div>
        <div className="control">
          <Link to="/wishlist">
            <Badge badgeContent={wishItems.items.length} color="error">
              <FavoriteBorderIcon color="black" sx={{ width: "35px" }} />
            </Badge>
          </Link>
        </div>
        <div className="control">
          <Cart />
        </div>
      </div>
    </div>
  );
};

export default Control;
