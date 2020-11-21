import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../../context/UserContext";

const RestrictRoute = ({ component: Component, restricted, ...rest }) => {
  const { userData } = useContext(UserContext);
  return (
    // restricted = false meaning public route
    // restricted = true meaning restricted route
    <Route
      {...rest}
      render={(props) =>
        userData.user && restricted ? (
          <Redirect to="/user-detail" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default RestrictRoute;
