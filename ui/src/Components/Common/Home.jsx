import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import Spinner from "./Spinner";

const Home = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      history.push("/login");
    }
  }, [authState, history]);

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
      <Link to="/protected">Protected</Link>
      <br />
      {button}
    </div>
  );
};
export default Home;
