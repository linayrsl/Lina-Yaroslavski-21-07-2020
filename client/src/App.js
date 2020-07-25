import React, { useEffect, useState } from "react";
import {
  Switch,
  Route,
  BrowserRouter, Redirect,
} from "react-router-dom";
import "./App.scss";
import { ToastContainer } from "react-toastify";
import ComposeEmailPage from "./ComposeEmailPage/ComposeEmailPage";
import ManageEmail from "./ManageEmail/ManageEmail";
import { ReceiverContext } from "./context/receiverContext";
import { AppConfigContext } from "./context/appConfigContext";
import Header from "./Header/Header";
import "react-toastify/dist/ReactToastify.css";
import config from "./appConfig";

function App() {
  const [receiver, setReceiver] = useState("");
  const [appConfig] = useState({
    ...config,
    ...(window.configOverride || {}),
  });

  useEffect(() => {
    window.document.body.classList.add("init-app-loader-animate-hide");
    // Hiding initial app loader after 1 sec because the "fading" animation takes 1 sec to work
    setTimeout(() => window.document.body.classList.add("init-app-loader-hidden"), 1000);
  }, []);

  return (
    <AppConfigContext.Provider
      value={appConfig}>
      <ReceiverContext.Provider
        value={{ receiver, setReceiver: (newReceiver) => setReceiver(newReceiver) }}>
        <BrowserRouter>
          <div className="app">
            <Header />
              <Switch>
                <Route exact path="/">
                  <Redirect to="/manage" />
                </Route>
                <Route path="/compose">
                  <ComposeEmailPage />
                </Route>
                <Route path="/manage">
                  <ManageEmail />
                </Route>
              </Switch>
          </div>
          </BrowserRouter>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}/>
      </ReceiverContext.Provider>
    </AppConfigContext.Provider>
  );
}

export default App;
