import ScatterJS from 'zjubca-scatterjs-core'
import ScatterEOS from 'zjubca-scatterjs-plugin-eosjs'
import Eos from 'eosjs';
// import event from '../utils/event'

ScatterJS.plugins(new ScatterEOS());

export const CONTRACT = 'zjubcavote11';

// production
// export const NETWORK = {
//   blockchain: 'eos',
//   protocol: 'https',
//   host: 'api-kylin.eoslaomao.com',
//   port: 443,
//   chainId: '5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191'
// };
export const NETWORK = {//NETWORK
  blockchain: 'eos',//
  protocol: 'http',//https
  host: '127.0.0.1',// nodes.get-scatter.com  127.0.0.1
  port: 8888,//443
  chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'
  // aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906
}
// export const NETWORK = {
//   blockchain: 'eos',
//   protocol: 'http',
//   host: 'localhost',
//   port: 8888,
//   chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f'
// };

export default class EosService {
  constructor() {

  }

  static async connect() {
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

        const res = await scatter.getIdentity({accounts: [NETWORK]});
        console.log("res:",res);
        const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');
        const eos = scatter.eos(NETWORK, Eos, {expireInSeconds: 20});

        console.log("account:",account);
        console.log("eos:",eos);

        EosService.account = account;
        EosService.eos = eos;
        EosService.scatter = scatter;
        // event.$emit('login');
        resolve(eos);
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

  /**
   * returns the account name.
   *
   * @returns {*}
   */
  static get name() {
    return EosService.account && EosService.account.name;
  }

  static checkLogin() {
    if (typeof EosService.name === 'undefined') {
      throw new Error('nologin')
    }
  }

  static async getVotes() {
    EosService.checkLogin();
    const res = await EosService.eos.getTableRows(true, CONTRACT, EosService.name, 'votes', 'number');
    return res.rows;
  }

  static async getVote(issueNum) {
    EosService.checkLogin();
    const res = await EosService.eos.getTableRows(true, CONTRACT, EosService.name, 'votes', 'number');
    return res.rows.find(x => x.number == issueNum);
  }

  static async getIssue(issueNum) {
    EosService.checkLogin();
    const res = await EosService.eos.getTableRows(true, CONTRACT, issueNum, 'issues', 'number');
    // console.log(res);
    return res.rows.find(x => x.number == issueNum);
  }

  static async transaction(options) {
    EosService.checkLogin();
    return await EosService.eos.transaction(options)
  }

  static async getTransaction(id) {
    EosService.checkLogin();
    return await EosService.eos.getTransaction(id)
  }
}
