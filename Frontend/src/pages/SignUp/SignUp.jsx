import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import Navbar from "../../Components/Navbar/Navbar";
import { CgDanger } from "react-icons/cg";
import { FaCheckCircle } from "react-icons/fa";
import logo from "../../assets/prerogative-logo.svg";
import logoText from "../../assets/dark-logo-with-text.svg";
import loadingAnimation from "../../assets/loader.svg";
import "./SignUp.scss";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function SignUp() {
  const { signUpWithCreds } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [validationMsg, setValidationMsg] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const loginHandler = () => {
    navigate("/login");
  };

  const signUpFormHandler = async data => {
    setLoading(true);
    const response = await signUpWithCreds(
      data.name,
      data.email,
      data.password
    );
    if (response.status === 201) {
      setValidationMsg(response.data.message);
      setLoading(false);
      setTimeout(() => {
        navigate("/products");
      }, 2000);
    } else if (response.status === 200) {
      setErrorMsg(response.data.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="signup-page">
        <div className="signup-page-left">
          <h1>Hello, Welcome!</h1>
          <div className="signup-form-wrapper">
            <p className="signup-heading">
              <span>Create</span> An Account
            </p>
            <form
              onSubmit={handleSubmit(signUpFormHandler)}
              className="signup-form"
            >
              <input
                className="signup-input-field"
                placeholder="Name"
                type="text"
                {...register("name")}
                required
              />

              <input
                className="signup-input-field"
                placeholder="Email"
                type="email"
                {...register("email")}
                required
              />

              <input
                className="signup-input-field signup-password-input"
                placeholder="Password"
                type="password"
                {...register("password", { minLength: 6 })}
                required
              />
              <p className="password-validation-msg">Atleast 6 characters</p>

              {validationMsg ? (
                <div className="warning-modal warning-modal-success">
                  <FaCheckCircle className="warning-icon warning-icon-success" />
                  <p className="msg-success"> {validationMsg} </p>
                </div>
              ) : errorMsg ? (
                <div className="warning-modal">
                  <CgDanger className="warning-icon" />
                  <p>{errorMsg}</p>
                </div>
              ) : null}

              <div className="signup-btn-wrapper">
                {loading && <img src={loadingAnimation} alt="" />}
                <input
                  className="signup-btn"
                  value={loading ? "" : "Sign Up"}
                  type="submit"
                />
              </div>
            </form>
            <p className="login-text">
              Already Have An Account ?{" "}
              <span className="signup-btn" onClick={loginHandler}>
                Login Here
              </span>
            </p>
          </div>
        </div>

        <div className="signup-page-right">
          <div className="signup-backdrop"></div>
          <img className="signup-logo" src={logo} alt="" />
          <img className="signup-logo-text" src={logoText} alt="" />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
