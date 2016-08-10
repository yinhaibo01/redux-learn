import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { todoApp } from './reducers'

let store = createStore(todoApp);

var LikeButton = React.createClass({
    getInitialState: function() {
        // return {liked: false};
        store.subscribe(() =>
            this.setState(store.getState())
        );
        return store.getState();
    },
    handleClick: function(event) {
        // this.setState({liked: !this.state.liked});
        store.dispatch({ type: 'doclick'});
    },
    render: function() {
        var text = this.state.liked ? 'like' : 'haven\'t liked';
        return (
            <p onClick={this.handleClick}>
                You {text} this. Click to toggle.
            </p>
        );
    }
});




render(
    <LikeButton ref="thisbutton"/>,
    document.getElementById('example')
);