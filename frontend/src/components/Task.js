import React, { Component } from "react";
import TaskEditor from "./TaskEditor";
import TaskView from "./TaskView";
import RequireList from "./RequireList";
import { get, put, post } from "../utils/request";
import url from "../utils/url";
import "./Task.css";
import tasksJsonData  from "../tasks.json";

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
    this.refreshRequires();
    this.refreshTask();
  }

  // 获取帖子详情
  refreshTask() {
    const taskId = this.props.match.params.id;
    var taskData = tasksJsonData.tasks[taskId-1];
    // get(url.getTaskById(taskId)).then(data => {
    //   if (!data.error && data.length === 1) {
    //     this.setState({
    //       task: data[0]
    //     });
    //   }else{
        alert("获取任务详情出错，进入测试模式");
        this.setState({
          task: taskData
        });
    // }
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
    //     const newTask = { ...data, author: this.state.task.author };//{id:this.props.userId,username:this.props.username}
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
    const taskId = this.props.match.params.id;
    const require = {
      author: {id:this.props.userId, username:this.props.username},
      task: taskId,
      content: content
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
    const { userId,username } = this.props; //???
    if (!task) {
      return (
        <div>
          <br/>
          &nbsp;&nbsp;&nbsp;&nbsp;抱歉，所请求的任务无法通过JSON文件获取。
          <br/>
          <br/>
        </div>
      );
    }
    const editable = userId == task.author.id;  //===
    return (
      <div className="task">
        {editing ? (
          <TaskEditor
            task={task}
            onSave={this.handleTaskSave}
            onCancel={this.handleTaskCancel}
            userId={userId}
            username={username}
          />
        ) : (
          <TaskView
            task={task}
            editable={editable}
            onEditClick={this.handleEditClick}
          />
        )}
        <RequireList
          requires={requires}
          editable={Boolean(userId)}
          onSubmit={this.handleRequireSubmit}
        />
      </div>
    );
  }
}

export default Task;
