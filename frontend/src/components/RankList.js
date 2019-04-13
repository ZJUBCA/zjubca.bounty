import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/RankList.css";
import EosComm from "../service/EosComm"
import loading from "../images/loading1.gif";
import RankItem from "./RankItem"

class RankList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            // newTask: false,
            loading: true
            // userLengthOfAll : 0
          };
        this.refreshRankList=this.refreshRankList.bind(this);
        this.eoscomm = new EosComm();
    }

    componentDidMount() {
        this.refreshRankList();
    }

    refreshRankList(){
        // let eoscomm = new EosComm();
        this.eoscomm.connectAndLogin().then(loginAccount=>{
          // sessionStorage.setItem("userId",this.userNameToId(loginAccount.name));
          sessionStorage.setItem("userName",loginAccount.name);
          this.eoscomm.pushAction("getranklist",{length:3},'user').then(rankJSON =>{//"selectatask",{author:loginAccount.name,task_id:6}
            this.setState({
              users: rankJSON.ranklist, //jsonData.tasks
            //   newTask: false,
              loading: false
            });
          });
        });
    }

    render() {
        // const { userName } = this.props;//, onLogout, location 
        return (
        <div className="RankList">
        <table cellSpacing="0"><tbody>
        {/* div */}
            {this.state.loading ? (
                <div className="textCenter">
                <span>
                    <img alt="loading" src={loading} />
                </span>
                <div>
                    正在请求数据...<br/>
                    如果本页面持续时间过长，请刷新页面。若刷新无果则说明网络故障或者Scatter登录失败。
                </div>
                </div>
            ):<RankItem user={{rank:"Rank",username:"Username",gpaplus:"GPAPlus",totalbounty:"TotalBounty",awscore:"AWScore"}}/>}
           {/* {this.state.users[0].username} */}
          
           {this.state.users.map((item, index) => (
                <RankItem key={index} user={{rank:index+1, username:item.username, gpaplus:item.gpaplus, totalbounty:item.totalbounty,awscore:item.awscore}}/>
            ))}
            </tbody></table>
        </div>
        );
    }
}

export default RankList;
