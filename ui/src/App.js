import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppWithRouterAccess from "./Components/Login/AppWithRouterAccess";

const App = () => {
  return (
    <Router>
      <AppWithRouterAccess />
    </Router>
  );
};

export default App;
