import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import TaskEditor from "./TaskEditor";
import TaskView from "./TaskView";
import { Container, Row, Col, Form, Button, Image, Badge } from 'react-bootstrap';
// import RequireList from "./RequireList";
// import { get, put, post } from "../utils/request";
// import url from "../utils/url";
// import tasksJsonData  from "../testdata.json";
import EosComm from "../service/EosComm"
// import "./css/Task.css";
import loading from "../images/loading1.gif";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: null,
      // bounty:[],
      requires: [],
      editing: false,
      redirectToReferrer: false
    };
    this.loginAccount = null;
    this.handleEditClick = this.handleEditClick.bind(this);
    // this.handleRequireSubmit = this.handleRequireSubmit.bind(this);
    this.handleTaskSave = this.handleTaskSave.bind(this);
    this.handleTaskCancel = this.handleTaskCancel.bind(this);
    // this.refreshRequires = this.refreshRequires.bind(this);
    this.refreshTask = this.refreshTask.bind(this);
    this.handleLikeClick = this.handleLikeClick.bind(this);
    this.handleHateClick = this.handleHateClick.bind(this);

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleParticipateClick = this.handleParticipateClick.bind(this);
    this.handleWithdrawClick = this.handleWithdrawClick.bind(this);
    this.handleCheckClick = this.handleCheckClick.bind(this);
    this.handleAdjustClick = this.handleAdjustClick.bind(this);

    // this.recuAllocateb = this.recuAllocateb.bind(this);

    this.eoscomm = new EosComm();
  }

  componentDidMount(){
    this.refreshTask();
  }

  // 获取任务详情
  refreshTask(){
    const taskId = this.props.match.params.id;
    // var taskData = tasksJsonData.tasks[taskId-1]; 
    let loginAlert = false;
    this.eoscomm.fetchData('zjubcatask11','zjubcatask11','task').then(rowsdata=>{
      console.log("task ",taskId,": ",rowsdata[taskId-1]);
      this.setState({
        task: rowsdata[taskId-1] //jsonData.tasks
      });
    });
    // this.eoscomm.connectAndLogin(loginAlert).then(loginAccount=>{
    //   this.eoscomm.pushAction("selectatask",{author:loginAccount.name,task_id:taskId}).then(task =>{
    //     this.setState({
    //       task: task
    //     });
    //   });
    // });
  }

  // const account_name author, uint64_t task_id, string& likevote, string& hatevote
  handleLikeClick(){
    const taskId = this.props.match.params.id;
    let loginAlert = false;
    let likes = parseInt(this.state.task.likevote) + 1 ;
    let hates = parseInt(this.state.task.hatevote) ;
    this.eoscomm.connectAndLogin(loginAlert).then(loginAccount=>{
      this.eoscomm.pushAction("updatevotes",{author:loginAccount.name, task_id:taskId,
        likevote:likes, hatevote:hates}).then(returndata =>{
          console.log("3.Vote data updated:",returndata);
          this.refreshTask();
      });
    });
  }

  handleHateClick(){
    const taskId = this.props.match.params.id;
    let loginAlert = false;
    let likes = parseInt(this.state.task.likevote) ;
    let hates = parseInt(this.state.task.hatevote) + 1 ;
    this.eoscomm.connectAndLogin(loginAlert).then(loginAccount=>{
      this.eoscomm.pushAction("updatevotes",{author:loginAccount.name, task_id:taskId,
        likevote:likes, hatevote:hates}).then(returndata =>{
          console.log("3.Vote data updated:",returndata);
          this.refreshTask();
      });
    });
  }

  handleDeleteClick(){
    const taskId = this.props.match.params.id;
    let loginAlert = false;
    this.eoscomm.connectAndLogin(loginAlert).then(loginAccount=>{
      this.eoscomm.pushAction("erase",{author:loginAccount.name, task_id:taskId}).then(returndata =>{
          console.log("3.Delete task message:",returndata);
          alert("Task has been deleted.");
          this.setState({
            redirectToReferrer: true
          });
      });
    });
  }
  
  handleParticipateClick(){
    const taskId = this.props.match.params.id;
    let loginAlert = false;
    this.eoscomm.connectAndLogin(loginAlert).then(loginAccount=>{
      this.eoscomm.pushAction("participate",{author:loginAccount.name, task_id:taskId,
        participantname:this.props.userName}).then(returndata =>{
          console.log("3.Paticipants data updated:",returndata);
          this.refreshTask();
      });
    });
  }

  handleWithdrawClick(){
    const taskId = this.props.match.params.id;
    let loginAlert = false;
    this.eoscomm.connectAndLogin(loginAlert).then(loginAccount=>{
      this.eoscomm.pushAction("withdraw",{author:loginAccount.name, task_id:taskId,
        participantname:this.props.userName}).then(returndata =>{
          console.log("3.Paticipants data updated:",returndata);
          this.refreshTask();
      });
    });
  }

  recuAllocateb(){
    var recuAllocateb = (i, bounty) => {
      const taskId = this.props.match.params.id;
      let loginAlert = false;
      if(i===0){
        // (const account_name author, uint64_t task_id, string& participantname, 
        // string distribution, string score)
        return this.eoscomm.connectAndLogin(loginAlert).then(loginAccount=>{
          // for(var i = 0; i<newBounty.length; i++){
            // console.log("allocate:",i);
            this.loginAccount = loginAccount;
            this.eoscomm.pushAction("allocateb",{author:loginAccount.name, task_id:taskId, 
              participantname:bounty[0].username, 
              distribution:bounty[0].distribution, score:bounty[0].score});
            //   .then(returndata =>{
            //     console.log("3.Paticipants data updated:",returndata);
            //     // this.refreshTask();
            // })
          // }
        });
      }else{
        var thisBounty = bounty.pop();
        console.log("pop:",thisBounty);
        return recuAllocateb(i-1, bounty).then(()=>{
          this.eoscomm.connectAndLogin(loginAlert).then(loginAccount=>{
              this.eoscomm.pushAction("allocateb",{author:loginAccount.name, task_id:taskId, 
                participantname:thisBounty.username, 
                distribution:thisBounty.distribution, score:thisBounty.score});
          });
        });
      }
    };
  }

  handleCheckClick(newAllBounty){
    const taskId = this.props.match.params.id;
    let loginAlert = false;
    this.eoscomm.connectAndLogin(loginAlert).then(loginAccount=>{
      this.eoscomm.pushAction("updatestatus",{author:loginAccount.name, task_id:taskId,
        status:"Done"}).then(returndata =>{
          console.log("3.Paticipants data updated:",returndata);
          this.refreshTask();
      });
    });
  }

  handleAdjustClick(){
    
  }

  // 让任务处于编辑态
  handleEditClick() {
    this.setState({
      editing: true
    });
  }

  // 保存编辑的任务
  handleTaskSave(data) {
    const id = this.props.match.params.id;
    this.saveTask(id, data);
  }

  // 取消编辑任务
  handleTaskCancel() {
    this.setState({
      editing: false
    });
  }

  // 同步任务的修改到服务器
  saveTask(id, data) {
    let loginAlert = false;
    this.eoscomm.connectAndLogin(loginAlert).then(loginAccount=>{
      this.eoscomm.pushAction("update",
      { author: loginAccount.name,
        id: id,//
        // authorname: data.author.userName,
        title: data.title,
        status: data.status,
        rolenumbers: data.rolenumbers,
        reward: data.reward,
        pledge: data.pledge,
        updatedat: data.updatedat,
        requires: data.requires,
        // likevote: data.likevote,
        // hatevote: data.hatevote,
        description: data.description
    }).then(returndata =>{//"selectatask",{author:loginAccount.name,task_id:6}
        console.log("3.Update task data:",returndata);
        this.setState({
          editing: false
        });
        this.refreshTask();
      });
    });

  }

  find(participants, somebody){
    for(var i=0; i<participants.length; i++){
      if(participants[i].username===somebody)
        return true;
    }
    return false;
  }

  render() {
    const { task, requires, editing } = this.state;
    const { userName } = this.props; //??? userId,
    // console.log("render task:",task);
    // console.log("render task.author:",task.author);
    if (!task) {
      let ingStyle = {
        height: '650px',
        fontSize: '20px'
        // text-align: "center"
      }
      return (
        <Container style={ingStyle}>
          <br/>
            <Container className="textCenter">
              <Row>
                <Col className="text-center">
                正在向区块链节点请求数据...
                </Col> 
              </Row>
              <Row>
                <Col className="text-center">
                  <Image alt="loading" src={loading} />
                </Col>
              </Row>
              <Row>
                <Col className="text-center">
                  如果本页面持续时间过长，请<strong>刷新页面</strong>。若刷新无果则说明网络故障或者Scatter登录失败。
                </Col>
              </Row>
            </Container>
          <br/>
        </Container>
      );
    }
    // const editable = userId == task.author.id;  //===
    const deletable = userName === task.participants[0].username && (task.status === "Before Executing");
    const editable = userName === task.participants[0].username;
    const participable = (task.status === "Before Executing") &&  !this.find(task.participants,userName) ;
    const withdrawable = (task.status === "Before Executing") && (this.find(task.participants, userName));
    const checkable = task.status === "After Executing" && editable;
    const adjustable = task.status === "Done" && editable;
    const { from } =  { from: { pathname: "/" } };
    if (this.state.redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <Container className="task">

        {/* 在React中直接输出一个Object会导致：Objects are not valid as a React child  */}
        {/* <div>{task}</div> */}
        {/* <div>{task.author}</div> */}
        {editing ? (
          <TaskEditor
            task={task}
            onSave={this.handleTaskSave}
            onCancel={this.handleTaskCancel}
            //userId={userId}
            userName={userName}
          />
        ) : (
          <TaskView
            task={task}
            deletable={deletable}
            editable={editable}
            participable={participable}
            withdrawable={withdrawable}
            checkable={checkable}
            adjustable={adjustable}
            
            onEditClick={this.handleEditClick}
            onLikeClick={this.handleLikeClick}
            onHateClick={this.handleHateClick}

            onDeleteClick={this.handleDeleteClick}
            onPaticipateClick={this.handleParticipateClick}
            onWithdrawClick={this.handleWithdrawClick}
            onCheckClick={this.handleCheckClick}
            onAdjustClick={this.handleAdjustClick}
          />
        )}

        {/* <ThemeSwitcher/> */}

      </Container>
    );
  }
}

export default Task;
