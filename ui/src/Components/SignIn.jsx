import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import Spinner from "./Spinner";
import SignInForm from "./SignInForm";

const SignIn = () => {
  const { authState } = useOktaAuth();
  const [isLoading, setLoading] = useState(false);

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
  return authState.isAuthenticated ? (
    <Redirect to={{ pathname: "/" }} />
  ) : (
    <SignInForm />
  );
};

export default SignIn;
