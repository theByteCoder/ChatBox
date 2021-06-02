import React, { useState } from "react";
import {
  makeStyles,
  Button,
  CardActionArea,
  CardMedia,
  Card,
  CardActions,
  TextField,
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import { AccountCircle } from "@material-ui/icons";
import Toastbar from "../Common/Toastbar";
import Spinner from "../Common/Spinner";
import RegistrationImage from "../Registration.png";

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
    height: 130,
    width: "95%",
    padding: 10,
  },
  firstNameTxtbx: {
    height: 80,
    display: "grid",
    placeItems: "center",
  },
  lastNameTxtbx: {
    marginTop: -15,
    display: "grid",
    placeItems: "center",
  },
  userNameTxtbx: {
    marginTop: 0,
    display: "grid",
    placeItems: "center",
  },
  emailTxtbx: {
    marginTop: 0,
    display: "grid",
    placeItems: "center",
  },
  requestUserBtn: {
    paddingTop: 10,
    display: "grid",
    width: "90%",
    padding: 15,
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

const RegisterForm = () => {
  const classes = useStyles();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  const [isLoading, setLoading] = useState(false);
  const [registrationRequestSuccess, setRegistrationRequestSuccess] =
    useState(false);
  const [registrationRequestFailed, setRegistrationRequestFailed] =
    useState(false);
  const [registrationFailureReason, setRegistrationFailureReason] =
    useState("");

  const handleSubmit = (e) => {
    setLoading(true);
    setRegistrationRequestSuccess(false);
    setRegistrationRequestFailed(false);
    e.preventDefault();
    const payload = {
      firstName: firstname,
      lastName: lastname,
      email: email,
      login: username,
    };
    fetch("http://127.0.0.1:8000/registration/request", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((response) => {
        setLoading(false);
        if (response.status === 201) {
          setRegistrationRequestSuccess(true);
        } else {
          setRegistrationFailureReason(response.results);
          setRegistrationRequestFailed(true);
        }
      });
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleFirstnameChange = (e) => {
    setFirstname(e.target.value);
  };

  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
  };

  return (
    <>
      <form className={classes.root} onSubmit={handleSubmit}>
        <Card className={classes.cardBox}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={RegistrationImage}
              title="hello-there"
            />
          </CardActionArea>
          <CardActions className={classes.firstNameTxtbx}>
            <TextField
              required
              id="firstname"
              label="First name"
              variant="filled"
              type="text"
              value={firstname}
              onChange={handleFirstnameChange}
              autoComplete="current-firstname"
              InputLabelProps={{
                className: classes.floatingLabelFocusStyle,
              }}
              InputProps={{
                endAdornment: (
                  <PersonIcon className={classes.accountCircleIcon} />
                ),
              }}
            />
          </CardActions>
          <CardActions className={classes.lastNameTxtbx}>
            <TextField
              required
              id="lastname"
              label="Last name"
              variant="filled"
              type="text"
              value={lastname}
              onChange={handleLastnameChange}
              autoComplete="current-lastname"
              InputLabelProps={{
                className: classes.floatingLabelFocusStyle,
              }}
              InputProps={{
                endAdornment: (
                  <PersonIcon className={classes.accountCircleIcon} />
                ),
              }}
            />
          </CardActions>
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
          <CardActions className={classes.userNameTxtbx}>
            <TextField
              required
              id="email"
              label="Email"
              variant="filled"
              type="text"
              value={email}
              onChange={handleEmailChange}
              autoComplete="current-email"
              InputLabelProps={{
                className: classes.floatingLabelFocusStyle,
              }}
              InputProps={{
                endAdornment: (
                  <AlternateEmailIcon className={classes.accountCircleIcon} />
                ),
              }}
            />
          </CardActions>
          <CardActions className={classes.requestUserBtn}>
            <Button
              id="submit"
              type="submit"
              variant="contained"
              color="primary"
            >
              Request New User
            </Button>
          </CardActions>
        </Card>
      </form>
      <Spinner showSpinner={isLoading} />
      <Toastbar
        showSnack={registrationRequestSuccess}
        text="Registration successful. You will receive an email to activate your user."
        variant="success"
      />
      <Toastbar
        showSnack={registrationRequestFailed}
        text={`Registration failed. ${registrationFailureReason}.`}
        variant="error"
      />
    </>
  );
};
export default RegisterForm;
