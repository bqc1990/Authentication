import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./component/layout/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./component/layout/Home";
import About from "./component/About";
import SignUp from "./component/SignUp";
import SignIn from "./component/SignIn";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <div className="container">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about" component={About} />
            <Route path="/sign-in" component={SignIn} />
            <Route path="/sign-up" component={SignUp} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
