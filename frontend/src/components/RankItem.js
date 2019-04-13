import React, { Component } from "react";
import "./css/RankItem.css";


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
                <tr className="RankItem" style={this.state.trAddSytle} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}>
                    <th className="rank" style={thAddStyle}>{user.rank}</th>
                    {/* <span>{0}</span> */}
                    <th className="username" style={thAddStyle}>{user.username}</th>
                    <th className="gpaplus" style={thAddStyle}>{user.gpaplus}</th>
                    <th className="totalbounty" style={thAddStyle}>{user.totalbounty}</th>
                    <th className="awscore" style={thAddStyle}>{user.awscore}</th>
                </tr>
            // </div>
        );
    }
    
    
}

export default RankItem;