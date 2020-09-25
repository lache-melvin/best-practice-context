import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";

import WrappedNav from "./Nav";
import WrappedEntries from "./Entries";
import WrappedAddEntry from "./AddEntry";
import WrappedEntryDetail from "./EntryDetail";
import WrappedRegister from "./Register";
import WrappedSignIn from "./SignIn";

function App() {
  return (
    <>
      <Route path="/" component={WrappedNav} />
      <h1>Best Practice</h1>
      <Route exact path="/" component={WrappedEntries} />
      <Route path="/add" component={WrappedAddEntry} />
      <Route
        path="/signin"
        render={({ history }) => {
          return isAuthenticated() ? (
            <Redirect to="/" />
          ) : (
            <WrappedSignIn history={history} />
          );
        }}
      />
      <Route
        path="/register"
        render={({ history }) => {
          return isAuthenticated() ? (
            <Redirect to="/" />
          ) : (
            <WrappedRegister history={history} />
          );
        }}
      />
      <Route path="/entry/:id" component={WrappedEntryDetail} />
    </>
  );
}

export default App;
