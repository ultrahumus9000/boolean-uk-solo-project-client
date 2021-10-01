import React from "react";
import { useEffect } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import PageNotFound from "./pages/NotFounPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import PurchasePage from "./pages/PurchasePage";
import AdminPage from "./pages/AdminPage";
import GuestPage from "./pages/GuestPage";

import Header from "./components/Header";
import useStore from "./store";

function App() {
  const currentUser = useStore((store) => store.currentUser);
  const getValidateCurrToken = useStore((store) => store.getValidateCurrToken);

  // useEffect(() => {
  //   getValidateCurrToken();
  // }, []);

  return (
    <div className="App">
      <div className="main">
        <Header />
        <main>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" exact component={LoginPage} />
            <Route path="/signup" exact component={SignUpPage} />
            <Route path="/admin" exact component={AdminPage} />
            <Route path="/purchase" exact component={PurchasePage} />
            <Route path="/guest" exact component={GuestPage} />
            <Route path="*" component={PageNotFound} />
          </Switch>
        </main>
      </div>
    </div>
  );
}

export default App;
