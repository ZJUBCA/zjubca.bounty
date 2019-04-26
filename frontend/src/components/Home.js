import React, { Component } from "react";
import { Route } from "react-router-dom";
import TaskList from "./TaskList";
import Header from "./Header";
import Task from "./Task";
import Footer from "./Footer";
import zjubounty from "../images/zjubca.png"
// import RankList from "./RankList";
// import "./css/Home.css";
import { Container, Row, Col, Form, Button, Image, Badge, Carousel } from 'react-bootstrap';

// import {connect,login, scatterlogin,showinfo,pushAction,pushaction} from "../service/EosCommFun"

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //userId: sessionStorage.getItem("userId"),
      userName: sessionStorage.getItem("userName"),
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
    //sessionStorage.removeItem("userId");
    alert("this.state to window + push action name + login once + e.msg + many alert + push action/get table rows error");
    // sessionStorage.removeItem("userName");
    // this.setState({
    //   //userId: null,
    //   userName: null
    // });
  }

  render() {
    const { match, location } = this.props; //是系统自带的2个属性。
    const { userName } = this.state;//userId,
    return (
      <div style={{paddingTop: 120, paddingBottom:120}}>
        <Header
          userName={userName}
          onLogout={this.handleLogout}
          location={location}
          myRank={-1}
          myGPAPlus={-1}
        />
        
      {/*         
        <Container>
          <Carousel>
            <Carousel.Item className="text-center">
              <Image
                // className="d-block"
                src={zjubounty}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item className="text-center">
              <Image
                // className="d-block"
                src={zjubounty}
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Container> */}
        

        <Route
          path={match.url}
          exact
          render={props => <TaskList userName={userName} {...props} />} //+ userName={userName} userId={userId}
        />

        <Route
          path={`${match.url}/:id`}
          render={props => <Task userName={userName} {...props} />} //+ userName={userName} userId={userId}
        />

        {/* <Route
          path={`${match.url}/ranklist`}
          render={props => <RankList userName={userName} {...props} />} //+ userName={userName} userId={userId}
        /> */}

        {/* <Route path="/ranklist" component={RankList} /> */}
        {/* <Route
          path={`${match.url}/ranklist`}
          render={props => <RankList userName={userName} {...props} />} //+ userName={userName} userId={userId}
        /> */}
        

        {/* <Footer/> */}

      </div>
    );
  }
}

export default Home;
