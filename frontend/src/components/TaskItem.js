import React from "react";
import { Link } from "react-router-dom";
// import { getFormatDate } from "../utils/date";
import "./css/TaskItem.css";
import like from "../images/like.png";
import hate from "../images/hate.png";

function TaskItem(props) {
  const { task } = props;
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
    <li className="taskItem">
        <Link key={task.id} to={`/tasks/${task.id}`}>
          <div className="taskInfo">
              <div className="title">{task.title}</div>
              <div>
                任务id： <span>{task.id}</span>  &nbsp;&nbsp;
                创建人：<span>{task.author.username}</span>  
              </div>
              <div>
                最后编辑时间：<span>{task.updatedat}</span>
                {/* getFormatDate(task.updatedAt)*/}
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
          </div>
        </Link>
      <div className="likeOrHate">
          <span>
            <img alt="likevote" src={like} />
          </span>
          <span>{task.likevote}</span>
          <span>
            <img alt="hatevote" src={hate} />
          </span>
          <span>{task.hatevote}</span>
          <span>{parseInt(parseInt(task.likevote)/(parseInt(task.hatevote)+parseInt(task.likevote)) *100)}%</span>
      </div>
    </li>
  );
}

export default TaskItem;
