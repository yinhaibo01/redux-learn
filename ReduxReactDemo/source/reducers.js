/**
 * Created by ZeroZhang on 8/9/2016.
 */

import undoable, {includeAction} from 'redux-undo'
import {combineReducers} from 'redux'
import * as actionType from "./actions";
import WaterCostsData from "./data";


function sortData(data) {
    for (let i = 0; i < data.length; i++) {
        for (let j = i + 1; j < data.length; j++) {
            if (data[i][0] < data[j][0]) {
                let temp = data[j];
                data[j] = data[i];
                data[i] = temp;
            }
        }
    }
    return data.map(function (item) {
        return {
            data: item,
            show: true
        }
    });
}
var initData = {
    userData: sortData(WaterCostsData),
    uiOptions: {
        canDeleteItem: false,
        canEditText: false,
        showInquireDiv: false,
        activeRowIndex: -1,
        activeColumnIndex: -1
    }
}

function updateUserData(state = initData.userData, action) {
    var newDataArray = [...state];

    switch (action.type) {
        case actionType.ADD_DATA_ITEM:
            var dataItem = action.dataItem;
            var lastItem = state[state.length - 1];
            var money = parseInt(dataItem.money);
            var newUserDataItem = [dataItem.date, lastItem.data[1] + money * 0.38, lastItem.data[2], money];
            return [{data: newUserDataItem, show: true}, ...state];

        case actionType.REMOVE_DATA_ITEM:
            newDataArray[action.itemIndex] = Object.assign({}, state[action.itemIndex], {show: false});
            return newDataArray;
        case actionType.UPDATE_DATA_CONTENT:
            newDataArray[action.rowIndex] = Object.assign({}, state[action.rowIndex]);
            newDataArray[action.rowIndex].data = [...state[action.rowIndex].data];
            newDataArray[action.rowIndex].data[action.colIndex] = action.newData;
            return newDataArray;
        default:
            return state;
    }
}

function updateUI(state = initData.uiOptions, action) {
    switch (action.type) {
        case actionType.CAN_DELETE_ITEM:
            let canDelete = state.canDeleteItem;
            return Object.assign({}, state, {
                canDeleteItem: !canDelete
            });
        case actionType.CAN_EDIT_TEXT:
            let canEdit = state.canEditText;
            return Object.assign({}, state, {
                canEditText: !canEdit
            });
        case actionType.IS_SHOW_INQUIRE_DIV:
            let showDiv = state.showInquireDiv;
            return Object.assign({}, state, {
                showInquireDiv: !showDiv
            });
        case actionType.ACTIVE_ROW_INDEX:
            return Object.assign({}, state, {
                activeRowIndex: action.row
            });
        case actionType.ACTIVE_COLUMN_INDEX:
            return Object.assign({}, state, {
                activeColumnIndex: action.column
            });
        default:
            return state;
    }
}


const todoApp = combineReducers({
    uiOptions: updateUI,
    userData: undoable(updateUserData, {filter: includeAction([actionType.ADD_DATA_ITEM, actionType.REMOVE_DATA_ITEM, actionType.UPDATE_DATA_CONTENT])})
});

export default todoApp