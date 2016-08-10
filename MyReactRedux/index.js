import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { todoApp } from './reducers'
import { Provider, connect } from 'react-redux'

let store = createStore(todoApp);

var LikeButton = React.createClass({
    render: function() {
        var text = this.props.liked ? 'like' : 'haven\'t liked';
        return (
            <p onClick={event => this.props.dispatch({ type: 'doclick'})}>
                You {text} this. Click to toggle.
            </p>
        );
    }
});

function select(state) {
    return state;
}

var WrappedLikeButton = connect(select)(LikeButton);


render(
    <Provider store = {store}>
        <WrappedLikeButton/>
    </Provider>,
    document.getElementById('example')
);