import React from "react";

export default function Callback(props) {
  if (/access_token|id_token|error/.test(props.location.hash)) {
    props.auth.handleAuthentication();
  } else {
    throw new Error("Invalid url callback.");
  }
  return <h1>...loading</h1>;
}
