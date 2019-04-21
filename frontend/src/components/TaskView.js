import React, { Component } from "react";
import { getFormatDate } from "../utils/date";
import ParticipantItem from "./ParticipantItem";
// import "./css/TaskView.css";
import like from "../images/like.png";
import hate from "../images/hate.png";
import EosComm from "../service/EosComm";
import { Container, Row, Col, Form, Button, Image, Badge,ListGroup } from 'react-bootstrap';

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
    // this.onLikeClick = this.onLikeClick.bind(this);

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

  // onLikeClick(){
  //   this.setState({
  //     task:{
  //       id:this.state.task.id,
  //       participants:this.state.task.participants,
  //       updatedat:this.state.task.updatedat,
  //       status:this.state.task.status,
  //       rolenumbers:this.state.task.rolenumbers,
  //       reward:this.state.task.reward,
  //       pledge:this.state.task.pledge,
  //       description:this.state.task.description,
  //       requires:this.state.task.requires,
  //       likevote:this.state.task.likevote,
  //       hatevote:this.state.task.hatevote
  //     }
  //   });
  //   this.props.onLikeClick();
  // }

  render(){

    const { deletable, editable, participable, withdrawable, checkable, adjustable, 
      onEditClick, onLikeClick, onHateClick, 
      onDeleteClick, onPaticipateClick, onWithdrawClick} = this.props;

    let task = this.state.task;
    let thecolor = "";
    let thevariant = "primary";

    switch(task.status){
      case "Before Executing": 
        thecolor="blue";thevariant="primary";break;
      case "In Executing": 
        thecolor="green";thevariant="success";break;
      case "After Executing": 
        thecolor="#d6aa18";thevariant="warning";break;
      case "Done": 
        thecolor="black";thevariant="dark";break;
      default:
        thecolor="blue";thevariant="primary";break;
    }

    const taskStatusStyle = {
      variant: thevariant,
      color: thecolor,
      fontSize: '15px',
      fontWeight:'bold'
    }

    return (
      <Container className="taskView">

        <Container className="taskInfo">

          <Row className="mark">
            {/* <Col className="author">{task.participants[0].username}</Col>
            <Col>{getFormatDate(task.updatedat)}</Col> */}
            <h2>{task.title}</h2>
            {editable ? (
              <Col>
                <Button onClick={onEditClick}>编辑</Button>
              </Col>
            ) : <Col></Col>}
          </Row>

          <Row>
            <Col className="normalStats">任务id：{task.id}</Col>  
          </Row>
          <Row>
            <Col className="normalStats">创建人：{task.participants[0].username}</Col>
            {/* {task.participants[0].username} */}
          </Row>

          <Row>
            <Col className="normalStats">更新时间：{getFormatDate(task.updatedat)}</Col>
          </Row>
          <Row>
            <Col>任务状态：<Badge className="taskStatus" style={taskStatusStyle}>{task.status}</Badge></Col>
          </Row>
          <Row>
            <Col className="normalStats">需要人数：{task.rolenumbers}</Col>
          </Row>
          <Row>
            <Col className="normalStats">奖励： {task.reward}</Col>   
          </Row>
          <Row>
            <Col className="normalStats">抵押： {task.pledge}</Col>
          </Row>
          <br/>
          <Container className="description">
            <Row>任务描述：<br/> {task.description}</Row>
          </Container>
          <br/>
          <Container className="requireList">
            <Row>任务具体要求：<br/> {task.requires}</Row>
          </Container>
          <br/>
          <Row className="likeOrHate">
            <Col>
              <Image alt="likevote" src={like} onClick={onLikeClick}/>&nbsp;&nbsp;
              <Badge variant="danger">{task.likevote}</Badge>&nbsp;&nbsp;
              <Image alt="hatevote" src={hate} onClick={onHateClick}/>&nbsp;&nbsp;
              <Badge variant="secondary">{task.hatevote}</Badge>&nbsp;&nbsp;
              <Badge variant="light">
                {parseInt(parseInt(task.likevote)/(parseInt(task.hatevote)+parseInt(task.likevote)) *100)}%
              </Badge>
            </Col>
          </Row>

        </Container>
        
        <br/>
        <Container className="participantList">
          <Row className="operationButton">
            
              {deletable ? (
                <Col>
                  <Button className="delete" onClick={onDeleteClick} variant="danger">
                    删除任务
                  </Button>
                </Col>
              ): null}
            
              {participable ? (
                <Col>
                  <Button className="participate" onClick={onPaticipateClick} variant="success">
                    参加任务
                  </Button>
                </Col>
              ): null}
            
              {withdrawable?(
                <Col>
                  <Button className="withdraw" onClick={onWithdrawClick} variant="secondary">
                    退出任务
                  </Button>
                </Col>
              ):null}
            
              {checkable ? (
                <Col>
                  <Button className="check" onClick={this.onCheckClick}  variant="warning">
                    验收任务
                  </Button>
                </Col>
              ): null}
            
              {adjustable ? (
                <Col>
                  <Button className="adjust" onClick={this.onAdjustClick} variant="dark">
                    最终微调
                  </Button>
                </Col>
              ): null}
            
          </Row>
          <br/>
          <h4>
            已参加任务的成员列表
          </h4>
         
          <ListGroup as="ul" className="infoList">
              <div>
              <ListGroup.Item as="li" 
              style={{ paddingLeft: 0, paddingRight: 0,margin:0 }} >
                <Form as={Row} style={{fontSize:"0.8rem"}}>
                {/* ,borderWidth:0.5,borderColor:"black" */}
                  <Col xs={4} className="text-center">参与者</Col>
                  <Col xs={3} className="text-center">预分配token</Col>
                  <Col xs={3} className="text-center">评分</Col>
                  <Col xs={2} className="text-center">**</Col>
                </Form>
              </ListGroup.Item>
              </div>
            {task.participants.map(item => (
                <ParticipantItem key={item.username} participant={item} checkable={checkable} 
                allocateBounty={this.allocateBounty}/>
            ))}
          </ListGroup>
          
        </Container>
      </Container>
      );
    }
}

export default TaskView;
