import React from "react";
import { Link } from "react-router-dom";
// import "./css/TaskItem.css";
import like from "../images/like.png";
import hate from "../images/hate.png";
import { ListGroup, Container, Badge, Row, Col, Image, Nav } from 'react-bootstrap';
// import { getFormatDate } from "../utils/date";

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
  
  const fontsize = "0.8rem";
  const taskStatusStyle = {
    color: thecolor,
    fontSize: fontsize,
    fontWeight:'bold'
  }
  
  return (
    <ListGroup.Item as="li" 
    className="taskItem" >
        <Link key={task.id} to={`/tasks/${task.id}`} style={{color:"black"}}>
        {/* <Link key={task.id} to={`/tasks/${task.id}`}> */}
          <Container className="taskInfo" >
              <Row className="title">
                <Col><h6>{task.id}.{task.title}</h6></Col>
              </Row>
              {/* <Row>
              <Col>任务id：{task.id}</Col>
              </Row> */}
              <Row>
                <Col style={{fontSize:fontsize}}>创建人：{task.participants[0].username}</Col>  
                {/* {task.author.username} */}
              </Row>
              <Row>
                <Col style={{fontSize:fontsize}}>最后编辑：{task.updatedat}</Col>
                {/* getFormatDate(task.updatedAt) */}
              </Row>
              <Row>
                <Col style={{fontSize:fontsize}}>
                  任务状态：<Badge className="taskStatus" style={taskStatusStyle}>{task.status}</Badge>
                </Col>
              </Row>
              <Row>
                <Col className="normalStats" style={{fontSize:fontsize}}>需要人数：{task.rolenumbers}</Col>
              </Row>
              <Row>
                <Col className="normalStats" style={{fontSize:fontsize}}>奖励：{task.reward}</Col>   
              </Row> 
              <Row>
                <Col className="normalStats" style={{fontSize:fontsize}}>抵押：{task.pledge}</Col>
              </Row>
          </Container>
        </Link>
      <Container className="likeOrHate">
        <Row>
          <Col style={{fontSize:fontsize}}>
            <Image alt="likevote" src={like} style={{fontSize:fontsize}}/>&nbsp;&nbsp;
            <Badge variant="danger" style={{fontSize:fontsize}}>
              {task.likevote}
            </Badge>&nbsp;&nbsp;
            <Image alt="hatevote" src={hate}/>&nbsp;&nbsp;
            <Badge variant="secondary" style={{fontSize:fontsize}}>{task.hatevote}</Badge>&nbsp;&nbsp;
            <Badge style={{fontSize:fontsize}}>
              {parseInt(parseInt(task.likevote)/(parseInt(task.hatevote)+parseInt(task.likevote)) *100)}%
            </Badge>
          </Col>
        </Row>
          
      </Container>
    </ListGroup.Item>
  );
}

export default TaskItem;
