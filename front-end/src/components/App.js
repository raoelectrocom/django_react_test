import React from "react";
import {Route, Switch} from "react-router-dom";

import PageNotFound from "./PageNotFound";
import Header from "./common/Header";
import BlogList from "./core/BlogList";
import BlogDetail from "./core/BlogDetail";
import BlogCreate from "./core/BlogCreate";
import PrivateRoute from "./authentication/PrivateRoute";
import LoginPage from "./authentication/LoginPage";
import SignUpPage from "./authentication/SignUpPage";

function App() {
  return (
    <>
      <Header/>
      <Switch>
        <PrivateRoute exact path="/" component={BlogList}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/sign-up" component={SignUpPage}/>
        <Route path="/blog-detail" component={BlogDetail}/>
        <Route path="/blog-create" component={BlogCreate}/>
        <Route component={PageNotFound}/>
      </Switch>
    </>
  );
}

export default App;