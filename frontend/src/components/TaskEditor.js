import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
// import "./css/TaskEditor.css";

class TaskEditor extends Component {
  constructor(props) {
    super(props);
    const { task } = this.props;
    this.state = {
      title: (task && task.title) || "", 
      rolenumbers: (task && task.rolenumbers) || "",
      reward: (task && task.reward) || "",
      pledge: (task && task.pledge) || "",
      status: (task && task.status) || "Before Executing", 
      description: (task && task.description) || "",
      requires : (task && task.requires) || ""
    };
    this.handleCancelClick = this.handleCancelClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // 处理任务的编辑信息
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
  
  // 取消任务的编辑
  handleCancelClick() {
    this.props.onCancel();
  }
  
  // 保存任务
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
      <Container className="taskEditor">
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            任务标题:
          </Form.Label>
          <Col>
            <Form.Control 
              type="text"
              name="title"
              placeholder="任务标题"
              value={this.state.title}
              onChange={this.handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            需要人数:
          </Form.Label>
          <Col>
            <Form.Control 
              type="text"
              name="rolenumbers"
              placeholder="需要人数"
              value={this.state.rolenumbers}
              onChange={this.handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            任务奖励:
          </Form.Label>
          <Col>
            <Form.Control 
              type="text"
              name="reward"
              placeholder="任务奖励"
              value={this.state.reward}
              onChange={this.handleChange}
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            任务抵押:
          </Form.Label>
          <Col>
            <Form.Control 
              type="text"
              name="pledge"
              placeholder="任务抵押"
              value={this.state.pledge}
              onChange={this.handleChange}
            />
          </Col>  
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            任务状态:
          </Form.Label>
          <Col>
            <Form.Control  
              as="select"
              name="status"
              value={this.state.status}
              onChange={this.handleChange}>
                    <option value="Before Executing">Before Executing</option>
                    <option value="In Executing">In Executing</option>
                    <option value="After Executing">After Executing</option>
                    <option value="Done">Done</option>
            </Form.Control >
          </Col>  
        </Form.Group>

        <Form.Group >
          <Form.Label column sm={2}>
            任务描述:
          </Form.Label>
          <Form.Control 
            as="textarea"
            name="description"//原来是通过name来区分发生内容的。
            placeholder="任务描述"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group >
          <Form.Label column sm={2}>
            任务具体要求:
          </Form.Label>
          <Form.Control 
            as="textarea"
            name="requires"//原来是通过name来区分发生内容的。
            placeholder="任务具体要求"
            value={this.state.requires}
            onChange={this.handleChange}
          />
        </Form.Group>

        <Button 
        onClick={this.handleCancelClick}
        variant="outline-secondary"
        >取消</Button>&nbsp;&nbsp;&nbsp;
        
        <Button onClick={this.handleSaveClick}>保存</Button>
      </Container>
    );
  }
}

export default TaskEditor;
