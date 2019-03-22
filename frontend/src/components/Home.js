import React, { Component } from "react";
import { Route } from "react-router-dom";
import TaskList from "./TaskList";
import Header from "./Header";
import Task from "./Task";
import Footer from "./Footer";
import {connect,login, scatterlogin,showinfo,pushAction,pushaction} from "../service/EosCommFun"
import "./css/Home.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: sessionStorage.getItem("userId"),
      username: sessionStorage.getItem("username"),
      tasks: [],
      newTask: false
    };
    this.handleLogout = this.handleLogout.bind(this);
  }

  // componentDidMount() {
  //   this.refreshRequires();
  //   this.refreshTask();
  // }

  // refreshRequires() {}

  // refreshTaskList() {
  //   pushAction("selectatask",{author:"jackma",task_id:6}).then( task => {
  //     let taskString = task.processed.action_traces[0].console;
  //     console.log("taskData:",taskString);
  //     console.log(typeof taskString);//string
  //     let taskJSON = JSON.parse(taskString);
  //     taskJSON.main.description = taskJSON.description;

  //     this.setState({
  //       tasks: [taskJSON.main], //jsonData.tasks
  //       newTask: false
  //     });
  //     sessionStorage.setItem("tasks",taskJSON.main);
  //   });
  // }

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

        <Footer/>
      </div>
    );
  }
}

export default Home;
