import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import Spinner from "./Spinner";

const Home = () => {
  const history = useHistory();

  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      setUserInfo(null);
      history.push("/login");
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, history, oktaAuth]);

  useEffect(() => {
    if (authState.isPending) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [authState]);

  if (authState.isPending) {
    return <Spinner showSpinner={isLoading} />;
  }

  const button = authState.isAuthenticated && (
    <button
      onClick={() => {
        oktaAuth.signOut();
      }}
    >
      Logout
    </button>
  );

  return (
    <div>
      <Link to="/">Home</Link>
      <br />
      <Link to="/about">About</Link>
      <br />
      {button}
    </div>
  );
};
export default Home;
