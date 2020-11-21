import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { useStateValue } from "../cotexApi/StateProvider";
import { useHistory } from "react-router-dom";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HomeIcon from "@material-ui/icons/Home";
import Avatar from "@material-ui/core/Avatar";
function NavBar() {
  const history = useHistory();
  const [{ user }, dispatch] = useStateValue();
  // console.log("navbar", user);

  // useEffect(() => {
  //     setUser(JSON.parse(localStorage.getItem("user")))
  // }, [user])

  const handelLogout = () => {
    localStorage.clear();
    dispatch({
      type: "CLEAR",
    });
    history.push("/signin");
  };

  return (
    <div>
      <nav>
        <div className="navbar">
          <div className="navbar_log">
            <Avatar alt="Remy Sharp" src={user ? user.pic : ""} />
            <h4> {user ? user.name : ""}</h4>
          </div>

          <div className="navbar_items"></div>
          <div className="navbar_link">
            {user ? (
              <>
                {user.role === 1 ? (
                  <>
                    <Link key="2a" to="/profile">
                      My Shop
                    </Link>
                    <Link key="3a" to="/createpost">
                      Add Item
                    </Link>
                  </>
                ) : (
                  <></>
                )}
                <Link key="1a" to="/">
                  <HomeIcon fontSize="small" />
                  FindItem
                </Link>
                <Link key="4a" to="/addtobasket">
                  <ShoppingCartIcon />
                </Link>
              </>
            ) : (
              <>
                <Link key="5a" to="/signin">
                  Login
                </Link>
                <Link key="6a" to="/register">
                  Register
                </Link>
              </>
            )}
          </div>
          {user && (
            <div className="logout">
              <PowerSettingsNewIcon onClick={handelLogout} />
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
