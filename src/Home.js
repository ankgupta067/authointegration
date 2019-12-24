import React from "react";
import {Link} from "react-router-dom";
const Home = props => {
  return (
    <>
      <h1>Home</h1>
      {props.auth.isAuthenticated() ? (
        <Link to="/profile">view profile</Link>
      ) : (
        <button onClick={props.auth.login}>login</button>
      )}
    </>
  );
};

export default Home;
