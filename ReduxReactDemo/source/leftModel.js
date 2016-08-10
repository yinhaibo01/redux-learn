import React from "react";
import ReactDOM from "react-dom";
import { ActionCreators } from 'redux-undo';
import * as appActions from "./actions";

var MyNumberInput = React.createClass({
    render: function () {
        return (
            <div>
                <input type="number" min="0" placeholder={this.props.inputHintText} style={{ width: this.props.inputWidth, height: this.props.inputHeight}} />
            </div>
        );
    }
});

var MyDateText = React.createClass({
    render: function () {
        return (
            <div>
                <input type="text" disabled="true" value={this.props.textValue} style={{ width: this.props.inputWidth, height: this.props.inputHeight}} />
            </div>
        );
    }
});

var MyInquireDiv = React.createClass({
    formatNumber: function (num) {
        if(num > 0 && num < 10) {
            return "0" + num;
        }
        else {
            return num;
        }
    },
    getCurrentDate: function () {
        var date = new Date();
        return date.getFullYear() + "/" + this.formatNumber(date.getMonth() + 1) + "/" + this.formatNumber(date.getDate());
    },
    insertUserData: function () {
        this.props.dispatch(appActions.isShowInquireDiv());

        var dateInputElement = ReactDOM.findDOMNode(this.refs.dateInput).children[0];
        var numberInputElement = ReactDOM.findDOMNode(this.refs.numberInput).children[0];
        var dataItem = {date: dateInputElement.value, money: numberInputElement.value};

        this.props.dispatch(appActions.addDataItem(dataItem));
    },
    render: function () {
        var showInquireDiv = this.props.initialDivState ? "block" : "none";
        var innerDivStyle = {
            position: "absolute",
            top: "25%",
            left: 0,
            width: "100%",
            textAlign: "center",
            backgroundColor: "transparent"
        };
        var outerDivStyle = {
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            backgroundColor: "rgba(158, 158, 158, 0.8)",
            display: showInquireDiv
        };
        var inquireElementWidth = 280, inquireElementHeight = 30;
        var btnWidth = 120;

        return (
            <div style={outerDivStyle}>
                <div id="inquireItems" style={innerDivStyle}>
                    <MyDateText ref="dateInput" inputWidth={inquireElementWidth} inputHeight={inquireElementHeight} textValue={this.getCurrentDate()} />
                    <MyNumberInput ref="numberInput" inputWidth={inquireElementWidth} inputHeight={inquireElementHeight} inputHintText="请输入金额" />
                    <div style={{ marginTop: "60px" }}>
                        <input type="button" value="确认" onClick={this.insertUserData} style={{ width: btnWidth, height: "30px", marginLeft: inquireElementWidth + 4 - btnWidth }} />
                    </div>
                </div>
            </div>
        );
    }
});

var InquireLeftPageContent = React.createClass({
    render: function () {
        var self = this;
        var colorList = ["green", "blue", "red"];
        var costsList = self.props.operatorItems.map(function (item, index) {
            var liStyle = {
                display: "block",
                margin: "3px 0",
                height: "45px",
                lineHeight: "2em",
                fontSize: "larger",
                fontWeight: "600",
                fontFamily: "宋体",
                color: colorList[index % 3]
            };
            var clickAction = null;
            switch (index) {
                case 0:
                    clickAction = appActions.isShowInquireDiv();
                    break;
                case 1:
                    clickAction = appActions.canDeleteItem();
                    break;
                case 2:
                    clickAction = ActionCreators.undo();
                    break;
                case 3:
                    clickAction = ActionCreators.redo();
                    break;
            }
            var f = function () {
                self.props.dispatch(clickAction);
            } ;
            return (
                <li onClick={f} key={index} style={liStyle}>&nbsp;{item}</li>
            );
        });
        return (
            <div>
                <MyInquireDiv initialDivState={self.props.showInquireDiv} dispatch={self.props.dispatch} />
                <ul ref="costsListUl" id="costsListUl" style={{ marginTop: "186px" }}>
                    {costsList}
                </ul>
            </div>
        );
    }
});

export default InquireLeftPageContent