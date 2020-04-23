import React from "react";
import Container from "@material-ui/core/Container";
import { HashRouter, Route } from "react-router-dom";
import LoginPage from "../src/pages/LoginPage/LoginPageContainer";
import ResetPassword from "../src/pages/ResetPassword/ResetPasswordContainer";
import LandingPage from "../src/pages/LandingPage/LandingPageContainer";
import PatientHealthInformation from "./pages/PatientHealthInformation";
import PrivateRoute from "../src/components/PrivateRoute/PrivateRoute";
import { makeStyles } from "@material-ui/core/styles";
import history from "./history";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: 90,
  },
}));

function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <Container className={classes.container}>
        <HashRouter basename={BASE_NAME}>
          <Route history={history} component={LoginPage} path="/login" />
          <PrivateRoute
            component={ResetPassword}
            history={history}
            path="/reset-password"
          />
          <PrivateRoute
            component={LandingPage}
            history={history}
            path="/"
            exact
          />
          <PrivateRoute
            history={history}
            component={PatientHealthInformation}
            path="/health-info/:requestId"
          />
        </HashRouter>
      </Container>
    </div>
  );
}

export default App;
