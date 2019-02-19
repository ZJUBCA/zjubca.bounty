import React, { Component } from "react";
import TaskEditor from "./TaskEditor";
import TaskView from "./TaskView";
import CommentList from "./CommentList";
import { get, put, post } from "../utils/request";
import url from "../utils/url";
import "./Task.css";
import tasksJsonData  from "../tasks.json";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: null,
      comments: [],
      editing: false
    };
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);
    this.handleTaskSave = this.handleTaskSave.bind(this);
    this.handleTaskCancel = this.handleTaskCancel.bind(this);
    this.refreshComments = this.refreshComments.bind(this);
    this.refreshTask = this.refreshTask.bind(this);
  }

  componentDidMount() {
    this.refreshComments();
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
        alert("获取帖子详情出错，进入测试模式");
        this.setState({
          task: taskData
        });
    // }
    // });
  }

  // 获取评论列表
  refreshComments() {
    const taskId = this.props.match.params.id;
    var commentsData = tasksJsonData.comments;
    // get(url.getCommentList(taskId)).then(data => {
    //   if (!data.error) {
    //     this.setState({
    //       comments: data
    //     });
    //   }else{
        alert("获取评论列表出错，进入测试模式");
        this.setState({
          comments: commentsData
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

  // 提交新建的评论
  handleCommentSubmit(content) {
    const taskId = this.props.match.params.id;
    const comment = {
      author: this.props.userId,
      task: taskId,
      content: content
    };
    this.saveComment(comment);
  }

  // 保存新的评论到服务器
  saveComment(comment) {
    post(url.createComment(), comment).then(data => {
      if (!data.error) {
        this.refreshComments();
      }else{
        alert("保存新评论出错，进入测试模式");
        this.setState({
          comments: [...this.state.comments, comment]
        });
      }
    });
  }

  // 同步帖子的修改到服务器
  saveTask(id, task) {
    put(url.updateTask(id), task).then(data => {
      if (!data.error) {
        /* 因为返回的帖子对象只有author的id信息，
         * 所有需要额外把完整的author信息合并到帖子对象中 */
        const newTask = { ...data, author: this.state.task.author };
        this.setState({
          task: newTask,
          editing: false
        });
      }else{
        alert("保存详情修改出错，进入测试模式");
        const newTask= { ...this.state.task, ...task};
        this.setState({
          task: newTask,
          editing: false
        });
      }
    });
  }

  render() {
    const { task, comments, editing } = this.state;
    const { userId } = this.props;
    if (!task) {
      return null;
    }
    const editable = userId == task.author.id;//===
    return (
      <div className="task">
        {editing ? (
          <TaskEditor
            task={task}
            onSave={this.handleTaskSave}
            onCancel={this.handleTaskCancel}
          />
        ) : (
          <TaskView
            task={task}
            editable={editable}
            onEditClick={this.handleEditClick}
          />
        )}
        <CommentList
          comments={comments}
          editable={Boolean(userId)}
          onSubmit={this.handleCommentSubmit}
        />
      </div>
    );
  }
}

export default Task;
