import React, { Component } from "react";
import { Route } from "react-router-dom";
import TaskList from "./TaskList";
import Header from "./Header";
import Task from "./Task";
import "./Home.css";

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
          render={props => <TaskList userId={userId} {...props} />}
        />
        {/* <div>{userId}</div> */}
        <Route
          path={`${match.url}/:id`}
          render={props => <Task userId={userId} {...props} />}
        />
        <div id="footer_wrap" className="outer">
          <footer className="inner">
            <p className="copyright">ZJUBCA.Bounty created by <a href="https://github.com/treasersimplifies">treaser</a></p>
            <p>Owned By <a href="https://github.com/Blockchain-zju">ZJU BlockChain Association</a></p>
          </footer>
        </div>
      </div>
    );
  }
}

export default Home;
