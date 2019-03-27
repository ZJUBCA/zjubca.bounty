import React, { Component } from "react";
import "./css/TaskEditor.css";

class TaskEditor extends Component {
  constructor(props) {
    super(props);
    const { task } = this.props;
    this.state = {
      title: (task && task.title) || "", 
      rolenumbers: (task && task.rolenumbers) || "",
      reward: (task && task.reward) || "",
      pledge: (task && task.pledge) || "",
      status: (task && task.status) || "", 
      description: (task && task.description) || "",
      requires : (task && task.requires) || ""
    };
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // 处理帖子的编辑信息
  handleChange(e) {
    const name = e.target.name;
    if (name === "title") {//原来是通过name来区分发生内容的。
      this.setState({
        title: e.target.value
      });
    } else if (name === "description") {
      this.setState({
        description: e.target.value
      });
    } else if (name === "rolenumbers") {
      this.setState({
        rolenumbers: e.target.value
      });
    } else if (name === "reward") {
      this.setState({
        reward: e.target.value
      });
    } else if (name === "pledge") {
      this.setState({
        pledge: e.target.value
      });
    } else if (name === "requires") {
      this.setState({
        requires: e.target.value
      });
    } else if (name === "status") {
      this.setState({
        status: e.target.value
      });
    } 
    else {
    }
  }
  
  // 取消帖子的编辑
  handleCancelClick() {
    this.props.onCancel();
  }
  
  // 保存帖子
  handleSaveClick() {
    var currentTime = (new Date()).toString().slice(11,15)+"-"
    +(new Date()).toString().slice(4,10)+" "+(new Date()).toString().slice(16,21);
    const data = {
      id: !this.props.task ? this.props.currentTaskLength+1 : this.props.task.id,
      title: this.state.title,
      author: {userName:this.props.userName},//id:this.props.userId,
      status: this.state.status,//"Before Executing",
      rolenumbers: this.state.rolenumbers,
      reward: this.state.reward,
      pledge: this.state.pledge,
      likevote: "0",
      hatevote: "0",
      requires: this.state.requires,
      updatedat: currentTime,
      description: this.state.description
    };
    // 调用父组件的回调函数执行真正的保存逻辑
    this.props.onSave(data);
  }

  render() {
    return (
      <div className="taskEditor">
        任务标题:&nbsp;&nbsp;<input
          type="text"
          name="title"//原来是通过name来区分发生内容的。
          placeholder="任务标题"//作用是？？？
          value={this.state.title}
          onChange={this.handleChange}
        />
        需要人数:&nbsp;&nbsp;<input
          type="text"
          name="rolenumbers"
          placeholder="需要人数"
          value={this.state.rolenumbers}
          onChange={this.handleChange}
        />
        任务奖励:&nbsp;&nbsp;<input
          type="text"
          name="reward"
          placeholder="任务奖励"
          value={this.state.reward}
          onChange={this.handleChange}
        />
        任务抵押:&nbsp;&nbsp;<input
          type="text"
          name="pledge"
          placeholder="任务抵押"
          value={this.state.pledge}
          onChange={this.handleChange}
        />
        任务状态:&nbsp;&nbsp;<select 
          name="status"
          value={this.state.status}
          onChange={this.handleChange}>
                <option value="Before Executing">Before Executing</option>
                <option value="In Executing">In Executing</option>
                <option value="After Executing">After Executing</option>
                <option value="Done">Done</option>
        </select><br/>
        任务描述:<textarea
          name="description"//原来是通过name来区分发生内容的。
          placeholder="任务描述"
          value={this.state.description}
          onChange={this.handleChange}
        />
        任务具体要求:<textarea
          name="requires"//原来是通过name来区分发生内容的。
          placeholder="任务具体要求"
          value={this.state.requires}
          onChange={this.handleChange}
        />
        <button onClick={this.handleCancelClick}>取消</button>
        <button onClick={this.handleSaveClick}>保存</button>
      </div>
    );
  }
}

export default TaskEditor;
