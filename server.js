const express = require("express");
require("dotenv").config();

const app = express();

app.get("/public", (req, res) => {
  res.json({
    message: "hello from public api"
  });
});

app.listen(3001);

console.log("listening on : ", process.env.REACT_APP_AUTH0_AUDIENCE);
