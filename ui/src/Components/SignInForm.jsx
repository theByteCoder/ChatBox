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
  },
  floatingLabelFocusStyle: {
    color: "black !important",
  },
  accountCircleIcon: {
    width: 35,
    marginRight: -10,
  },
  visibilityIcon: {
    width: 35,
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
  const [isLoading, setLoading] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    oktaAuth
      .signInWithCredentials({ username, password })
      .then((res) => {
        const sessionToken = res.sessionToken;
        setSessionToken(sessionToken);
        // sessionToken is a one-use token, this is only called once
        oktaAuth.signInWithRedirect({ sessionToken });
        setLoginFailed(false);
        setLoading(false);
      })
      .catch((err) => {
        setLoginFailed(true);
        setLoading(false);
      });
  };

  const handleUsernameChange = (e) => {
    setLoginFailed(false);
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setLoginFailed(false);
    setPassword(e.target.value);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
                  <AccountCircle className={classes.accountCircleIcon} />
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
            </Button>{" "}
          </CardActions>{" "}
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
      <Toastbar showSnack={loginFailed} text="Login Failed" variant="error" />
    </>
  );
};
export default SignInForm;
