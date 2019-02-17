import React, { Component } from "react";
import "./TaskItem.css";


class TaskItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,    // 任务是否处于编辑态
      task: props.task,
    };
    this.handleVote = this.handleVote.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
    // this.handleTaskChange = this.handleTaskChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // 父组件更新task后，更新TaskItem的state
    if (this.props.task !== nextProps.task) {
      this.setState({
        task: nextProps.task
      });
    }

  }

  // 处理点赞事件
  handleVote() {
    this.props.onVote(this.props.task.id);
    // var yesPic = document.getElementsByClassName("yesPic");
    // for(var i=0;i<yesPic.length;i++){
    //   yesPic[i].src = like2;
    // }
  }

  // 保存/编辑按钮点击后的逻辑
  handleEditTask() {
    const editing = this.state.editing;
    // 当前处于编辑态，调用父组件传递的onSave方法保存帖子
    if (editing) {
      this.props.onSave({
        ...this.state.task,
        date: this.getFormatDate()
      });
    }
    this.setState({
      editing: !editing
    });
  }

  // 处理标题textarea值的变化
  handleTaskChange(taskProps) {
    const newTask = { ...this.state.task};//, taskProps:newvalue
    switch(taskProps){
      case "title":
        newTask.title = this.t1.value;break;
      case "description":
        newTask.description = this.t2.value;break;
    }
    this.setState({
      task: newTask
    });
  }
  // handleTaskChange(event) {
  //   const newTask = { ...this.state.task, title:event.target.value};
  //   this.setState({
  //     task: newTask
  //   });
  // }
  
  // 显示日期格式化
  getFormatDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1 + "";
    month = month.length === 1 ? "0" + month : month;
    let day = date.getDate() + "";
    day = day.length === 1 ? "0" + day : day;
    let hour = date.getHours() + "";
    hour = hour.length === 1 ? "0" + hour : hour;
    let minute = date.getMinutes() + "";
    minute = minute.length === 1 ? "0" + minute : minute;
    return `${year}-${month}-${day} ${hour}:${minute}`;
  }

  render() {
    const { task } = this.state;
    var thecolor = "";
    switch(task.stage){
      case "Before Executing": 
        thecolor="#d6aa18";break;
      case "In Executing": 
        thecolor="green";break;
      case "After Executing": 
        thecolor="blue";break;
      case "Done": 
        thecolor="black";break;
    }
    const taskStatusStyle = {
      color: thecolor,
      fontSize: '15px',
      fontWeight:'bold'
    }
    return (
      <li className="item">
        <div className="title">
          {this.state.editing
            ? <form>
                <textarea
                  value={task.title}
                  onChange={this.handleTaskChange.bind(this,"title")}
                  ref={(textarea)=>{this.t1=textarea}}
                />
              </form>
            : task.title}
        </div>
        <div>
          任务描述：<span className="normalStats">
          {this.state.editing
            ? <form>
                <textarea
                  value={task.description}
                  onChange={this.handleTaskChange.bind(this,"description")}
                  ref={(textarea)=>{this.t2=textarea}}
                />
              </form>
            : task.description}</span>
        </div>
        <div>
          任务状态：<span className="taskStatus" style={taskStatusStyle} >{task.stage}</span>
        </div>
      
        <div>
          需要人数：<span className="normalStats">{task.rolenumbers}</span>
        </div>
        <div>
          奖励：<span className="normalStats">{task.reward}</span>   &nbsp;&nbsp;
          抵押：<span className="normalStats">{task.pledge}</span>
        </div>
        <div>
          最后编辑日期：<span className="normalStats">{task.date}</span>
        </div>
        <div className="like">
          <span>
            <img alt="vote" src={task.likePic} onClick={this.handleVote} className="yesPic"/>
          </span>
          <span>
            {task.vote}
          </span>
        </div>
        <div>
          <button onClick={this.handleEditTask}>
            {this.state.editing ? "保存" : "编辑"}
          </button>
        </div>
        
      </li>
    );
  }
}

export default TaskItem;
