import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Notes from "./Notes";
import Notes2 from "./Notes2";
import { useHistory } from "react-router";

export default function App() {
  const history = useHistory();

  useEffect(() => {
    history.push("/signin");
  }, []);

  return (
    <Switch>
      <Route path="/signin">
        <SignIn />
      </Route>
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/note">
        <Notes />
      </Route>
      <Route path="/note2">
        <Notes2 />
      </Route>
    </Switch>
  );
}
