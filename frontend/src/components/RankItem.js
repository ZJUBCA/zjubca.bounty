import React, { Component } from "react";
// import "./css/RankItem.css";
import { ListGroup, Container, Row, Col, Form, Button, Image, Badge, Carousel } from 'react-bootstrap';

class RankItem extends Component{
    constructor(props) {
        super(props);
        this.state = {
           
            trAddSytle:{backgroundColor:'rgb(138, 132, 49)'},
            user: this.props.user
        }
        
        this.handleMouseOver=this.handleMouseOver.bind(this);
        this.handleMouseOut =this.handleMouseOut.bind(this);
    }

    handleMouseOver(){
        this.setState({
            trAddSytle:{backgroundColor:'rgb(201, 192, 77)'}
        });
    }
    handleMouseOut(){
        this.setState({
            trAddSytle:{backgroundColor:'rgb(138, 132, 49)'}
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
                className="RankItem" style={this.state.trAddSytle} 
                onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
                    <Row>
                        <Col className="rank" style={thAddStyle}>{user.rank}</Col>
                        {/* <span>{0}</span> */}
                        <Col className="username" style={thAddStyle}>{user.username}</Col>
                        <Col className="gpaplus" style={thAddStyle}>{user.gpaplus}</Col>
                        <Col className="totalbounty" style={thAddStyle}>{user.totalbounty}</Col>
                        <Col className="awscore" style={thAddStyle}>{user.awscore}</Col>
                    </Row>
                </ListGroup.Item>
            // </div>
        );
    }
    
    
}

export default RankItem;