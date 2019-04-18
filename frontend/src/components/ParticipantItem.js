import React, { Component } from "react";
import "./css/ParticipantItem.css";


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
            <div className="ParticipantView">
                {this.props.participant.username}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {this.props.checkable?(
                <span>
                    <input
                    type="text"
                    name="distribution"
                    placeholder="token分配"
                    value={this.state.distribution}
                    onChange={this.handleChange}
                    />
                    <input
                    type="text"
                    name="score"
                    placeholder="评分，最高10分"
                    value={this.state.score}
                    onChange={this.handleChange}
                    />
                    <button onClick={this.submitAllocate}>确定</button>
                </span>
                ):null}
              {/* 将null改为只能显示的面板 */}
            </div>
        );
    }
    
    
}

export default ParticipantItem;