import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ProductProvider } from "./context/productProvider";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import ScrollToTop from "./Components/Utils/ScrollToTop";
import axios from "axios";

axios.interceptors.request.use(request => {
  const user = JSON.parse(localStorage?.getItem("user"));
  request.headers.Authorization = `Bearer ${user?.token}`;
  return request;
});

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ProductProvider>
          <ScrollToTop />
          <App />
        </ProductProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
