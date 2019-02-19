import React from "react";
import { getFormatDate } from "../utils/date";
import "./TaskView.css";
import like from "../images/like.png";

function TaskView(props) {
  const { task, editable, onEditClick } = props;
  return (
    <div className="taskView">
      <div>
        <h2>{task.title}</h2>
        <div className="mark">
          <span className="author">{task.author.username}</span>
          <span>·</span>
          <span>{getFormatDate(task.updatedAt)}</span>
          {editable ? (
            <span>
              ·<button onClick={onEditClick}>编辑</button>
            </span>
          ) : null}
        </div>
        <div className="description">{task.description}</div>
      </div>
      <div className="vote">
        <span>
          <img alt="vote" src={like} />
        </span>
        <span>{task.vote}</span>
      </div>
    </div>
  );
}

export default TaskView;
