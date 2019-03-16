import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';
import Eos from 'eosjs';

ScatterJS.plugins( new ScatterEOS() );

const network = {//NETWORK
    blockchain: 'eos',//
    protocol: 'http',//https
    host: '127.0.0.1',// nodes.get-scatter.com  127.0.0.1
    port: 8888,//443
    chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'
    // aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906
}

var currentAccount = null;
var connected = false

export async function scatterlogin ()  {
    ScatterJS.scatter.connect('zjubca-bounty').then(connected=>{
        if (!connected) {
            console.log('not connected');
            return;
        }
        try {
            ScatterJS.scatter.getIdentity({accounts:[network]}).then(result=>{
                console.log("Login Result: ",result);
                var currentAccount = result.accounts[0];
                alert("login success!!" + JSON.stringify(currentAccount));
                // for(var i=0; i<result.accounts.length; i++){
                //     console.log("login success,", currentAccount);
                //     alert("login success" + JSON.stringify(currentAccount));
                // }
                return currentAccount;
            });
        } catch (e) {
            alert("login fail");
            console.log("login fail,", e);
        }
    });
};

export const showinfo = () =>{//currentAccount
    ScatterJS.scatter.connect('zjubca-bounty').then(connected=>{
        if (!connected) {
            console.log('not connected');
            return;
        }
        try {
            ScatterJS.scatter.getIdentity({accounts:[network]}).then(result=>{
                console.log("Login Result: ",result);
                let currentAccount = result.accounts[0];
                alert("login success!!" + JSON.stringify(currentAccount));
                
                let contract_name = 'bh';
                let eos = ScatterJS.scatter.eos(network, Eos);
                try{
                    let data = {
                        // user:this.currentAccount.name
                    };
                    eos.transaction({
                        actions: [
                            {
                                account: contract_name,
                                name: 'showinfo',
                                authorization: [{
                                    actor: currentAccount.name,
                                    permission: currentAccount.authority
                                }],
                                data,
                            }
                        ]
                    }).then(tr=>{
                        console.log(tr);
                        alert(tr.processed.action_traces[0].console);
                    });
                    
                } catch(e) {
                    console.log("error", e);
                }
                
            });
        } catch (e) {
            alert("login fail");
            console.log("login fail,", e);
        }
    });
    
};

export async function connect(){
    //change name 'hello-scatter' to your application's name
    connected = await ScatterJS.scatter.connect('zjubca-bounty')//zjubca-bounty
    console.log(connected);
}

// login with eos account via scatter
export async function login(){
    // console.log('in login.');
    if (!connected) {
        console.log('not connected');
        return;
    }
    try {
        let result = await ScatterJS.scatter.getIdentity({accounts:[network]})
        console.log("Login Result: ",result);
        currentAccount = result.accounts[0];
        for(var i=0; i<result.accounts.length; i++){
            console.log("login success,", currentAccount);
            alert("login success" + JSON.stringify(currentAccount));
        }
    } catch (e) {
        alert("login fail");
        console.log("login fail,", e);
    }
}