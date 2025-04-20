import React, { useContext, useState } from "react";
import "./LoginIn.css";
import { assets } from "../../assets/assets.js";
import { StoreContext } from "../../context/StoreContext.jsx";
import axios from 'axios'

const LoginIn = ({ setshowLogin }) => {
  const { url ,setToken} = useContext(StoreContext);

  const [currState, setcurrState] = useState("Sign Up");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault()
    let newUrl = url;
    if (currState === "Login") {
      newUrl += "/api/user/login"

    } else {
      newUrl += "/api/user/register";
    }

    const response = await axios.post(newUrl, data)
    console.log(response)
    if (response.data.success) {
      setToken(response.data.token)
      localStorage.setItem("token", response.data.token)
      setshowLogin(false)
    } else {
      console.log("Error")
    }
  }

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setshowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-input">
          {currState === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              placeholder="Your Name"
              required
            />
          )}
          <input
            type="email"
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            placeholder="Your Email"
            required
          />
          <input
            type="password"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            placeholder="Password"
            required
          />
        </div>
        <button type="submit">{currState === "Sign Up" ? "Create Account" : "Login"}</button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a New Account?{" "}
            <span onClick={() => setcurrState("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have Account?{" "}
            <span onClick={() => setcurrState("Login")}>Login Here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginIn;
