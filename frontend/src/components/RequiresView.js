import React, { Component } from "react";
import { getFormatDate } from "../utils/date";
import "./RequiresView.css";

class RequiresView extends Component {
  render() {
    const { requires } = this.props;
    return (
      <ul className="requiresView">
        {requires.map(item => {
          return (
            <li key={item.id}>
              <div>{item.content}</div>
              <div className="sub">
                <span>{item.author.username}</span>
                <span>·</span>
                <span>{getFormatDate(item.updatedAt)}</span>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default RequiresView;
