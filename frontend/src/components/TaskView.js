import React from "react";
import { getFormatDate } from "../utils/date";
import ParticipantList from "./ParticipantList";
import "./css/TaskView.css";
import like from "../images/like.png";
import hate from "../images/hate.png";

function TaskView(props) {
  const { task, editable, participable, checkable, onEditClick, onLikeClick, onHateClick } = props;
  var thecolor = "";
  switch(task.status){
    case "Before Executing": 
      thecolor="blue";break;
    case "In Executing": 
      thecolor="green";break;
    case "After Executing": 
      thecolor="#d6aa18";break;
    case "Done": 
      thecolor="black";break;
    default:
      thecolor="blue";break;
  }
  const taskStatusStyle = {
    color: thecolor,
    fontSize: '15px',
    fontWeight:'bold'
  }
  return (
    <div className="taskView">
      <div className="taskInfo">
        <h2>{task.title}</h2>
        <div className="mark">
          <span className="author">{task.author.username}</span>
          <span> · </span>
          <span>{getFormatDate(task.updatedat)}</span>
          {editable ? (
            <span>
              ·<button onClick={onEditClick}>编辑</button>
            </span>
          ) : null}
        </div>
        <div>
          任务id： <span className="normalStats">{task.id}</span>  &nbsp;&nbsp;
          创建人：<span className="normalStats">{task.author.username}</span>
        </div>
        <div>
          更新时间：<span className="normalStats">{getFormatDate(task.updatedat)}</span>
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
        <div className="description">
          任务描述：<div >{task.description}</div>
        </div>
        <div className="requireList">
          任务具体要求：<div >{task.requires}</div>
        </div>
      </div>

      <div className="likeOrHate">
        <span>
          <img alt="likevote" src={like} onClick={onLikeClick}/>
        </span>
        <span>{task.likevote}</span>
        <span>
          <img alt="hatevote" src={hate} onClick={onHateClick}/>
        </span>
        <span>{task.hatevote}</span>
        <span>{parseInt(parseInt(task.likevote)/(parseInt(task.hatevote)+parseInt(task.likevote)) *100)}%</span>
      </div>
      
      <div className="participantList">
            已参加任务的成员列表
            <div className="operationButton">
                {participable ? (
                  <button className="participate" onClick={onEditClick}>参加任务</button>
                ): null}
                {checkable ? (
                  <button className="check" onClick={onEditClick}>验收任务</button>
                ): null}
            </div>
            <div className="infoList">
              {/* {task.participants.username} */}
              <ParticipantList participant={task.participants}/>
                {/* {task.participants.map(item => (
                    <ParticipantList key={item.username} participant={item} />
                ))} */}
            </div>
      </div>
    </div>
  );
}

export default TaskView;
