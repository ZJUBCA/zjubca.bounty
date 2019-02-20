import React from "react";
import { getFormatDate } from "../utils/date";
import "./TaskView.css";
import like from "../images/like.png";

function TaskView(props) {
  const { task, editable, onEditClick } = props;
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
        <div>
          创建人：<span>{task.author.username}</span>
        </div>
        <div>
          更新时间：<span>{getFormatDate(task.updatedAt)}</span>
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
        <br/>
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
