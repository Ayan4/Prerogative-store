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

  const loginHandler = async data => {
    setLoading(true);
    const response = await loginWithCreds(data.email, data.password);
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
  };

  const guestLoginHandler = async () => {
    setLoading(true);
    setIsDisable(true);
    const response = await loginWithCreds(
      "ayanshukla4@gmail.com",
      "killa4zilla"
    );
    if (response?.status === 200) {
      setUserNotFoundMessage(null);
      setAuthFaliureMessage(null);
      setLoading(false);
      setIsDisable(false);
      navigate(state?.from ? state.from : "/profile", { replace: true });
    } else {
      setUserNotFoundMessage(null);
      setAuthFaliureMessage(response.data.message);
      setLoading(false);
      setIsDisable(false);
    }
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
                />
              </div>

              <button onClick={guestLoginHandler} className="guest-btn-wrapper">
                Or login as a Guest
              </button>
            </form>
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
