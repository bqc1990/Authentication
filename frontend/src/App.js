import { React, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Axios from "axios";
import Navbar from "./component/layout/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./component/layout/Home";
import About from "./component/page/About";
import SignUp from "./component/page/SignUp";
import SignIn from "./component/page/SignIn";
import UserContext from "./context/UserContext";
import UserDetail from "./component/page/UserDetail";
import PrivateRoute from "./component/route/PrivateRoute";
import RestrictRoute from "./component/route/RestrictRoute";
import "./App.css";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkUser = async () => {
      let token = localStorage.getItem("auth-token");
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const isLogged = await Axios.post(
        "http://192.168.1.96:5000/api/user/tokenIsValidate",
        null,
        { headers: { "auth-token": token } }
      );
      console.log(isLogged.data.user);
      if (isLogged.data.validate && isLogged.data.user !== null) {
        //logged in
        setUserData({ token, user: isLogged.data.user });
        console.log("logged in");
      } else {
        console.log("not login");
      }
    };
    checkUser();
  }, []);

  return (
    <div>
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <Navbar />
          <div className="container">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
              <RestrictRoute
                restricted={true}
                path="/sign-in"
                component={SignIn}
              />
              <RestrictRoute
                restricted={true}
                path="/sign-up"
                component={SignUp}
              />
              <PrivateRoute path="/user-detail" component={UserDetail} />
            </Switch>
          </div>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
