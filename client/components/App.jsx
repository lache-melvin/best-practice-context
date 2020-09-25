import React from "react";
import { Route, Redirect } from "react-router-dom";

import { wrappedWith, authentication } from "../wrappers";

import WrappedNav from "./Nav";
import WrappedEntries from "./Entries";
import WrappedAddEntry from "./AddEntry";
import WrappedEntryDetail from "./EntryDetail";
import WrappedRegister from "./Register";
import WrappedSignIn from "./SignIn";

function App({ authenticated }) {
  return (
    <>
      <Route path="/" component={WrappedNav} />
      <h1>Best Practice</h1>
      <Route exact path="/" component={WrappedEntries} />
      <Route path="/add" component={WrappedAddEntry} />
      <Route
        path="/signin"
        render={({ history }) => {
          return authenticated() ? (
            <Redirect to="/" />
          ) : (
            <WrappedSignIn history={history} />
          );
        }}
      />
      <Route
        path="/register"
        render={({ history }) => {
          return authenticated() ? (
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

export default wrappedWith(authentication)(App);
