import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../context/UserContext";

function LoggedOption() {
  const { userData, setUserData } = useContext(UserContext);
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem("auth-token", "");
  };
  return (
    <div>
      {userData.user === undefined ? (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <NavLink className="nav-link" to="/sign-in">
              SIGN IN
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/sign-up">
              SIGN UP
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul className="navbar-nav ml-auto ">
          <li className="nav-item ">
            <div className="nav-link nav-sign-out">
              <button className="btn nav-link" onClick={logout}>
                SIGN OUT
              </button>
              <img src="/img/logout_512.svg" alt="logout" />
            </div>
          </li>
        </ul>
      )}
    </div>
  );
}

export default LoggedOption;
