import React, { Component } from "react";
import "./css/ParticipantList.css";


class ParticipantList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            disribution:"0 ZJUBCA",
            score:"0 分"
        }
        this.handleChange=this.handleChange.bind(this);
    }

    handleChange(e) {
        const name = e.target.name;
        if (name === "disribution") {//原来是通过name来区分发生内容的。
          this.setState({
            disribution: e.target.value
          });
        } else if (name === "score") {
          this.setState({
            score: e.target.value
          });
        } 
        else {
        }
    }

    render(){
        return (
            <div className="ParticipantView">
                {this.props.participant.username}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {this.props.checkable?(
                <span>
                    <input
                    type="text"
                    name="disribution"
                    placeholder="token分配"
                    value={this.state.disribution}
                    onChange={this.handleChange}
                    />
                    <input
                    type="text"
                    name="score"
                    placeholder="评分，最高10分"
                    value={this.state.score}
                    onChange={this.handleChange}
                    />
                </span>
                ):null}
            </div>
        );
    }
    
    
}

export default ParticipantList;