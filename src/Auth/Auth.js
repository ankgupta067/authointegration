import auth0 from "auth0-js";

export default class Auth {
  constructor(history) {
    this.history = history;
    this.userProfile = null;
    this.auth0 = new auth0.WebAuth({
      domain: process.env.REACT_APP_AUTH0_DOMAIN,
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      redirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
      audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      responseType: "token id_token",
      scope: "openid profile email"
    });
  }

  login = () => {
    this.auth0.authorize();
  };

  saveSession = authResult => {
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("acess_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
  };

  handleAuthentication = () => {
    this.auth0.parseHash((err, authresult) => {
      if (authresult && authresult.accessToken && authresult.idToken) {
        this.saveSession(authresult);
        this.history.push("/");
      } else {
        this.history.push("/");
        alert(`something went wrong ${err.error}`);
      }
    });
  };

  isAuthenticated = () => {
    return (
      new Date().getTime() < JSON.parse(localStorage.getItem("expires_at"))
    );
  };

  logout = () => {
    localStorage.removeItem("acess_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.auth0.logout({
      clientID: process.env.REACT_APP_AUTH0_CLIENT_ID,
      returnTo: "http://localhost:3000"
    });
  };
  getAccessToken = () => {
    const at = localStorage.getItem("acess_token");
    if (!at) {
      throw new Error("access token found");
    }
    return at;
  };

  getUserProfile = cb => {
    if (this.userProfile) return cb(this.userProfile);
    this.auth0.client.userInfo(this.getAccessToken(), (err, profile) => {
      if (profile) this.userProfile = profile;
      cb(this.userProfile, err);
    });
  };
}
