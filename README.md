# zjubca.bounty
A decentralized bounty system powerd by EOS.

Design under [DApp Guide](https://github.com/Blockchain-zju/dapp-dev-guide).

# 1 需求分析
## 1.1 任务生命周期
* 认领期：悬赏发起方公布一项悬赏任务。赏金猎人可以在此阶段可以认领任务、无视任务、拒绝任务。认领任务后，可以选择立刻使任务进入执行期。
* 执行期：认领期结束后，任务自动进入执行期。赏金猎人需要在执行期内完成任务。完成任何后，可以选择立刻进入验收期。
* 验收期：执行期结束后，任务自动进入验收期。悬赏发起方验收完任务后，任务进入完成期。
* 完成：若悬赏发起方未在验收期内完成任务的验收，则将向赏金猎人支付违约金。

# 2 开发计划
## 2.1 前端：Web端
按照功能来进行标识：
1. [x] 任务筛选及呈现功能
    * [x] 能根据任务的参数进行筛选
    * [x] 主面板：任务部分信息呈现
    * [x] 任务详细页面：任务全部信息呈现
2. [x] 任务新建功能
3. [x] 任务编辑功能
	* [x] 任务所有内容可编辑
2. [ ] 管理任务
    * [x] 发布：相当于新建一个任务，初始状态为Before Executing
    * [ ] 开始：将一个任务的状态从Before Executing变换成In Executing
    * [ ] 验收：将一个任务的状态从In Executing变换成After Executing
    * [ ] 完成验收：将一个任务的状态从After Executing变换成Done
    * [ ] 验收后管理：在任务变成Done状态后，仍然可以进行Token奖励的调整
4. [x] 与区块链交互部分
    * [x] 登录Scatter钱包、选取账户
    * [x] 通过账户身份来调用已经部署的合约中的action
    * [x] 通过action的合理组合，完成交互功能
3. [x] 其他细节
    * [x] 任务状态的颜色需要随着状态的不同而变化：黄色、绿色、蓝色、黑色
    * [x] 展示任务参与者
    * [x] 把点赞按钮激活
## 2.2 后端：智能合约
1. [x] 测试环境启动
    * [x] 测试账户、钱包设置
    * [x] 测试网重启
2. [x] Task合约
    * [ ] 关于权限的问题要解决，现在create一个task使用不匹配的权限会出问题。
  

## 2.3 开发过程日志
2019-2-18前略。

f-2.1:

2019-2-20： 修复了task无法修改内容的bug

2019-2-20： 明白了造成新建task点进去后无内容的原因。
```
var taskData = tasksJsonData.tasks[taskId-1];
tasks.js是从文件里读取的，所以失败。加上：task.js-137: 
```
2019-2-20： 大致完善了任务

2019-2-27： 加入筛选面板（功能未实现）

2019-2-28： 修改了程序内部属性名称；
            加入点踩图标（功能未实现）
            task智能合约框架完成（实现未开始编写）
接下去的计划：
智能合约完成：task合约单方面数据操作完成，完成sh脚本。
  => 前端：在task界面完成任务要求列表和参与者信息的变化。
  => 打通前后端任务数据的交互。
  => 前端：一些部分单独写成react组件。

"name": "bbs-router" ==> "zjubca-bounty",

WebSocket connection to 'wss://local.get-scatter.com:50006/socket.io/?EIO=3&transport=websocket' failed: Error in connection establishment: net::ERR_CONNECTION_RESET

WebSocket connection to 'ws://127.0.0.1:50005/socket.io/?EIO=3&transport=websocket' failed: Error in connection establishment: net::ERR_CONNECTION_REFUSED

Unchecked runtime.lastError: The message port closed before a response was received.

2019-3-26: 
问题：怎么解决Scatter登录时的账户选择及再选择？
用户ID是否需要？因为EOS账号名就是唯一的标识。
likevote/hatevote 数据类型是string???

2019-3-27:
取消所有的user id;
任务编辑保存功能、状态更新；
点赞点踩更新；
完成任务筛选器功能实现；

2019-4-9：
准备重启测试网，把Multi-Index的内容更新一下。

2019-4-19:
使用UI库React-Bootstrap来重构前端界面。项目结构：
index.js 
|- App.js
    |-Route to RankList.js
                |- Header.js
                |- table tbody RankItem.js * map.item
                                |- tr {th*5}
    |-Route to Home.js
                |- Header.js
                |- Route to TaskList.js
                                |- TaskFilter.js
                                |- TaskEditor.js
                                |- TasksView.js
                                        |- TaksItem.js * map.item
                                                |- Link to {divs} 
                |- Route to Task.js
                                |- TaskEditor.js
                                |- TaskView.js
                                        |- {divs}
                                        |- ParticipantItem.js
                                                |- {divs}

    


# 3 功能测试
(Remove Part 1 to 3 when finish developing.)
2019-04-09
[ ] 重启本地测试网、搞定钱包、账户、重新部署合约。
2019-04-20
[ ] 部署合约到麒麟测试网
[ ] 部署前端到GitHub Pages
- 出现ZJUBCA.Wallet无法加载task详细信息的情况，在Meet.One/Math Wallet中则没用。
- 

# 4 搭建要求
智能合约用到了zjubca-scatterjs、eosjs：

npm i -S zjubca-scatterjs-core zjubca-scatterjs-plugin-eosjs eosjs@16.0.9
npm i -S scatterjs-core scatterjs-plugin-eosjs

前端用到了React、Router、react-dom等：
npm install react-router-dom


# 5 DApp网址
