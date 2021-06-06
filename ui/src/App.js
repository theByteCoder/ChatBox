import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppWithRouterAccess from "./Components/AppWithRouterAccess";
import { SnackbarProvider } from "notistack";

const App = () => {
  return (
    <SnackbarProvider
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
