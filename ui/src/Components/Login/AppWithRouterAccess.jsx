import React from "react";
import { Route, useHistory } from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import { OktaAuth } from "@okta/okta-auth-js";
import Home from "./Home";
import SignIn from "./SignIn";
import Protected from "./Protected";

const AppWithRouterAccess = () => {
  const history = useHistory();
  const onAuthRequired = () => {
    history.push("/login");
  };

  const oktaAuth = new OktaAuth({
    issuer: `https://${process.env.REACT_APP_OKTA_DOMAIN}/oauth2/${process.env.REACT_APP_SERVER_ID}`,
    clientId: `${process.env.REACT_APP_CLIENT_ID}`,
    redirectUri: window.location.origin + "/login/callback",
    onAuthRequired: onAuthRequired,
    pkce: true,
  });

  return (
    <Security oktaAuth={oktaAuth}>
      <Route path="/" exact={true} component={Home} />
      <SecureRoute path="/protected" component={Protected} />
      <Route path="/login" render={() => <SignIn />} />
      <Route path="/login/callback" component={LoginCallback} />
    </Security>
  );
};
export default AppWithRouterAccess;
