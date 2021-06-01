import React, { useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { TextField, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(10),
  },
}));

const SignInForm = () => {
  const classes = useStyles();

  const { oktaAuth } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    oktaAuth
      .signInWithCredentials({ username, password })
      .then((res) => {
        const sessionToken = res.sessionToken;
        setSessionToken(sessionToken);
        // sessionToken is a one-use token, this is only called once
        oktaAuth.signInWithRedirect({ sessionToken });
      })
      .catch((err) => console.log("Error", err));
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  if (sessionToken) {
    // form is hidden while sessionToken is converted into id/access tokens
    return null;
  }

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <label>
        <TextField
          id="username"
          label="Username"
          variant="outlined"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          autoComplete="username"
        />
      </label>
      <label>
        <TextField
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          autoComplete="current-password"
        />
      </label>
      <Button id="submit" type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
};
export default SignInForm;
