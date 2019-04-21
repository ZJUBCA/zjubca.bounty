import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Image, Badge, Navbar, Nav } from 'react-bootstrap';

class Footer extends Component {
    constructor(props) {
      super(props);
    }
    
    render(){
        return (
        <Navbar fixed="bottom" className="outer" bg="dark" variant="dark">
            {/* id="footer_wrap"  fixed="bottom" */}
            <Navbar.Collapse className="justify-content-end">
                <Container className="inner" style={{fontSize:"0.5rem"}}>
                    <Row className="copyright1">
                        <Col>
                            <Navbar.Text>© 2019 ZJU BlockChain Association</Navbar.Text>
                            <Navbar.Text>浙江大学区块链协会</Navbar.Text>
                        </Col>
                    </Row>
                    {/* <Row className="copyright2">
                        <Col>
                            
                        </Col>
                    </Row> */}
                    <Row>
                        <Col>
                            <Nav>
                                <Navbar.Text>Related Links:</Navbar.Text>
                                <Nav.Link href="https://github.com/Blockchain-zju"> ZJUBCA GitHub </Nav.Link> 
                                    <Navbar.Text>|</Navbar.Text>
                                <Nav.Link href="https://toolkit.zjubca.org/"> ZJUBCA.EOS TOOLKIT </Nav.Link> 
                                    <Navbar.Text>|</Navbar.Text>
                                <Nav.Link href="https://docs.zjubca.org"> ZJUBCA. DOCS </Nav.Link> 
                            </Nav>
                        </Col>
                    </Row>
                </Container>
            </Navbar.Collapse>
        </Navbar>
        )
    }
}

export default Footer