import logoLight from "../../assets/light-logo-with-text.svg";
import logoDark from "../../assets/dark-logo-with-text.svg";
import { useState, useEffect } from "react";
import { FiBookmark, FiShoppingCart, FiUser } from "react-icons/fi";
import { HiMenuAlt1 } from "react-icons/hi";
import "./Navbar.scss";
import SideDrawer from "../SideDrawer/SideDrawer";
import { Link } from "react-router-dom";
import { useProduct } from "../../context/product-context";
import { useAuth } from "../../context/AuthProvider";

function Navbar({ homePage }) {
  const [scrollNav, setScrollNav] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const { user } = useAuth();
  const { cart } = useProduct();

  useEffect(() => {
    const showLogoHandler = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", showLogoHandler);

    if (screenWidth >= "1024") {
      setShowLogo(true);
    } else {
      setShowLogo(false);
    }

    const changeNavbarStyle = () => {
      if (window.scrollY > 0) {
        setScrollNav(true);
      } else {
        setScrollNav(false);
      }
    };
    window.addEventListener("scroll", changeNavbarStyle);
    return () => {
      window.removeEventListener("scroll", changeNavbarStyle);
      window.removeEventListener("resize", showLogoHandler);
    };
  }, [screenWidth]);

  let navbarBg = null;
  let navbarBorder = null;
  if (homePage) {
    navbarBg = "transparent";
    navbarBorder = "none";
  }
  if (homePage && scrollNav) {
    navbarBg = "#101010";
    navbarBorder = "1px solid #1b1b1b";
  }

  return (
    <nav
      style={{
        backgroundColor: navbarBg,
        borderBottom: navbarBorder
      }}
      className={
        homePage
          ? "navbar navbar-home"
          : scrollNav
          ? "navbar navbar-active"
          : "navbar"
      }
    >
      {showSideDrawer && <SideDrawer setShowSideDrawer={setShowSideDrawer} />}
      {showLogo ? (
        <Link to="/">
          <img
            className="logo"
            src={homePage ? logoDark : logoLight}
            alt="logo"
          />
        </Link>
      ) : homePage ? (
        <Link to="/">
          <img
            className="logo"
            src={homePage ? logoDark : logoLight}
            alt="logo"
          />
        </Link>
      ) : (
        <HiMenuAlt1
          onClick={() => setShowSideDrawer(true)}
          style={{ color: homePage && "#f7f7f7" }}
          className="menu-icon"
        ></HiMenuAlt1>
      )}

      <div className="nav-items">
        <Link
          to="/wishlist"
          style={{ color: homePage && "#f7f7f7" }}
          className="wishlist-icon"
        >
          <FiBookmark
            className={homePage ? "home-nav-icons" : "nav-icons"}
          ></FiBookmark>
        </Link>
        <Link
          to="/cart"
          style={{ color: homePage && "#f7f7f7" }}
          className="cart-icon"
        >
          {cart.length > 0 && (
            <span className="cart-item-count">{cart.length}</span>
          )}
          <FiShoppingCart
            className={homePage ? "home-nav-icons" : "nav-icons"}
          ></FiShoppingCart>
        </Link>
        <Link
          to={!user ? "/login" : "/profile"}
          style={{ color: homePage && "#f7f7f7" }}
          className="user-icon"
        >
          <FiUser
            className={homePage ? "home-nav-icons" : "nav-icons"}
          ></FiUser>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
