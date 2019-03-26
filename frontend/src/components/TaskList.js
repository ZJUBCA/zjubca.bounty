import React, { Component } from "react";
import TasksView from "./TasksView";
import TaskEditor from "./TaskEditor";
import TaskFilter from "./TaskFilter";
// import EOSIOClient from "../ScatterExample/eosio-client"
import EosComm from "../service/EosComm"
// import EosService from "../service/EosCommService"
import {connect,login, scatterlogin,showinfo,pushAction,pushaction} from "../service/EosCommFun"
import "./css/TaskList.css";
import jsonData  from "../testdata.json"
// import {loginHistoryExists,connect,login} from '../scatter/scatter_helper';
// import { get, post } from "../utils/request";
// import url from "../utils/url";

// ScatterJS.plugins(new ScatterEOS());

class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTask: false
    };
    this.handleCancel = this.handleCancel.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleNewTask = this.handleNewTask.bind(this);
    this.refreshTaskList = this.refreshTaskList.bind(this);
    this.getTaskList = this.getTaskList.bind(this);
  }

  componentDidMount() {
    // this.refreshTaskList();
    this.getTaskList();
  }

  getTaskList(){
    let eoscomm = new EosComm();
    eoscomm.connectAndLogin().then(loginAccount=>{
      eoscomm.pushAction("selectitems",{author:loginAccount.name,filter:"*",judge:"*",value:"*"}).then(tasks =>{//"selectatask",{author:loginAccount.name,task_id:6}
        
        this.setState({
          tasks: tasks.tasks, //jsonData.tasks
          newTask: false
        });
      });
    });
   
  }
  
  // 获取任务列表
  refreshTaskList() {//async 
    // EosCommFun Version:
    pushAction("selectatask",{author:"jackma",task_id:6}).then( tasks => {
      // let taskString = task.processed.action_traces[0].console;
      // console.log("taskData:",taskString);
      // console.log(typeof taskString);//string
      // let taskJSON = JSON.parse(taskString);
      // taskJSON.main.description = taskJSON.description;

      // console.log(taskJSON.main);
      // console.log(taskJSON.main.author);
      // console.log("author.id=",taskJSON.main.author.id,"userName=",taskJSON.main.author.userName);
      
      // let testr = '{"main":{"id":6}}';
      // console.log([taskJSON.main,taskJSON.main])

      this.setState({
        tasks: [tasks], //jsonData.tasks
        newTask: false
      });
    });

    // EosComm Version:
    // EosComm.pushAction("selectatask",{author:"jackma",task_id:1}).then( taskData => {
    //   console.log("taskData:",taskData.processed.action_traces[0].console);//undefined???

    //   this.setState({
    //     tasks: jsonData.tasks, 
    //     newTask: false
    //   });
    // });

    // EosCommService Version:
    // EosService.connect().then(function(taskData){
    //   console.log("taskData:",taskData);//undefined???.processed.action_traces[0].console
    //   console.log("getVotes:",EosService.getVotes());
    // });
    // this.setState({
    //   tasks: jsonData.tasks, 
    //   newTask: false
    // });


    // cleos push action bh selectitems '["jackma","*","*","*"]' -p jackma@active
    // 调用后台API获取列表数据，并将返回的数据设置到state中
    // get(url.getTaskList()).then(data => {
    //   if (!data.error) {
    //     this.setState({
    //       tasks: data,
    //       newTask: false
    //     });
    //   }else{
    //     alert("获取任务出错，进入测试模式");
    //     this.setState({
    //       tasks: [
    //         { id: 1, title: "大家一起来讨论React吧", author:{id:1,username:"张三"}, updatedAt: "2017-09-01 10:00", vote: 0 ,content:"这里是第一个帖子的内容"},
    //         { id: 2, title: "前端框架，你最爱哪一个", author:{id:2,username:"李四"}, updatedAt: "2017-09-01 12:00", vote: 0 ,content:"这里是第2个帖子的内容"},
    //         { id: 3, title: "Web App的时代已经到来", author:{id:3,username:"王五"}, updatedAt: "2017-09-01 14:00", vote: 0 ,content:"这里是第③个帖子的内容"}
    //       ],
    //       newTask: false
    //     });
    //   }
    // });

    // EOSIOClient("zjubca-bounty").transaction("showinfo",{});
    // let EosClient = new EOSIOClient("bh");//zjubca-bounty
    // EosClient.transaction("showinfo",{});
  }
  
  
  // 保存帖子
  handleSave(data) {
    //为什么能直接得到帖子的data？看在被包装组件中，此被调用的实例
    // 当前登录用户的信息和默认的点赞数，同帖子的标题和内容，共同构成最终待保存的帖子对象
    //// const taskData = { ...data, author: {id:this.props.userId, userName:this.props.userName}, vote: 0 };
    // task(url.createTask(), taskData).then(data => {
    //   if (!data.error) {
    //     // 保存成功后，刷新帖子列表
    //     this.refreshTaskList();
    //   }else{
        alert("任务保存出错，进入测试模式");
        jsonData.tasks[++jsonData.tasks.length] = data;
        // var jsonToWrite = JSON.stringify(jsonData);
        // var fs = require('fs');
        // fs.writeFile('../testdata.json', jsonToWrite);
        this.refreshTaskList();
        // this.setState({
        //   tasks:[...this.state.tasks, taskData]
        // });
    //   }
    // });
  }
  
  // 取消新建帖子
  handleCancel() {
    this.setState({
      newTask: false
    });
  }
  
  // 新建帖子
  handleNewTask() {
    this.setState({
      newTask: true
    });
  }

  render() {
    const { userId,userName } = this.props;
    return (
      <div>
        {/* <EosComm /> */}
        <div id="header_wrap" className="outer">
          <div className="inner">
            <h1 id="project_title">赏金猎人</h1>
            <h2 id="project_tagline">ZJUBCA.Bounty</h2>
          </div>
        </div>

        <br/>

        <TaskFilter/>
        
        <div className="taskList">
          <div> 
            {/* 只有在登录状态，才显示发帖按钮 */}
            <br/>
            {userId ? <button onClick={this.handleNewTask}>发布任务悬赏</button> : null}
          </div>
          {/* 若当前正在创建新帖子，则渲染TaskEditor组件 */}
          {this.state.newTask ? (
            <TaskEditor 
            onSave={this.handleSave} 
            onCancel={this.handleCancel} 
            userId={userId} 
            userName={userName}
            currentTaskLength={this.state.tasks.length}
            />
          ) : null}
          {/* TasksView显示帖子的列表数据 */}
          <TasksView tasks={this.state.tasks} />
        </div>
      </div>
    );
  }
}

export default TaskList;