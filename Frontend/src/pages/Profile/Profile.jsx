import "./Profile.scss";
import Navbar from "../../Components/Navbar/Navbar";
import logo from "../../assets/prerogative-logo.svg";
import avatar from "../../assets/icons/avatar.png";
import logoText from "../../assets/dark-logo-with-text.svg";
import { useAuth } from "../../context/AuthProvider";

function Profile() {
  const { logout, user } = useAuth();

  return (
    <div>
      <Navbar />
      <div className="profile-page">
        <div className="profile-page-left">
          <img src={avatar} className="avatar-pic" alt="" />
          <h1>
            Hello <span>{user.name}</span>
          </h1>
          {user && (
            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          )}
        </div>

        <div className="profile-page-right">
          <div className="profile-backdrop"></div>
          <img className="profile-logo" src={logo} alt="" />
          <img className="profile-logo-text" src={logoText} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Profile;
