import React, { Component } from "react";
import "./App.css";

import Groups from "./components/groups";
import Todos from "./components/todos";

export class App extends Component {
  render() {
    return (
      <div className="root columns">
        <div className="column is-half is-offset-one-quarter">
          <Groups />
          <Todos />
        </div>
      </div>
    );
  }
}

export default App;
