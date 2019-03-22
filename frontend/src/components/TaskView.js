import React from "react";
import { getFormatDate } from "../utils/date";
import "./css/TaskView.css";
import like from "../images/like.png";
import hate from "../images/hate.png";

function TaskView(props) {
  const { task, editable, onEditClick } = props;
  var thecolor = "";
  switch(task.status){
    case "Before Executing": 
      thecolor="#d6aa18";break;
    case "In Executing": 
      thecolor="green";break;
    case "After Executing": 
      thecolor="blue";break;
    case "Done": 
      thecolor="black";break;
    default:
      thecolor="#d6aa18";break;
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
          <span>{getFormatDate(task.updatedat)}</span>
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
          更新时间：<span>{getFormatDate(task.updatedat)}</span>
        </div>
        <div>
          任务状态：<span className="taskStatus" style={taskStatusStyle} >{task.status}</span>
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
      <div className="likeOrHate">
        <span>
          <img alt="likevote" src={like} />
        </span>
        <span>{task.likevote}</span>
        <span>
          <img alt="hatevote" src={hate} />
        </span>
        <span>{task.hatevote}</span>
        <span>{parseInt(task.likevote/(task.hatevote+task.likevote)*100)}%</span>
      </div>
    </div>
  );
}

export default TaskView;
