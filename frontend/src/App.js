import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import RankList from "./components/RankList";
import EosComm from "./service/EosComm"
import PropTypes from 'prop-types';
import {connect, connectContext} from './components/Context'
// import Login from "./components/Login";
// import ScatterLogin from "./components/ScatterLogin";

class App extends Component {
  constructor(props){
    super(props);
    this.eoscomm = new EosComm();  
    window.eoscomm = this.eoscomm;
  }

  componentWillMount(){
    this.eoscomm.connectAndLogin(false).then(loginAccount=>{
      window.loginAccount = loginAccount;
      console.log("window.loginAccount",window.loginAccount);
    });
  }

  render() {
    return (
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/tasks" component={Home} />
            <Route path="/ranklist" component={RankList} />
          </Switch>
        </Router>
    );
  }
}

export default App;

// App.childContextTypes = {
//   eoscomm: PropTypes.object,
//   loginAccount: PropTypes.object
// };

// export const AppContext = React.createContext({
//   eoscomm: App.eoscomm,
//   loginAccount: App.state.loginAccount
// });