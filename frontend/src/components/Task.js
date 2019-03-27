import React, { Component } from "react";
import TaskEditor from "./TaskEditor";
import TaskView from "./TaskView";
import RequireList from "./RequireList";
// import { get, put, post } from "../utils/request";
// import url from "../utils/url";
import {pushAction} from "../service/EosCommFun"
import EosComm from "../service/EosComm"
import "./css/Task.css";
import tasksJsonData  from "../testdata.json";
import loading from "../images/loading1.gif";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: null,
      requires: [],
      editing: false
    };
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleRequireSubmit = this.handleRequireSubmit.bind(this);
    this.handleTaskSave = this.handleTaskSave.bind(this);
    this.handleTaskCancel = this.handleTaskCancel.bind(this);
    this.refreshRequires = this.refreshRequires.bind(this);
    this.refreshTask = this.refreshTask.bind(this);
  }

  componentDidMount() {
    this.refreshTask();
    // this.refreshRequires();
  }

  // 获取帖子详情
  refreshTask() {
    const taskId = this.props.match.params.id;
    // var taskData = tasksJsonData.tasks[taskId-1]; 
    let loginAlert = false;
    let eoscomm = new EosComm();
    eoscomm.connectAndLogin(loginAlert).then(loginAccount=>{
      eoscomm.pushAction("selectatask",{author:loginAccount.name,task_id:taskId}).then(task =>{
        this.setState({
          task: task
        });
      });
    });


    // pushAction("selectatask",{author:"jackma",task_id:6}).then( task => {
    //   let taskString = task.processed.action_traces[0].console;
    //   console.log("taskData:",taskString);
      
    //   let taskJSON = JSON.parse(taskString);
    //   taskJSON.main.description = taskJSON.description;
    //   console.log(taskJSON.main);
    //   console.log("author.id=",taskJSON.main.author.id,"userNames=",taskJSON.main.author.v);

    //   this.setState({
    //     task: taskJSON.main //jsonData.tasks
    //   });
    // });

  }

  // 获取要求列表
  refreshRequires() {
    const taskId = this.props.match.params.id;
    var requiresData = tasksJsonData.requires;
    // get(url.getRequireList(taskId)).then(data => {
    //   if (!data.error) {
    //     this.setState({
    //       requires: data
    //     });
    //   }else{
        alert("获取具体要求列表出错，进入测试模式");
        this.setState({
          requires: requiresData
        });
    //   }
    // });
  }

  // 让帖子处于编辑态
  handleEditClick() {
    this.setState({
      editing: true
    });
  }

  // 保存帖子
  handleTaskSave(data) {
    const id = this.props.match.params.id;
    this.saveTask(id, data);
  }

  // 取消编辑帖子
  handleTaskCancel() {
    this.setState({
      editing: false
    });
  }

  // 同步帖子的修改到服务器
  saveTask(id, task) {
    // put(url.updateTask(id), task).then(data => {
    //   if (!data.error) {
    //     /* 因为返回的帖子对象只有author的id信息，
    //      * 所有需要额外把完整的author信息合并到帖子对象中 */
    //     const newTask = { ...data, author: this.state.task.author };//{id:this.props.userId,userName:this.props.userName}
    //     this.setState({
    //       task: newTask,
    //       editing: false
    //     });
    //   }else{
        alert("保存任务修改出错，进入测试模式");
        const newTask= { ...this.state.task, ...task};
        this.setState({
          task: newTask,
          editing: false
        });
    //   }
    // });
  }

  // 提交新建的评论
  handleRequireSubmit(content) {
    var currentTime = (new Date()).toString().slice(11,15)+"-"
    +(new Date()).toString().slice(4,10)+" "+(new Date()).toString().slice(16,21);
    const taskId = this.props.match.params.id;
    const require = {
      author: {userName:this.props.userName},//id:this.props.userId,
      task: taskId,
      content: content,
      updatedAt: currentTime
    };
    this.saveRequire(require);
  }

  // 保存新的要求到服务器
  saveRequire(require) {
    // post(url.createRequire(), require).then(data => {
    //   if (!data.error) {
    //     this.refreshRequires();
    //   }else{
        alert("保存新任务要求出错，进入测试模式");
        this.setState({
          requires: [...this.state.requires, require]
        });
    //  }
    //  });
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
        <div style={ingStyle}>
          <br/>
            <div className="textCenter">
              <div>
                正在向区块链节点请求数据...<br/>
                如果本页面持续时间过长，请刷新页面。若刷新无果则说明网络故障或者Scatter登录失败。
              </div>
              <span>
                <img alt="loading" src={loading} />
              </span>
            </div>
          <br/>
        </div>
      );
    }
    // const editable = userId == task.author.id;  //===
    const editable = userName == task.author.username;
    return (
      <div className="task">

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
            editable={editable}
            onEditClick={this.handleEditClick}
          />
        )}
        <div className="requireList">
          <div>
            任务具体要求：
          </div>
          {task.requires}
        </div>
        {/* <RequireList
          requires={requires}
          editable={Boolean(userId)}
          onSubmit={this.handleRequireSubmit}
        /> */}
      </div>
    );
  }
}

export default Task;
