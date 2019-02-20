import React, { Component } from "react";
import RequiresView from "./RequiresView";
import "./RequireList.css";

class RequireList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // 处理新评论内容的变化
  handleChange(e) {
    this.setState({
      value: e.target.value
    });
  }
 
  // 保存新评论 
  handleClick(e) {
    const content = this.state.value;
    if (content.length > 0) {
      this.props.onSubmit(this.state.value);
      this.setState({
        value: ""
      });
    } else {
      alert("具体要求内容不能为空！");
    }
  }

  render() {
    const { requires, editable } = this.props;

    return (
      <div className="requireList">
        <div className="title">任务具体要求列表</div>
        <RequiresView requires={requires} />
        {editable ? (
          <div className="editor">
            <textarea
              placeholder="添加此任务的具体要求条目"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <button onClick={this.handleClick}>提交</button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default RequireList;
