import React from "react";
import { Route, useHistory } from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import { OktaAuth } from "@okta/okta-auth-js";
import Home from "../Common/Home";
import About from "../Common/About";
import RegisterForm from "./RegisterForm";
import SignIn from "./SignIn";

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
      <SecureRoute path="/about" component={About} />
      <Route path="/login" render={() => <SignIn />} />
      <Route path="/register" render={() => <RegisterForm />} />
      <Route path="/login/callback" component={LoginCallback} />
    </Security>
  );
};
export default AppWithRouterAccess;
