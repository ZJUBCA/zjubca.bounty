import React, { Component } from "react";
import { getFormatDate } from "../utils/date";
import ParticipantItem from "./ParticipantItem";
import "./css/TaskView.css";
import like from "../images/like.png";
import hate from "../images/hate.png";
import EosComm from "../service/EosComm";

class TaskView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task:this.props.task,
      bounty:[],//只有被更新的Bounty部分才会被添加
      checking:false
    };
    this.onCheckClick=this.onCheckClick.bind(this);
    this.onAdjustClick=this.onAdjustClick.bind(this);
    this.allocateBounty = this.allocateBounty.bind(this);

    this.eoscomm = new EosComm();
  }
// function TaskView(props) {

  shouldComponentUpdate(nextProps, nextState){
    console.log("allItem.bounty:",nextState.bounty);
    console.log("type:",typeof(nextState.bounty));
    return true;
  }

  onCheckClick(){
    this.props.onCheckClick(this.state.bounty);
  }

  onAdjustClick(){

  }

  allocateBounty(newBounty){
    // bounty [{ }, {disribution:xx, score:xx }]
    let oldBounty = false;
    let oldAllBounty = this.state.bounty
    for(let i =0 ;i<oldAllBounty.length; i++){
      if(newBounty.username == oldAllBounty[i].username){
        oldBounty = true;
        oldAllBounty[i] = {
          username:newBounty.username,
          distribution: newBounty.distribution,
          score: newBounty.score
        };
      }
    }
    if(oldBounty){
      this.setState({
        bounty:[...oldAllBounty]
      });
      
    }else{
      this.setState({
        bounty:[...this.state.bounty, newBounty]
      });

    }
    const taskId = this.state.task.id;
    let loginAlert = false;
    this.eoscomm.connectAndLogin(loginAlert).then(loginAccount=>{
        this.loginAccount = loginAccount;
        this.eoscomm.pushAction("allocateb",{author:loginAccount.name, task_id:taskId, 
          participantname:newBounty.username, 
          distribution:newBounty.distribution, score:newBounty.score});
    });
  }

  render(){

    const { deletable, editable, participable, withdrawable, checkable, adjustable, 
      onEditClick, onLikeClick, onHateClick, 
      onDeleteClick, onPaticipateClick, onWithdrawClick} = this.props;

    let task = this.state.task;
    let checking = this.state.checking;
    let thecolor = "";

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
            任务描述：<div ><span>{task.description}</span></div>
          </div>
          <div className="requireList">
            任务具体要求：<div >{task.requires}</div>
          </div>
        </div>
        
        <div>

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
                  {deletable ? (
                    <button className="delete" onClick={onDeleteClick}>删除任务</button>
                  ): null}
                  {participable ? (
                    <button className="participate" onClick={onPaticipateClick}>参加任务</button>
                  ): null}
                  {withdrawable?(
                    <button className="withdraw" onClick={onWithdrawClick}>退出任务</button>
                  ):null}
                  {checkable ? (
                    <button className="check" onClick={this.onCheckClick}>验收任务</button>
                  ): null}
                  {/* ()=>{checking=true;console.log("checking:",checking);} */}
                  {/* {checking ? (
                    <button className="checking" onClick={this.onCheckClick}>确定</button>
                  ): null} */}
                  {adjustable ? (
                    <button className="adjust" onClick={this.onAdjustClick}>最终微调</button>
                  ): null}
              </div>
              <div className="infoList">
                {/* {task.participants.username} */}
                {/* <ParticipantList participant={task.participants}/> */}
                <div >
                  &nbsp;&nbsp;参与者
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  预分配token
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  评分
                </div>

                {task.participants.map(item => (
                    <ParticipantItem key={item.username} participant={item} checkable={checkable} 
                    allocateBounty={this.allocateBounty}/>
                ))}
              </div>
        </div>
      </div>
      );
    }
}

export default TaskView;
