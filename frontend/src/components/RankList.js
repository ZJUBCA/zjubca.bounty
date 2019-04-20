import React, { Component } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import EosComm from "../service/EosComm"
import loading from "../images/loading1.gif";
import RankItem from "./RankItem"
// import "./css/RankList.css";
import { Container, ListGroup, Row, Col, Form, Button, Image, Badge, Carousel } from 'react-bootstrap';

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
        this.eoscomm.connectAndLogin(false).then(loginAccount=>{
          // sessionStorage.setItem("userId",this.userNameToId(loginAccount.name));
          sessionStorage.setItem("userName",loginAccount.name);
          this.eoscomm.fetchData('zjubcauser11','zjubcauser11','user').then(rowsdata=>{
            console.log("users :",rowsdata);
            this.setState({
              users: rowsdata, //jsonData.tasks
              loading: false
            });
            let myRank = -1;
            const userName = sessionStorage.getItem("userName");
            let myGPAPlus = this.state.users.find(function(item,index){
                if(item.username === userName){
                    myRank = index+1;
                    return true;}
            });
            if(myGPAPlus){
              myGPAPlus=myGPAPlus.gpaplus;
            }else{
              myGPAPlus=0;
            }
            this.setState({
                myInfo : {myRank:myRank, myGPAPlus:myGPAPlus}
            });
          });

          // this.eoscomm.pushAction("getranklist",{length:3},'user').then(rankJSON =>{//"selectatask",{author:loginAccount.name,task_id:6}
          //   this.setState({
          //     users: rankJSON.ranklist, //jsonData.tasks
          //   //   newTask: false,
          //     loading: false
          //   });
          //   let myRank = -1;
          //   const userName = sessionStorage.getItem("userName");
          //   let myGPAPlus = this.state.users.find(function(item,index){
          //       if(item.username === userName){
          //           myRank = index+1;
          //           return true;}
          //   }).gpaplus;
          //   this.setState({
          //       myInfo : {myRank:myRank, myGPAPlus:myGPAPlus}
          //   });
          // });
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
        <div style={{paddingTop: 100, paddingBottom:150}}>
            <Header
                userName={userName}
                onLogout={this.handleLogout}
                location={location}
                myRank={this.state.myInfo.myRank}
                myGPAPlus={this.state.myInfo.myGPAPlus}
            />
            <Container className="RankList">
                <ListGroup as="ul">
                {this.state.loading ? (
                  <Container className="textCenter">
                    <Row>
                      <Col className="text-center">
                      正在向区块链节点请求数据...
                      </Col> 
                    </Row>
                    <Row>
                      <Col className="text-center">
                        <Image alt="loading" src={loading} />
                      </Col>
                    </Row>
                    <Row>
                      <Col className="text-center">
                        如果本页面持续时间过长，请<strong>刷新页面</strong>。若刷新无果则说明网络故障或者Scatter登录失败。
                      </Col>
                    </Row>
                  </Container>
                ):<RankItem user={{rank:"Rank",username:"Username",gpaplus:"GPAPlus",totalbounty:"TotalBounty",awscore:"AWScore"}}/>}
            
                {this.state.users.map((item, index) => (
                    <RankItem key={index} user={{rank:index+1, username:item.username, gpaplus:item.gpaplus, totalbounty:item.totalbounty,awscore:item.awscore}}/>
                ))}
                
                </ListGroup>
            </Container>

            <Footer/>
        </div>
        );
    }
}

export default RankList;
