import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import Spinner from "./Spinner";

const Home = () => {
  const history = useHistory();

  const { authState, oktaAuth } = useOktaAuth();

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      history.push("/login");
    } else {
      oktaAuth.getUser().then((info) => {
        const apiBaseUri = process.env.REACT_APP_API_BASE_URL;
        fetch(`${apiBaseUri}/users/get/${info.preferred_username}`).then(
          (res) => {
            res.json();
          }
        );
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
