// import React, { Component } from "react";
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs';

ScatterJS.plugins(new ScatterEOS());

const network = {//NETWORK
    blockchain: 'eos',//
    protocol: 'http',//https
    host: '127.0.0.1',// nodes.get-scatter.com  127.0.0.1
    port: 8888,//443
    chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'
    // aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906
}

class EosComm {//extends Component
    constructor(loginAccount=null) {
        // super(props);
        // ScatterJS.plugins(new ScatterEOS());
        this.loginAccount = loginAccount;
        this.currentAccount = null;
        this.connected = false;
        this.currentAccount = null;
        // this.CONTRACT = 'zjubcabounty';
    }
    
    connectAndLogin(loginAlert=true){
        return new Promise((resolve,reject)=>{
            ScatterJS.scatter.connect('zjubca-bounty').then( connected =>{
                this.connected = connected;
                console.log("1. EosComm connect to EOS :",this.connected);
                if (!this.connected) {
                    console.log('Connected failed.');
                    return;
                }
                try {
                    ScatterJS.scatter.getIdentity({accounts:[network],name:this.loginAccount}).then(identity=>{
                        console.log("2.Login identity: ",identity);
                        this.currentAccount = identity.accounts[0];
                        console.log("2.Login account: ", this.currentAccount);
                        if(loginAlert)alert("Login Success with account " + JSON.stringify(this.currentAccount.name));
                        resolve(this.currentAccount);
                    });
                } catch (e) {
                    console.log("Get identity failed:", e);
                    alert("Get identity failed.");
                }
            });
        })
        
    }

    pushAction(actionName, data, contract_name='bh'){
      return new Promise((resolve, reject) => {
          try{
            // let contract_name = 'bh';
            let eos = ScatterJS.scatter.eos(network, Eos);
            eos.transaction({
                actions: [
                    {
                        account: contract_name,
                        name: actionName,
                        authorization: [{
                            actor: this.currentAccount.name,
                            permission: this.currentAccount.authority
                        }],
                        data,
                    }
                ]
            }).then(tr =>{
                let dataString = tr.processed.action_traces[0].console;
                // taskString.replace("\n","");
                // console.log("3.pushAction data: \n",dataString);
                // console.log(typeof taskString);//string
                let dataJSON = JSON.parse(dataString);
                // 字符串不能带有换行符？否则会parseJSON失败
                console.log("3.pushAction data: \n",dataJSON);//.main
                resolve(dataJSON);//tasks
            });
          }catch (e){
            console.log("Push Action failed:", e);
            alert("Push Action failed.");
          }
      })
    }


    async connect(){
        //change name 'hello-scatter' to your application's name
        this.connected = await ScatterJS.scatter.connect('zjubca-bounty')//zjubca-bounty
        console.log(this.connected);
    }

    // login with eos account via scatter
    async login(){
        // console.log('in login.');
        if (!this.connected) {
            console.log('not connected');
            return;
        }
        try {
            let result = await ScatterJS.scatter.getIdentity({accounts:[this.network]})
            console.log("Login Result: ",result);
            this.currentAccount = result.accounts[0];
            for(var i=0; i<result.accounts.length; i++){
                console.log("login success,", this.currentAccount);
                alert("login success" + JSON.stringify(this.currentAccount));
            }
        } catch (e) {
            alert("login fail");
            console.log("login fail,", e);
        }
    }

    static checkLogin() {
        if (this.connected == false) {//this.name === 'undefined'
            throw new Error('nologin');
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

    async logout() {
        ScatterJS.scatter.forgetIdentity();
    }

    async handleLogin() {
        await this.connect()
        await this.login()
        // await this.eoslogin()
        // await this.logintest();
    }

}

export default EosComm;
