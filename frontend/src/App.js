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
    

  //   this.state = {
  //     // loginAccount : null
  //     connect: connect
  //   }
    // this.eoscomm = new EosComm();
    // window.eoscomm = this.eoscomm;
    // this.eoscomm.connectAndLogin(false).then(loginAccount=>{
    //   this.setState({
    //     connect:{
    //       loginAccount: loginAccount,
    //       eoscomm: this.eoscomm
    //     }
    //   });
    //   window.loginAccount = loginAccount;
    //   console.log("window.eoscomm1:",window.eoscomm);
    //   console.log("window.loginAccount,",window.loginAccount);
    // })
    // window.connect = this.state.connect;
    // console.log("window.connect:",window.connect);
    // console.log("window.eoscomm2:",window.eoscomm);
  }
  componentWillMount(){
    this.eoscomm.connectAndLogin(false).then(loginAccount=>{
      window.loginAccount = loginAccount;
      sessionStorage.setItem("userName",window.loginAccount.name);
      console.log("window.loginAccount",window.loginAccount);
    });
  }
  // componentDidMount() {
  //   this.eoscomm.connectAndLogin(false).then(loginAccount=>{
  //     this.setState({
  //       connect:{
  //         loginAccount: loginAccount,
  //         eoscomm: this.eoscomm
  //       }
  //     });
  //     window.loginAccount = loginAccount;
  //     console.log("window.eoscomm1:",window.eoscomm);
  //     console.log("window.loginAccount,",window.loginAccount);
  //   })
  //   window.connect = this.state.connect;
  //   console.log("window.connect:",window.connect);
  //   console.log("window.eoscomm2:",window.eoscomm);
  // }

  render() {
    return (
      // <connectContext.Provider value={this.state.connect}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} >
            </Route>
            {/* <Route path="/login" component={Login} /> */}
            <Route path="/tasks" component={Home} />
            <Route path="/ranklist" component={RankList} />
            {/* <Route path="/scatterlogin" component={ScatterLogin} /> */}
          </Switch>
        </Router>
      // </connectContext.Provider>
    );
  }
}


// App.childContextTypes = {
//   eoscomm: PropTypes.object,
//   loginAccount: PropTypes.object
// };

export default App;

// export const AppContext = React.createContext({
//   eoscomm: App.eoscomm,
//   loginAccount: App.state.loginAccount
// });