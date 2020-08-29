import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "authenticare/client";

import Nav from "./Nav";
import Entries from "./Entries";
import AddEntry from "./AddEntry";
import EntryDetail from "./EntryDetail";
import Register from "./Register";
import SignIn from "./SignIn";

function App() {
  return (
    <>
      <Route path="/" component={Nav} />
      <h1>Best Practice</h1>
      <Route exact path="/" component={Entries} />
      <Route path="/add" component={AddEntry} />
      <Route
        path="/signin"
        render={({ history }) => {
          return isAuthenticated() ? (
            <Redirect to="/" />
          ) : (
            <SignIn history={history} />
          );
        }}
      />
      <Route
        path="/register"
        render={({ history }) => {
          return isAuthenticated() ? (
            <Redirect to="/" />
          ) : (
            <Register history={history} />
          );
        }}
      />
      <Route path="/entry/:id" component={EntryDetail} />
    </>
  );
}

export default App;
