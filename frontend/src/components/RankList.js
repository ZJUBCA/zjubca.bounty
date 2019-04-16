import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
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
            myInfo:{myGPAPlus:-1,myRank:-1},
            loading: true
            // userLengthOfAll : 0
        };
        this.refreshRankList=this.refreshRankList.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
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

            let myRank = -1;
            const userName = sessionStorage.getItem("userName");
            let myGPAPlus = this.state.users.find(function(item,index){
                if(item.username === userName){
                    myRank = index+1;
                    return true;}
            }).gpaplus;
            
            this.setState({
                myInfo : {myRank:myRank, myGPAPlus:myGPAPlus}
            });
          
          });
        });
    }

    handleLogout() {
        sessionStorage.removeItem("userName");
    }

    jsonFind(){

    }

    render() {
        // const { userName } = this.props;//, onLogout, location 
        const { match, location } = this.props;
        const userName = sessionStorage.getItem("userName");
        
        return (
        <div>
            <Header
                userName={userName}
                onLogout={this.handleLogout}
                location={location}
                myRank={this.state.myInfo.myRank}
                myGPAPlus={this.state.myInfo.myGPAPlus}
            />
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
        </div>
        );
    }
}

export default RankList;
