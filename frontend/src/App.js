import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import RankList from "./components/RankList";

// import Login from "./components/Login";
// import ScatterLogin from "./components/ScatterLogin";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          {/* <Route path="/login" component={Login} /> */}
          <Route path="/tasks" component={Home} />
          <Route path="/ranklist" component={RankList} />
          {/* <Route path="/scatterlogin" component={ScatterLogin} /> */}
        </Switch>
      </Router>
    );
  }
}

export default App;
