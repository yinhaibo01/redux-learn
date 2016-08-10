import React from "react";
import ReactDOM from "react-dom";
import { Provider, connect } from "react-redux";
import { createStore } from "redux";


import InquireLeftPageContent from "./leftModel";
import InquireCenterPageContent from "./centerModel";
import updateUserData from "./reducers";


let store = createStore(updateUserData);

var App = React.createClass({
    render: function () {
        var operatorItems = ["插入", "删除", "撤销", "重做"];

        var uiOptions = this.props.uiOptions;
        return (
            <div>
                <div style={{height: "800px"}}>
                    <div className="frame-div" style={{ width: "20%" }}>
                        <InquireLeftPageContent
                            operatorItems={operatorItems}
                            showInquireDiv={uiOptions.showInquireDiv}
                            dispatch={this.props.dispatch} />
                    </div>
                    <div className="frame-div" style={{ width: "60%" }}>
                        <InquireCenterPageContent
                            activeRowIndex={uiOptions.activeRowIndex}
                            activeColumnIndex={uiOptions.activeColumnIndex}
                            canDeleteItem={uiOptions.canDeleteItem}
                            canEditText={uiOptions.canEditText}
                            userData={this.props.userData.present}
                            dispatch={this.props.dispatch} />
                    </div>
                    <div className="frame-div" style={{ width: "20%" }}></div>
                </div>
            </div>
        );
    }
});

function mapStateToProps(state) {
    return state;
}

var AppWrapper = connect(mapStateToProps)(App);


ReactDOM.render(
    <Provider store={store}>
        <AppWrapper />
    </Provider>,
    document.getElementById("sample")
);