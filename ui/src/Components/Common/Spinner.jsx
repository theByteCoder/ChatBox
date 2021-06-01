import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Backdrop, CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "grid",
    placeItems: "center",
    marginTop: 20,
    width: "80%",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

const Spinner = ({ showSpinner }) => {
  const classes = useStyles();

  return (
    <>
      {showSpinner && (
        <div className={classes.root}>
          <Backdrop className={classes.backdrop} open={showSpinner}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      )}
    </>
  );
};

export default Spinner;
