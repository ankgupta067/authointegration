import React, { useState, useEffect } from "react";

export default function Public() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    fetch("/public")
      .then(response => {
        if (response.ok) return response.json();
        throw new Error("ïnvalid response from error");
      })
      .then(response => {
        console.log(response.message);
        setMessage(response.message);
      })
      .catch(err => {
        console.log(err);
        setMessage(err.message);
      });
  }, []);
  return (
    <div>
      <p>{message}</p>
    </div>
  );
}
