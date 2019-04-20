import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import TaskItem from "./TaskItem";
import { ListGroup } from 'react-bootstrap';

class TasksView extends Component {
  render() {
    const { tasks } = this.props
    return (
      <ListGroup as="ul">
        {tasks.map(item => (
          // 使用Link组件包裹每一个TaskItem
          // <Link key={item.id} to={`/tasks/${item.id}`}>
            <TaskItem key={item.id} task={item} />
          // </Link>
        ))}
      </ListGroup>
    );
  }
}

export default TasksView;