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
  
  const taskStatusStyle = {
    color: thecolor,
    fontSize: '15px',
    fontWeight:'bold'
  }

  return (
    <ListGroup.Item as="li" 
    className="taskItem" >
        <Nav.Link key={task.id} href={`/tasks/${task.id}`} style={{color:"black"}}>
        {/* <Link key={task.id} to={`/tasks/${task.id}`}> */}
          <Container className="taskInfo">
              <Row className="title"><Col>{task.title}</Col></Row>
              <Row>
                <Col>任务id：{task.id}</Col> 
                <Col>创建人：{task.participants[0].username}</Col>  
                {/* {task.author.username} */}
              </Row>
              <Row>
                <Col>最后编辑时间：{task.updatedat}</Col>
                {/* getFormatDate(task.updatedAt)*/}
              </Row>
              <Row>
                <Col>
                  任务状态：<Badge className="taskStatus" style={taskStatusStyle}>{task.status}</Badge>
                </Col>
              </Row>
              <Row>
                <Col className="normalStats">需要人数：{task.rolenumbers}</Col>
              </Row>
              <Row>
                <Col className="normalStats">奖励：{task.reward}</Col>   
                <Col className="normalStats">抵押：{task.pledge}</Col>
              </Row>
          </Container>
        </Nav.Link>
      <Container className="likeOrHate">
        <Row>
          <Col>
            <Image alt="likevote" src={like}/>&nbsp;&nbsp;
            <Badge variant="danger">{task.likevote}</Badge>&nbsp;&nbsp;
            <Image alt="hatevote" src={hate}/>&nbsp;&nbsp;
            <Badge variant="secondary">{task.hatevote}</Badge>&nbsp;&nbsp;
            <Badge>
              {parseInt(parseInt(task.likevote)/(parseInt(task.hatevote)+parseInt(task.likevote)) *100)}%
            </Badge>
          </Col>
        </Row>
          
      </Container>
    </ListGroup.Item>
  );
}

export default TaskItem;
