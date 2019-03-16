import React, { Component } from "react";
import { Route } from "react-router-dom";
import TaskList from "./TaskList";
import Header from "./Header";
import Task from "./Task";
import "./css/Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: sessionStorage.getItem("userId"),
      username: sessionStorage.getItem("username")
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    // 注销用户
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("username");
    this.setState({
      userId: null,
      username: null
    });
  }

  render() {
    const { match, location } = this.props; //是系统自带的2个属性。
    const { userId, username } = this.state;
    return (
      <div>
        <Header
          username={username}
          onLogout={this.handleLogout}
          location={location}
        />

        <Route
          path={match.url}
          exact
          render={props => <TaskList userId={userId} username={username} {...props} />} //+ username={username}
        />

        {/* <div>{userId}</div> */}
        <Route
          path={`${match.url}/:id`}
          render={props => <Task userId={userId} username={username} {...props} />} //+ username={username}
        />

        <div id="footer_wrap" className="outer">
          <footer className="inner">
            <p className="copyright">
              © 2019 ZJU BlockChain Association 浙江大学区块链协会<br/>
              Other Links: <a href="https://github.com/Blockchain-zju"> ZJU BlockChain Association GitHub </a> |
              <a href="https://toolkit.zjubca.org/"> ZJUBCA.EOS TOOLKIT </a> |
              <a href="https://docs.zjubca.org"> ZJUBCA.DOCS </a> 
            </p>
          </footer>
        </div>
      </div>
    );
  }
}

export default Home;
