import React, { Component } from "react";
// import "./css/RankItem.css";
import { ListGroup, Container, Row, Col, Form, Button, Image, Badge, Carousel } from 'react-bootstrap';

class RankItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
           
            trAddSytle:{backgroundColor:'rgb(255, 255, 255)'},
            user: this.props.user
        }
        
        this.handleMouseOver=this.handleMouseOver.bind(this);
        this.handleMouseOut =this.handleMouseOut.bind(this);
    }

    handleMouseOver(){
        this.setState({
            trAddSytle:{backgroundColor:'rgb(200, 200, 200)'}
        });
    }
    handleMouseOut(){
        this.setState({
            trAddSytle:{backgroundColor:'rgb(255, 255, 255)'}
        });
    }
    
    render(){
        const user = this.state.user;
        let thAddStyle={fontWeight:'normal'};
        if(this.state.user.username=="Username"){
            thAddStyle={fontWeight:'bold'}
        }

        return (
            // <div className="RankItem">
                <ListGroup.Item as="li" 
                className="RankItem" 
                style={this.state.trAddSytle} 
                onMouseOver={this.handleMouseOver} 
                onMouseOut={this.handleMouseOut}>
                    <Row style={{fontSize:"0.8rem"}} className="text-center">
                        <Col xs={1} style={thAddStyle} className="text-center"> {user.rank}</Col>
                        {/* className="rank" */}
                        {/* <span>{0}</span> */}
                        <Col xs={4} style={thAddStyle} className="text-center">  {user.username}</Col>
                        {/* className="username" */}
                        <Col xs={2} style={thAddStyle} className="text-center"> {user.gpaplus}</Col>
                        {/* class="float-right */}
                        <Col xs={3} className="totalbounty" style={thAddStyle}> {user.totalbounty}</Col>
                        <Col xs={1} className="awscore" style={thAddStyle}> {user.awscore}</Col>
                    </Row>
                </ListGroup.Item>
            // </div>
        );
    }
    
    
}

export default RankItem;