import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/Header.css";

class Header extends Component {
  render() {
    const { userName, onLogout, location } = this.props;
    return (
      <div className="header">
        <div className="nav">
          <span className="left-link">
            <Link to="/">首页</Link>&nbsp;&nbsp;&nbsp;
            <Link to={{ pathname: "/ranklist", state: { from: location } }}>排行榜</Link>
          </span>
          {userName && userName.length > 0 ? (
            <span className="user">
              当前用户：{userName}&nbsp;<button onClick={onLogout}>注销</button>
            </span>
          ) : (
            <span className="right-link">
              当前未连接到钱包
              {/* <Link to={{ pathname: "/login", state: { from: location } }}>
                登录
              </Link>
              &nbsp;&nbsp;
              <Link to={{ pathname: "/scatterlogin", state: { from: location } }}>
              Scatter登录
              </Link> */}
            </span>
          )}
        </div>
      </div>
    );
  }
}

export default Header;
