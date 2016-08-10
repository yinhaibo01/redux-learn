import React from "react";
import * as appActions from "./actions";


var MyText = React.createClass({
    render: function () {
        return (
            <span style={{ fontSize: this.props.textSize, fontWeight: this.props.textWeight }}>{this.props.textContent}</span>
        );
    }
});

var MyTextTd = React.createClass({
    render: function () {
        return (
            <th>
                <MyText textContent={this.props.tdContent} />
            </th>
        );
    }
});

var MyTd = React.createClass({
    saveText: function (event) {
        if(event.keyCode === 108 || event.keyCode === 13) {
            this.props.dispatch(appActions.updateDataContent(this.props.trIndex, this.props.tdIndex, this.refs.textbox.value));
            this.props.dispatch(appActions.canEditText());
        }
    },
    editCell: function () {
        this.props.dispatch(appActions.setActiveRowIndex(this.props.trIndex));
        this.props.dispatch(appActions.setActiveColumnIndex(this.props.tdIndex));

        this.props.dispatch(appActions.canEditText());
    },
    render: function () {
        var tdData = this.props.tdData;
        var tdChild;
        if(this.props.canEditText && this.props.trIndex === this.props.activeRowIndex && this.props.tdIndex === this.props.activeColumnIndex) {
            tdChild = <input type="text" ref="textbox" defaultValue={tdData} />;
        } else {
            tdChild = <span>{tdData}</span>;
        }

        return (
            <td onDoubleClick={this.editCell} onKeyUp={this.saveText}>{tdChild}</td>
        );
    }
});

var MyTr = React.createClass({
    render: function () {
        var self = this;
        var tdList = self.props.trData.data.map(function(item, tdIndex) {
            return (
                <MyTd key={item} tdData={item} trIndex={self.props.trIndex} tdIndex={tdIndex} activeRowIndex={self.props.activeRowIndex} activeColumnIndex={self.props.activeColumnIndex} canEditText={self.props.canEditText} dispatch={self.props.dispatch} />
            );
        });
        var deleteButtonState = { display: self.props.canDeleteItem ? "block" : "none" };
        return (
            <tr>
                {tdList}
                <td>
                    <input type="button" value="删除" onClick={() => self.props.dispatch(appActions.removeDataItem(self.props.trIndex))} style={deleteButtonState} />
                </td>
            </tr>
        );
    }
});

var MyTbody = React.createClass({
    render: function () {
        var self = this;
        var trList = self.props.userData.map(function(item, index) {
            if(item.show) {
                return (
                    <MyTr key={"MyTr" + index} trData={item} trIndex={index} activeRowIndex={self.props.activeRowIndex} activeColumnIndex={self.props.activeColumnIndex} canDeleteItem={self.props.canDeleteItem} canEditText={self.props.canEditText} dispatch={self.props.dispatch} />
                );
            }
        });
        return (
            <tbody style={{ textAlign: "center" }}>
                {trList}
            </tbody>
        );
    }
});

var InquireInfoContent = React.createClass({
    render: function () {
        return (
            <div style={{ height: "500px", overflow: "auto", marginTop: "20px" }}>
                <table id="dataTable" style={{ width: "100%", border: "solid 2px lightgrey" }}>
                    <thead>
                        <tr>
                            <MyTextTd tdContent="日期" />
                            <MyTextTd tdContent="剩余量" />
                            <MyTextTd tdContent="使用量" />
                            <MyTextTd tdContent="缴费金额（元）" />
                        </tr>
                    </thead>
                    <MyTbody activeRowIndex={this.props.activeRowIndex} activeColumnIndex={this.props.activeColumnIndex} canDeleteItem={this.props.canDeleteItem} canEditText={this.props.canEditText} userData={this.props.userData} dispatch={this.props.dispatch} />
                </table>
            </div>
        );
    }
});

var InquireCenterPageContent = React.createClass({
    render: function () {
        return (
            <div>
                <div style={{ textAlign: "center", marginTop: "120px" }}>
                    <MyText textWeight="bold" textContent="xxx 系统" textSize="x-large" textMargin="60px" />
                </div>
                <InquireInfoContent activeRowIndex={this.props.activeRowIndex} activeColumnIndex={this.props.activeColumnIndex} canDeleteItem={this.props.canDeleteItem} canEditText={this.props.canEditText} userData={this.props.userData} dispatch={this.props.dispatch} />
            </div>
        );
    }
});

export default InquireCenterPageContent