import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ProductProvider } from "./context/productProvider";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import ScrollToTop from "./Components/Utils/ScrollToTop";

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
