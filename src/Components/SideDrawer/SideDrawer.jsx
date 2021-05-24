import "./SideDrawer.scss";
import Categories from "../Categories/Categories";
import logoLight from "../../assets/light-logo-with-text.svg";
import avatar from "../../assets/icons/avatar.png";
import { VscChromeClose } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

function SideDrawer({ setShowSideDrawer }) {
  const { user } = useAuth();

  return (
    <div className="side-drawer">
      <div onClick={() => setShowSideDrawer(false)} className="backdrop"></div>
      <div className="side-drawer-wrapper">
        <div className="side-drawer-header">
          <Link to="/">
            <img className="logo" src={logoLight} alt="logo" />
          </Link>
          <VscChromeClose
            onClick={() => setShowSideDrawer(false)}
            className="close-icon"
          />
        </div>
        {user && (
          <div className="user-info">
            <img src={avatar} className="avatar-pic" alt="" />
            <div className="user-info-text">
              <h3>Hello, {user.name}</h3>
              <Link className="profile-link" to="/profile">
                <p>View Profile</p>
              </Link>
            </div>
          </div>
        )}
        <Categories />
        {!user && (
          <div className="login-signup-side-drawer">
            <Link className="side-drawer-btns side-drawer-login" to="/login">
              Login
            </Link>
            <Link className="side-drawer-btns side-drawer-signup" to="/signup">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default SideDrawer;
