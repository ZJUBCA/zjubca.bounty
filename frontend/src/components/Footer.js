import React, { Component } from "react";
import { Container, Row, Col, Form, Button, Image, Badge, Navbar, Nav } from 'react-bootstrap';

class Footer extends Component {
    constructor(props) {
      super(props);
    }
    
    render(){
        return (
        <Navbar fixed="bottom" className="outer" bg="dark" variant="dark">
            {/* id="footer_wrap"  */}
            <Navbar.Collapse className="justify-content-end">
                <Container className="inner">
                    <Row className="copyright">
                        <Col>
                            <Navbar.Text>© 2019 ZJU BlockChain Association 浙江大学区块链协会</Navbar.Text>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Nav>
                                <Navbar.Text>Related Links:</Navbar.Text>
                                <Nav.Link href="https://github.com/Blockchain-zju"> ZJU BlockChain Association GitHub </Nav.Link> 
                                    <Navbar.Text>|</Navbar.Text>
                                <Nav.Link href="https://toolkit.zjubca.org/"> ZJUBCA.EOS TOOLKIT </Nav.Link> 
                                    <Navbar.Text>|</Navbar.Text>
                                <Nav.Link href="https://docs.zjubca.org"> ZJUBCA.DOCS </Nav.Link> 
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