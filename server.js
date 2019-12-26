const express = require("express");
require("dotenv").config();
const jwt = require("express-jwt");
const jwksrsa = require("jwks-rsa");

const checkJwt = jwt({
  secret: jwksrsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
  issuer: `https://${process.env.REACT_APP_AUTH0_DOMAIN}/`,
  algorithms: ["RS256"]
});

const app = express();

app.get("/public", (req, res) => {
  res.json({
    message: "hello from public api"
  });
});

app.get("/private", checkJwt, (req, res) => {
  res.json({
    message: "hello from private api"
  });
});

app.listen(3001);

console.log("listening on : ", process.env.REACT_APP_AUTH0_AUDIENCE);
