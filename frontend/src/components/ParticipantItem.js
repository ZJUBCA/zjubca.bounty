import React, { Component } from "react";
// import "./css/ParticipantItem.css";
import { Container, Row, Col, Form, Button, ListGroup } from 'react-bootstrap';


class ParticipantItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
            username: this.props.participant.username,
            distribution: this.props.participant.distribution,//"0 ZJUBCA",
            score: this.props.participant.score//"0 分"
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitAllocate = this.submitAllocate.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        if (name === "distribution") {//原来是通过name来区分发生内容的。
          this.setState({
            distribution: e.target.value
          });
          // console.log("this.state:",this.state);
          // this.props.allocateBounty(this.state);
          // this.props.allocateBounty({disribution:e.target.value});
        } else if (name === "score") {
          this.setState({
            score: e.target.value
          });
          // console.log("this.state:",this.state);
          // this.props.allocateBounty(this.state);
          // this.props.allocateBounty({score:e.target.value});
        } 
        else {
        }
        
    }
    
    submitAllocate(){
      this.props.allocateBounty(this.state);
      console.log("Partitem.state:",this.state);
    }

    render(){
        return (
            <div
            className="ParticipantView">
               
                {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                {this.props.checkable?(
                  <ListGroup.Item as="li" 
                  style={{fontSize:"0.8rem"}}
                  className="ParticipantView">
                  <Form as={Row}>
                    <Col xs={4}>
                      {/* <Form.Label size="sm"> */}
                        {this.props.participant.username}
                      {/* </Form.Label> */}
                    </Col>
                    <Col  xs={3}>
                        <Form.Control 
                        size="sm"
                        // className="text-center"
                        style={{fontSize:"0.8rem"}}
                        type="text"
                        name="distribution"
                        placeholder="token分配"
                        value={this.state.distribution}
                        onChange={this.handleChange}
                        />
                    </Col>
                    <Col xs={3}>
                      <Form.Control 
                      size="sm"
                      style={{fontSize:"0.8rem"}}
                      type="text"
                      name="score"
                      placeholder="评分，最高10分"
                      value={this.state.score}
                      onChange={this.handleChange}
                      />
                    </Col>
                    <Col xs={2}>
                        <Button 
                          variant="outline-dark"
                          style={{fontSize:"0.5rem"}}
                          size="sm"
                          onClick={this.submitAllocate}>
                          ok
                        </Button>
                    </Col>
                  </Form>
                  </ListGroup.Item>
                ):( <Form as={Row} className="ParticipantView"><Col>
                  {this.props.participant.username}
                </Col> <Col></Col> <Col></Col> <Col></Col></Form>)}

                {/* 将null改为只能显示的面板 */}
            </div>
        );
    }
    
    
}

export default ParticipantItem;