import React, { Component } from "react";


class Footer extends Component {
    constructor(props) {
      super(props);
    }
    
    render(){
        return (
        <div id="footer_wrap" className="outer">
            <footer className="inner">
                <p className="copyright">
                © 2019 ZJU BlockChain Association 浙江大学区块链协会<br/>
                Other Links: <a href="https://github.com/Blockchain-zju"> ZJU BlockChain Association GitHub </a> |
                <a href="https://toolkit.zjubca.org/"> ZJUBCA.EOS TOOLKIT </a> |
                <a href="https://docs.zjubca.org"> ZJUBCA.DOCS </a> 
                </p>
            </footer>
        </div>
        )
    }
}

export default Footer