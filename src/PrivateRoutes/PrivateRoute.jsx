import { Route, Navigate } from "react-router-dom";

function PrivateRoute({ login, path, ...props }) {
  return (
    <>
      {login ? (
        <Route path={path} {...props} />
      ) : (
        <Navigate state={{ from: path }} replace to="/login" />
      )}
    </>
  );
}

export default PrivateRoute;
