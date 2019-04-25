import React, { Component } from "react";
import { Link } from "react-router-dom";
// import "./css/Header.css";
import { Navbar, Nav, Button, Col, Row } from 'react-bootstrap';

class Header extends Component {
  render() {
    const { userName, onLogout, location, myRank, myGPAPlus } = this.props;
    console.log(this.props);
    return (
      <Navbar  fixed="top" bg="dark" variant="dark" className="header">
        <Navbar.Brand href="/">首页</Navbar.Brand>
          <Nav className="nav">
            <Link to="/ranklist">排行榜</Link>
            
            {/* <span className="left-link">
              <Link to="/">首页</Link>&nbsp;&nbsp;&nbsp;
              <Link to={{ pathname: "/ranklist", state: { from: location } }}>排行榜</Link>
            </span> */}
          </Nav>
          <Navbar.Collapse className="justify-content-end">
            {/* <div className="mr-sm-2"> */}
              {/* <Col >
              </Col> */}
              {userName && userName.length > 0 ? (
                <Navbar.Text as={Row} style={{fontSize:"0.5rem"}}>
                {/* className="user" */}
                  <Col>
                    <Row>
                      <Col className="text-center">
                        <Navbar.Text>⭐️&nbsp;&nbsp;{userName}</Navbar.Text>&nbsp;&nbsp;
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-center">
                        { myRank != -1 ? (
                          <Navbar.Text>
                            &nbsp;&nbsp; Rank: {myRank}
                          </Navbar.Text>) : null
                        }
                        { myGPAPlus != -1?(
                          <Navbar.Text>
                            &nbsp;&nbsp;| GPAPlus: {myGPAPlus}
                          </Navbar.Text>):<Button 
                                            onClick={onLogout} 
                                            variant="outline-warning" 
                                            style={{fontSize:"0.5rem"}} 
                                            size="sm">关于</Button>
                        }
                      </Col>
                    </Row>
                  </Col>
                  {/* <Col>
                  
                  </Col> */}
                </Navbar.Text>
                
              ) : (
                <Navbar.Text className="right-link">
                  当前未连接到钱包
                </Navbar.Text>
              )}
              
            {/* </div> */}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default Header;
