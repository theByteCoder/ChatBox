import React, { useRef } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppWithRouterAccess from "./Components/AppWithRouterAccess";
import { SnackbarProvider } from "notistack";
import { Button } from "@material-ui/core";

const App = () => {
  const notistackRef = useRef();
  return (
    <SnackbarProvider
      ref={notistackRef}
      action={(key) => (
        <Button
          onClick={() => notistackRef.current.closeSnackbar(key)}
          style={{ color: "#fff", fontSize: "20px" }}
        >
          ✖
        </Button>
      )}
      maxSnack={10}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <Router>
        <AppWithRouterAccess />
      </Router>
    </SnackbarProvider>
  );
};

export default App;
