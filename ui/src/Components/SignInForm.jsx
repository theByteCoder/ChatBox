import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import {
  makeStyles,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  InputAdornment,
  IconButton,
  TextField,
} from "@material-ui/core";
import { AccountCircle, Visibility, VisibilityOff } from "@material-ui/icons";
import Toastbar from "./Toastbar";
import Spinner from "./Spinner";
import LoginImage from "./Login.png";

const useStyles = makeStyles((theme) => ({
  root: {
    maxHeight: 550,
    display: "grid",
    placeItems: "center",
  },
  cardBox: {
    width: 300,
    marginTop: theme.spacing(4),
    backgroundColor: "#00af9c",
  },
  media: {
    height: 180,
    width: "95%",
    padding: 10,
  },
  userNameTxtbx: {
    height: 80,
    display: "grid",
    placeItems: "center",
  },
  passwordTxtbx: {
    height: 50,
    display: "grid",
    placeItems: "center",
  },
  submitBtn: {
    height: 50,
    display: "grid",
    width: "90%",
    padding: 15,
  },
  registerBtn: {
    marginTop: 0,
    display: "grid",
    width: "90%",
    padding: 15,
  },
  whiteText: {
    color: "white !important",
    textDecoration: "underline",
  },
  floatingLabelFocusStyle: {
    color: "black !important",
  },
  accountCircleIcon: {
    width: 35,
    marginRight: -10,
  },
  visibilityIcon: {
    width: 60,
    marginRight: -10,
    marginLeft: -8,
  },
}));

const SignInForm = () => {
  const classes = useStyles();
  const history = useHistory();

  const { oktaAuth } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isUserRegistered, setUserRegistered] = useState(false);
  const [isUserNotRegistered, setUserNotRegistered] = useState(false);
  const [isUserNotRegisteredLoginFailed, setUserNotRegisteredLoginFailed] =
    useState(false);
  const [isInvalidPasswordLoginFailed, setInvalidPasswordLoginFailed] =
    useState(false);
  const [isLoading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    setUserRegistered(false);
    setUserNotRegistered(false);
    setUserNotRegisteredLoginFailed(false);
    setInvalidPasswordLoginFailed(false);
    setLoading(true);
    e.preventDefault();
    const apiBaseUri = process.env.REACT_APP_API_BASE_URL;
    oktaAuth
      .signInWithCredentials({ username, password })
      .then((res) => {
        const sessionToken = res.sessionToken;
        setSessionToken(sessionToken);
        // sessionToken is a one-use token, this is only called once
        oktaAuth.signInWithRedirect({ sessionToken });
        setLoading(false);
      })
      .catch((err) => {
        fetch(`${apiBaseUri}/users/get/${username}`).then((res) => {
          res.status === 404 && setUserNotRegisteredLoginFailed(true);
          (res.status === 200 || res.status === 201) &&
            setInvalidPasswordLoginFailed(true);
          setLoading(false);
        });
      });
  };

  const handleUsernameChange = (e) => {
    setUserRegistered(false);
    setUserNotRegistered(false);
    setUserNotRegisteredLoginFailed(false);
    setInvalidPasswordLoginFailed(false);
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setUserRegistered(false);
    setUserNotRegistered(false);
    setUserNotRegisteredLoginFailed(false);
    setInvalidPasswordLoginFailed(false);
    setPassword(e.target.value);
  };

  const handleClickShowPassword = () => {
    setUserRegistered(false);
    setUserNotRegistered(false);
    setUserNotRegisteredLoginFailed(false);
    setInvalidPasswordLoginFailed(false);
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    setUserRegistered(false);
    setUserNotRegistered(false);
    setUserNotRegisteredLoginFailed(false);
    setInvalidPasswordLoginFailed(false);
    event.preventDefault();
  };

  const handleCheckUser = () => {
    setUserRegistered(false);
    setUserNotRegistered(false);
    setUserNotRegisteredLoginFailed(false);
    setInvalidPasswordLoginFailed(false);
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_BASE_URL}/users/get/${username}`).then(
      (res) => {
        setLoading(false);
        res.status === 200 && setUserRegistered(true);
        res.status === 201 && setUserRegistered(true);
        res.status === 404 && setUserNotRegistered(true);
      }
    );
  };

  if (sessionToken) {
    // form is hidden while sessionToken is converted into id/access tokens
    return null;
  }

  return (
    <>
      <form className={classes.root} onSubmit={handleSubmit}>
        <Card className={classes.cardBox}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={LoginImage}
              title="good-vibes"
            />
          </CardActionArea>
          <CardActions className={classes.userNameTxtbx}>
            <TextField
              required
              id="username"
              label="Username"
              variant="filled"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              autoComplete="current-username"
              InputLabelProps={{
                className: classes.floatingLabelFocusStyle,
              }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleCheckUser}>
                    <AccountCircle className={classes.accountCircleIcon} />
                  </IconButton>
                ),
              }}
            />
          </CardActions>
          <CardActions className={classes.passwordTxtbx}>
            <TextField
              required
              id="password"
              label="Password"
              variant="filled"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      className={classes.visibilityIcon}
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                className: classes.floatingLabelFocusStyle,
              }}
            />
          </CardActions>
          <CardActions className={classes.submitBtn}>
            <Button
              id="submit"
              type="submit"
              variant="contained"
              color="primary"
            >
              Login
            </Button>
          </CardActions>
          <CardActions className={classes.registerBtn}>
            <Button
              id="register"
              type="button"
              variant="text"
              color="primary"
              onClick={() => {
                history.push("/register");
              }}
              className={classes.whiteText}
            >
              Register User
            </Button>
          </CardActions>
        </Card>
      </form>
      <Spinner showSpinner={isLoading} />
      <Toastbar
        showSnack={isUserRegistered}
        text="User is registered."
        variant="success"
      />
      <Toastbar
        showSnack={isUserNotRegistered}
        text={"User is not registered."}
        variant="error"
      />
      <Toastbar
        showSnack={isUserNotRegisteredLoginFailed}
        text={"Login failed. User is not registered."}
        variant="error"
      />
      <Toastbar
        showSnack={isInvalidPasswordLoginFailed}
        text="Login failed. Invalid password."
        variant="error"
      />
    </>
  );
};
export default SignInForm;
