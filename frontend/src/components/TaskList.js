import React, { Component } from "react";
import TasksView from "./TasksView";
import TaskEditor from "./TaskEditor";
import { get, post } from "../utils/request";
import url from "../utils/url";
import "./TaskList.css";
import jsonData  from "../testdata.json";

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
  }

  componentDidMount() {
    this.refreshTaskList();
  }

  
  // 获取帖子列表
  refreshTaskList() {
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
    alert("获取任务出错，进入测试模式");
    this.setState({
      tasks: jsonData.tasks, 
      newTask: false
    });
  }
  
  // 保存帖子
  handleSave(data) {
    //为什么能直接得到帖子的data？看在被包装组件中，此被调用的实例
    // 当前登录用户的信息和默认的点赞数，同帖子的标题和内容，共同构成最终待保存的帖子对象
    //// const taskData = { ...data, author: {id:this.props.userId, username:this.props.username}, vote: 0 };
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
    const { userId,username } = this.props;
    return (
      <div>
        <div id="header_wrap" className="outer">
          <div className="inner">
            <h1 id="project_title">赏金猎人</h1>
            <h2 id="project_tagline">ZJUBCA.Bounty</h2>
          </div>
        </div>
        <br/>
        <div className="taskFilter">
          <select>
              <option value="taskName">任务名称</option>
              <option value="taskStatus" selected="selected">任务状态</option>
              <option value="taskAuthor">任务创建人</option>
              <option value="taskReward">任务奖励</option>
          </select>
          &nbsp; &nbsp; &nbsp; &nbsp;
          <select>
              <option value="equal" selected="selected">等于</option>
              <option value="bigger">大于</option>
              <option value="nosmaller">大于等于</option>
              <option value="smaller">小于</option>
              <option value="nobigger">小于等于</option>
          </select>
          &nbsp; &nbsp; &nbsp; &nbsp;
          <input type="text"  name="filtervalue" id="filtervalue" 
          placeholder="Before Executing"//作用是？？？
          // value={this.state.title}
          // onChange={this.handleChange}
          />
          &nbsp; &nbsp; &nbsp; &nbsp;
          <button>筛选</button>
        </div>
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
            username={username}
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