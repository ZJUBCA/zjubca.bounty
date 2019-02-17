import React, { Component } from "react";
import TaskItem from "./TaskItem";
import "./TaskList.css";
import like1 from "./images/like-default.png";
import like2 from "./images/like.png";


// react 告诉我们一个道理：一定要注重数据流的管理。
class TaskList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
    this.timer = null;
    this.handleVote = this.handleVote.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    // 用setTimeout模拟异步从服务器端获取数据
    this.timer = setTimeout(() => {
      this.setState({
        tasks: [
          { id: 1, title: "Random Draw DApp", description: "Very very long", stage: "Before Executing", rolenumbers: 3,
            reward: "1000 ZJUBCA", pledge: "100 ZJUBCA", date:"2017-09-01 10:00" ,likePic:like1, vote:0},
          { id: 2, title: "Bounty Hunter DApp", description: "Very very long", stage: "In Executing", rolenumbers: 4,
          reward: "1500 ZJUBCA", pledge: "100 ZJUBCA", date:"2017-09-01 10:00", likePic:like1, vote:0},
          { id: 3, title: "ZJUBCA Wallet", description: "Very very long", stage: "After Executing", rolenumbers: 4,
          reward: "2500 ZJUBCA", pledge: "200 ZJUBCA", date:"2017-09-01 10:00", likePic:like1, vote:0},
          { id: 4, title: "ZJUBCA Referrence", description: "Very very long", stage: "Done", rolenumbers: 5,
          reward: "5000 ZJUBCA", pledge: "0 ZJUBCA", date:"2017-09-01 10:00", likePic:like1, vote:0}
        ]
      });
    }, 1000);
    // document.getElementById("footer_wrap").style = {{background:"red"}};
  }

  componentWillUnmount() {
    if(this.timer) {
      clearTimeout(this.timer);
    }
  }
  
  // 处理点赞逻辑
  handleVote(id) {
    const tasks = this.state.tasks.map(item => {
      const newItem = item.id === id ? {...item, likePic:like2, vote: ++item.vote} : item;
      return newItem;
    })
    this.setState({
      tasks
    })
  }

  // 保存任务
  handleSave(task) {
    // 根据task的id，过滤出当前要更新的task
    const tasks = this.state.tasks.map(item => {
      const newItem = item.id === task.id ? task : item;
      return newItem;
    })
    this.setState({
      tasks
    })
  }

  handleNewTask(task){

  }
  handleAccessTask(task){

  }
  handleManageTask(task){

  }

  render() {
    return (
    <div id="whole">
      <div id="header_wrap" class="outer">
        <div class="inner">
          <h1 id="project_title">赏金猎人</h1>
          <h2 id="project_tagline">ZJUBCA.Bounty</h2>
        </div>
      </div>
      <div className='container'>
        <div className="buttonLine" >
          <div onClick={this.handleNewTask}>发布</div>
          <div onClick={this.handleAccessTask}>验收</div>
          <div onClick={this.handleManageTask}>管理</div>
        </div>
        <ul>
          {this.state.tasks.map(item =>
            <TaskItem
              key = {item.id}
              task = {item}
              onVote = {this.handleVote}
              onSave = {this.handleSave}
            />
          )}
        </ul>
      </div>
      <div id="footer_wrap" class="outer">
        <footer class="inner">
          <p class="copyright">ZJUBCA.Bounty created by <a href="https://github.com/treasersimplifies">treaser</a></p>
          <p>Owned By <a href="https://github.com/Blockchain-zju">ZJU BlockChain Association</a></p>
        </footer>
      </div>
    </div>
    );
  }
}

export default TaskList;
