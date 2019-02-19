import React, { Component } from "react";
import "./TaskEditor.css";

class TaskEditor extends Component {
  constructor(props) {
    super(props);
    const { task } = this.props;
    this.state = {
      title: (task && task.title) || "",
      content: (task && task.content) || ""
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
    } else if (name === "content") {
      this.setState({
        content: e.target.value
      });
    } else {
    }
  }
  
  // 取消帖子的编辑
  handleCancelClick() {
    this.props.onCancel();
  }
  
  // 保存帖子
  handleSaveClick() {
    const data = {
      title: this.state.title,
      content: this.state.content
    };
    // 调用父组件的回调函数执行真正的保存逻辑
    this.props.onSave(data);
  }

  render() {
    return (
      <div className="taskEditor">
        <input
          type="text"
          name="title"//原来是通过name来区分发生内容的。
          placeholder="标题"//作用是？？？
          value={this.state.title}
          onChange={this.handleChange}
        />
        <textarea
          name="content"//原来是通过name来区分发生内容的。
          placeholder="内容"
          value={this.state.content}
          onChange={this.handleChange}
        />
        <button onClick={this.handleCancelClick}>取消</button>
        <button onClick={this.handleSaveClick}>保存</button>
      </div>
    );
  }
}

export default TaskEditor;
