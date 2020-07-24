import React, {useEffect, useState} from "react";
import {
  Switch,
  Route,
  BrowserRouter,
} from "react-router-dom";
import "./App.scss";
import ComposeEmailPage from "./ComposeEmailPage/ComposeEmailPage";
import ManageEmail from "./ManageEmail/ManageEmail";
import {ReceiverContext} from "./context/receiverContext";
import Header from "./Header/Header";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [receiver, setReceiver] = useState("");

  useEffect(() => {
    window.document.body.classList.add("init-app-loader-animate-hide");
    // Hiding initial app loader after 1 sec because the "fading" animation takes 1 sec to work
    setTimeout(() => window.document.body.classList.add("init-app-loader-hidden"), 1000);
  }, [])

  return (
    <ReceiverContext.Provider value={{ receiver, setReceiver: (receiver) => setReceiver(receiver) }}>
      <BrowserRouter>
        <div className="app">
          <Header />
            <Switch>
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
  );
}

export default App;
