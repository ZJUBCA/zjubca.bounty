import React, { Component } from 'react';
// import { Link } from "react-router-dom";
import TaskItem from "./TaskItem";

class TasksView extends Component {
  render() {
    const { tasks } = this.props
    return (
      <ul>
        {tasks.map(item => (
          // 使用Link组件包裹每一个TaskItem
          // <Link key={item.id} to={`/tasks/${item.id}`}>
            <TaskItem task={item} />
          // </Link>
        ))}
      </ul>
    );
  }
}

export default TasksView;