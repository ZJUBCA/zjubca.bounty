import React, { Component } from "react";
// import { Redirect } from "react-router-dom";
// import { post } from "../utils/request";
// import url from "../utils/url";
import "./css/ScatterLogin.css";
// import ScatterJS from 'scatterjs-core';
// import ScatterEOS from 'scatterjs-plugin-eosjs';
import ScatterJS from 'zjubca-scatterjs-core'
import ScatterEOS from 'zjubca-scatterjs-plugin-eosjs'
import Eos from 'eosjs';
import Header from "./Header";

const mode = "test";

class ScatterLogin extends Component {
    constructor(props) {
        super(props);
        ScatterJS.plugins(new ScatterEOS());
        this.state = {
        username: "zjubcabounty",
        password: "123456",
        redirectToReferrer: false,   // 是否重定向到之前的页面
        // accountName: '未登录',
        isLogin: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.sayHello = this.sayHello.bind(this);
        this.showinfo = this.showinfo.bind(this);
        this.pushAction = this.pushAction.bind(this);
    }
    currentAccount = null;
    connected = false;
    CONTRACT = 'zjubcabounty';//????

    network = {//NETWORK
        blockchain: 'eos',//
        protocol: 'http',//https
        host: '127.0.0.1',// nodes.get-scatter.com  127.0.0.1
        port: 8888,//443
        chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'
        // aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906
    }

    // network = {
    //     blockchain: 'eos',
    //     protocol: 'https',
    //     host: 'nodes.get-scatter.com',
    //     port: 443,
    //     chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
    // }
        
    // static async connect() {
    //     let scatter = ScatterJS.scatter;

    //     return new Promise((resolve, reject) => {
    //         scatter.connect('ZJUBCA.Bounty', {//ZJUBCA.VOTING
    //         initTimeout: 10000,
    //         }).then(async connected => {
    //         console.log(connected)
    //         if (!connected) {
    //             console.log('please unlock your scatter');
    //             reject(new Error('please unlock your scatter'))
    //         }

    //         const res = await scatter.getIdentity({accounts: [NETWORK]});
    //         console.log(res);
    //         const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
    //         const eos = scatter.eos(NETWORK, Eos, {expireInSeconds: 20});

    //         console.log(account);
    //         console.log(eos);

    //         ScatterLogin.account = account;//
    //         ScatterLogin.eos = eos;//
    //         ScatterLogin.scatter = scatter;
    //         // event.$emit('login');
    //         resolve()

    //         // Transaction Example
    //         // const transactionOptions = { authorization:[`${account.name}@${account.authority}`] };
    //         //
    //         // eos.transfer(account.name, 'helloworld', '1.0000 EOS', 'memo', transactionOptions).then(trx => {
    //         //   // That's it!
    //         //   console.log(`Transaction ID: ${trx.transaction_id}`);
    //         // }).catch(error => {
    //         //   console.error(error);
    //         // });

    //         })
    //     })
    // }

    // static checkLogin() {
    //     if (typeof ScatterLogin.name === 'undefined') {
    //         throw new Error('nologin')
    //     }
    // }

    // async handleLogin(e){
    //     // e.preventDefault();
    //     try {
    //       if (!this.isLogin) {
    //         await this.connect();
    //         this.username = this.username || '未登录';
    //         this.isLogin = true;
    //       }
    //     } catch (e) {
    //       console.log(e)
    //       if (e.message === 'nologin') {
    //         this.accountName = '未登录'
    //       }
    //     }
    // }

    async logintest(){
        ScatterJS.scatter.connect('zjubca-bounty').then(connected => {
            // If the user does not have Scatter or it is Locked or Closed this will return false;
            this.connected = connected;
            if(!connected) return false;
            const scatter = ScatterJS.scatter;
            // Now we need to get an identity from the user.
            // We're also going to require an account that is connected to the network we're using.
            const requiredFields = { accounts:[this.network] };
            scatter.getIdentity(requiredFields).then(() => {
                // Always use the accounts you got back from Scatter. Never hardcode them even if you are prompting
                // the user for their account name beforehand. They could still give you a different account.
                const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');//
                console.log("login success,", account);

                // for(var i=0; i<scatter.identity.accounts.length; i++){
                //     console.log("login success,", scatter.identity.accounts[i]);
                //     // alert("login success" + JSON.stringify(this.currentAccount));
                // }

                // You can pass in any additional options you want into the eosjs reference.
                const eosOptions = { expireInSeconds:60 };
                // Get a proxy reference to eosjs which you can use to sign transactions with a user's Scatter.
                const eos = scatter.eos(this.network, Eos, eosOptions);
                // ----------------------------
                // Now that we have an identity,
                // an EOSIO account, and a reference
                // to an eosjs object we can send a transaction.
                // ----------------------------
                // Never assume the account's permission/authority. Always take it from the returned account.
                
                // const transactionOptions = { authorization:[`${account.name}@${account.authority}`] };
                // eos.transfer(account.name, 'helloworld', '1.0000 EOS', 'memo', transactionOptions).then(trx => {
                //     // That's it!
                //     console.log(`Transaction ID: ${trx.transaction_id}`);
                // }).catch(error => {
                //     console.error(error);
                // });
        
            }).catch(error => {
                // The user rejected this request, or doesn't have the appropriate requirements.
                console.error("error : ",error);
            });
            console.log(this.connected);
        });
        
    }

    async eoslogin(){
        let scatter = ScatterJS.scatter;

        return new Promise((resolve, reject) => {
        scatter.connect('ZJUBCA.Bounty', {
            initTimeout: 10000,
        }).then(async connected => {
            console.log(connected)
            if (!connected) {
                console.log('please unlock your scatter');
                reject(new Error('please unlock your scatter'))
            }

            const res = await scatter.getIdentity({accounts: [this.network]});
            console.log(res);
            const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
            const eos = scatter.eos(this.network, Eos, {expireInSeconds: 20});

            console.log(account);
            console.log(eos);

            this.account = account;
            this.eos = eos;
            this.scatter = scatter;
            this.connected = true;
            // event.$emit('login');
            resolve()
            // Transaction Example
            // const transactionOptions = { authorization:[`${account.name}@${account.authority}`] };
            //
            // eos.transfer(account.name, 'helloworld', '1.0000 EOS', 'memo', transactionOptions).then(trx => {
            //   // That's it!
            //   console.log(`Transaction ID: ${trx.transaction_id}`);
            // }).catch(error => {
            //   console.error(error);
            // });
        })
        })
    }

    static checkLogin() {
        if (this.connected == false) {//this.name === 'undefined'
            throw new Error('nologin')
        }
    }

    async connect(){
        //change name 'hello-scatter' to your application's name
        this.connected = await ScatterJS.scatter.connect('zjubca-bounty')//zjubca-bounty
        console.log(this.connected);
    }

    // login with eos account via scatter
    async login(){
        console.log('in login.');
        if (!this.connected) {
            console.log('not connected');
            return;
        }
        try {
            let result = await ScatterJS.scatter.getIdentity({accounts:[this.network]})
            console.log("result: ",result);
            this.currentAccount = result.accounts[0];
            for(var i=0; i<result.accounts.length; i++){
                console.log("login success,", this.currentAccount);
                alert("login success" + JSON.stringify(this.currentAccount));
            }
        } catch (e) {
            alert("login fail")
            console.log("login fail,", e)
        }
    }

    async transfer(){
        if (this.currentAccount == null) {
            await this.handleLogin()
        }
        let eos = ScatterJS.scatter.eos(this.network, Eos);
        try{
            let result = await eos.transfer(this.currentAccount.name, 'eoszjubca111', '0.0001 EOS', 'hello-eos-scatter, dapp demo transfer');
            console.log(result)
        } catch(e) {
            console.log("error", e)
        }
    }

    async sayHello(){
        if (this.currentAccount == null) {
            await this.handleLogin()
        }
        //please change hello_contract_name to your contract account
        let hello_contract_name = 'itleakstoken';
        let eos = ScatterJS.scatter.eos(this.network, Eos);
        try{
            let data = {
            user:this.currentAccount.name
            }
            let tr = await eos.transaction(
            {
                actions: [
                    {
                        account: hello_contract_name,
                        name: 'hi',
                        authorization: [{
                            actor: this.currentAccount.name,
                            permission: this.currentAccount.authority
                        }],
                        data,
                    }
                ]
            }
            )
            console.log(tr)
        } catch(e) {
            console.log("error", e)
        }
    }

    async showinfo(){
        if (this.currentAccount == null) {
            await this.handleLogin();
        }
        //please change contract_name to your contract account
        let contract_name = 'bh';
        let eos = ScatterJS.scatter.eos(this.network, Eos);
        try{
            let data = {
                // user:this.currentAccount.name
            };
            let tr = await eos.transaction({
                actions: [
                    {
                        account: contract_name,
                        name: 'showinfo',
                        authorization: [{
                            actor: this.currentAccount.name,
                            permission: this.currentAccount.authority
                        }],
                        data,
                    }
                ]
            });
            console.log(tr);
            alert(tr.processed.action_traces[0].console);//
        } catch(e) {
            console.log("error", e);
        }
    }

    async pushAction(actionName, data){
        if (this.currentAccount == null) {
            await this.handleLogin();
        }
        let contractName = 'bh';
        let eos = ScatterJS.scatter.eos(this.network, Eos);
        try{
            let tr = await eos.transaction({
                actions: [
                    {
                        account: contractName,
                        name: actionName,
                        authorization: [{
                            actor: this.currentAccount.name,
                            permission: this.currentAccount.authority
                        }],
                        data,
                    }
                ]
            });
            console.log(tr);
            alert(tr.processed.action_traces[0].console);
            return tr.processed.action_traces[0].console;
        } catch(e) {
            console.log("error", e);
            return "Operation failed, see console for details.";
        }
    }

    async logout() {
        ScatterJS.scatter.forgetIdentity();
    }

    async handleLogin() {
        await this.connect()
        await this.login()
        // await this.eoslogin()
        // await this.logintest();
    }

    handleChange(e) {
        if (e.target.name === "username") {
          this.setState({
            username: e.target.value
          });
        } else if (e.target.name === "password") {
          this.setState({
            password: e.target.value
          });
        } else {
          // do nothing
        }
    }

    render() {
    document.title="zjubca.bounty";
    return (
        <div>
        <Header
        //   username={username}
        //   onLogout={this.handleLogout}
        //   location={location}
        />
        <div className="login">
        <div className="BtnDiv">
            <div>
                <label>
                    用户名：
                    <input
                    name="username"
                    type="text"
                    value={this.state.username}
                    onChange={this.handleChange}
                    />
                </label>
            </div>
            <div>
                <label>
                    密码：
                    <input
                    name="password"
                    type="password"
                    value={this.state.password}
                    onChange={this.handleChange}
                    />
                </label>
            </div>
            <div className="Btn">
                <button onClick={this.handleLogin}>login</button>&nbsp;&nbsp;
                <button>transfer</button>&nbsp;&nbsp;
                {/* <button>sayHi</button> */}
                <button onClick={this.showinfo}>showinfo</button>
                {/* pushAction("showinfo",{}) */}
            </div>
        </div>
        </div>
        </div>
    );
    }
}

export default ScatterLogin;
