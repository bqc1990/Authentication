import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import UserContext from "../context/UserContext";
import Error from "./Error";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post("http://192.168.1.96:5000/api/user/sign-in", {
      username: username,
      password: password,
    })
      .then((res) => {
        //
        console.log(res.data);
        setUserData({
          token: res.data.token,
          user: res.data,
        });
        localStorage.setItem("auth-token", res.data.token);
        history.push("/user-detail");
      })
      .catch((err) => {
        console.log(err.response.data.msg);
        setError(err.response.data.msg);
      });
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleClearError = (e) => {
    setError("");
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleSubmit}>
        {error ? (
          <Error error_message={error} clearError={handleClearError} />
        ) : null}
        <div className="form-group">
          <label htmlFor="email-id">Email or username</label>
          <input
            required
            type="email"
            name="username"
            className="form-control"
            id="email-id"
            aria-describedby="emailHelp"
            value={username}
            onChange={handleChange}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="password-id">Password</label>
          <input
            required
            type="password"
            name="password"
            className="form-control"
            id="password-id"
            value={password}
            onChange={handlePassword}
          />
        </div>
        <button type="submit" className="btn btn-success btn-md btn-block">
          SIGN IN
        </button>
      </form>
    </div>
  );
}
