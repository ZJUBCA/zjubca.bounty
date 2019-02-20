import React from "react";
import { getFormatDate } from "../utils/date";
import "./TaskItem.css";
import like from "../images/like.png";

function TaskItem(props) {
  const { task } = props;
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
    <li className="taskItem">
      <div className="title">{task.title}</div>
      <div>
        任务id： <span>{task.id}</span>  &nbsp;&nbsp;
        创建人：<span>{task.author.username}</span>  
      </div>
      <div>
        最后编辑时间：<span>{task.updatedAt}</span>
        {/* getFormatDate(task.updatedAt)*/}
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

      <div className="like">
        <span>
          <img alt="vote" src={like} />
        </span>
        <span>{task.vote}</span>
      </div>
    </li>
  );
}

export default TaskItem;
