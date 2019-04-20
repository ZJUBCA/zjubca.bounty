import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

class TaskFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            filter: "taskstatus", 
            judge: "equal",
            filterValue: "Before Executing"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleFilterClick = this.handleFilterClick.bind(this);

    }

    handleFilterClick(){
        this.props.onFilterClick(this.state);
    }

    handleChange(e) {
        const name = e.target.name;
        if (name === "filter") {
          this.setState({
            filter: e.target.value
          });
        } else if (name === "judge") {
          this.setState({
            judge: e.target.value
          });
        } else if (name === "filterValue") {
          this.setState({
            filterValue: e.target.value
          });
        } 
        else {
        }
    }


    render() {
        return (
        <Container className="taskFilter">
        {/* <Row> */}
        <Form>
           <Form.Group as={Row}>
           <Col>
           {/* <Form.Group> */}
                <Form.Control 
                as="select"
                name = "filter"
                value={this.state.filter}
                onChange={this.handleChange}>
                  <option value="tasktitle">任务名称</option>
                  <option value="taskstatus">任务状态</option>
                  <option value="taskauthor">任务创建人</option>
                  <option value="taskreward">任务奖励</option>
                </Form.Control>
              {/* </Form.Group> */}
              </Col>

              <Col>
              {/* <Form.Group> */}
                <Form.Control 
                name = "judge"
                value={this.state.judge}
                onChange={this.handleChange}
                as="select">
                  <option value="equal">等于</option>
                  <option value="bigger">大于</option>
                  <option value="nosmaller">大于等于</option>
                  <option value="smaller">小于</option>
                  <option value="nobigger">小于等于</option>
                </Form.Control>
              {/* </Form.Group> */}
              </Col>
              
              <Col>
              {/* <Form.Group > */}
                <Form.Control size="sm"
                type="text"  
                name="filterValue" 
                // id="filterValue" 
                value={this.state.filterValue}
                placeholder="Before Executing"
                onChange={this.handleChange}
                />
              {/* </Form.Group> */}
              </Col>


              <Col><Button
              onClick={this.handleFilterClick}
              variant="outline-primary"
              >筛选</Button></Col>

          </Form.Group>
        </Form>

        {/* </Row> */}
        </Container>
        );
    }
}

export default TaskFilter;