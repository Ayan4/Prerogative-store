import "./Login.scss";
import Navbar from "../../Components/Navbar/Navbar";
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import loadingAnimation from "../../assets/loader.svg";
import logo from "../../assets/prerogative-logo.svg";
import logoText from "../../assets/dark-logo-with-text.svg";
import { CgDanger } from "react-icons/cg";
import { useForm } from "react-hook-form";

function Login() {
  const { loginWithCreds } = useAuth();
  const [loading, setLoading] = useState(false);
  const [authFaliureMessage, setAuthFaliureMessage] = useState(null);
  const [userNotFoundMessage, setUserNotFoundMessage] = useState(null);
  const [isDisable, setIsDisable] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { state } = useLocation();

  const guestLogin = () => {
    return loginWithCreds("guestemail@gmail.com", "password");
  };

  const userLogin = (email, password) => {
    return loginWithCreds(email, password);
  };

  const loginHandler = async (data, e) => {
    const guest = e.target.className;
    setLoading(true);
    setIsDisable(true);

    let response;

    if (guest === "guest-btn-wrapper") {
      response = await guestLogin();
    } else {
      response = await userLogin(data.email, data.password);
    }

    responseHandler(response);
  };

  const responseHandler = response => {
    if (response?.status === 200) {
      setUserNotFoundMessage(null);
      setAuthFaliureMessage(null);
      setLoading(false);
      navigate(state?.from ? state.from : "/profile", { replace: true });
    } else {
      setUserNotFoundMessage(null);
      setAuthFaliureMessage(response.data.message);
      setLoading(false);
    }

    return response;
  };

  const signUpHandler = () => {
    navigate("/signup");
  };

  return (
    <div>
      <Navbar />
      <div className="login-page">
        <div className="login-page-left">
          <h1>Hello, Welcome Back!</h1>
          <div className="login-form-wrapper">
            <p className="login-heading">
              <span>Login</span> To Your Account
            </p>
            <form
              onSubmit={handleSubmit(loginHandler)}
              className="login-form"
              action=""
            >
              <input
                className="login-input-field"
                placeholder="Email"
                type="email"
                {...register("email")}
                required
                autoComplete="off"
                disabled={isDisable}
              />

              <input
                className="login-input-field"
                placeholder="Password"
                type="password"
                {...register("password")}
                required
                disabled={isDisable}
              />
              {authFaliureMessage ? (
                <div className="warning-modal">
                  <CgDanger className="warning-icon" />
                  <p>{authFaliureMessage}</p>
                </div>
              ) : userNotFoundMessage ? (
                <div className="warning-modal">
                  <CgDanger className="warning-icon" />
                  <p>{userNotFoundMessage}</p>
                </div>
              ) : null}

              <div className="login-btn-wrapper">
                {loading && <img src={loadingAnimation} alt="" />}
                <input
                  className="login-btn"
                  value={!loading ? "Login" : ""}
                  type="submit"
                  disabled={isDisable}
                />
              </div>
            </form>
            <button
              onClick={e => loginHandler(null, e)}
              className="guest-btn-wrapper"
              disabled={isDisable}
            >
              Or login as a Guest
            </button>
            <p className="signup-text">
              Don't Have An Account Yet ?{" "}
              <span className="signup-btn" onClick={signUpHandler}>
                Sign Up
              </span>
            </p>
          </div>
        </div>

        <div className="login-page-right">
          <div className="login-backdrop"></div>
          <img className="login-logo" src={logo} alt="" />
          <img className="login-logo-text" src={logoText} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;
