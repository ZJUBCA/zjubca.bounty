import React, { Component } from "react";

class TaskFilter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
        <div className="taskFilter">
            <select defaultValue="taskstatus">
                <option value="tasktitle">任务名称</option>
                <option value="taskstatus">任务状态</option>
                <option value="taskauthor">任务创建人</option>
                <option value="taskreward">任务奖励</option>
            </select>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <select defaultValue="equal">
                <option value="equal">等于</option>
                <option value="bigger">大于</option>
                <option value="nosmaller">大于等于</option>
                <option value="smaller">小于</option>
                <option value="nobigger">小于等于</option>
            </select>
            &nbsp; &nbsp; &nbsp; &nbsp;
            <input type="text"  name="filtervalue" id="filtervalue" 
            placeholder="Before Executing"//作用是？？？
            />
            &nbsp; &nbsp; &nbsp; &nbsp;
            <button>筛选</button>
        </div>
        );
    }
}

export default TaskFilter;