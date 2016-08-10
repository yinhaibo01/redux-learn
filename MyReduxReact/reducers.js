export function todoApp (state = {}, action) {
    switch (action.type) {
        case 'doclick':
            return { liked: !state.liked };
        default:
            return state;
    }

}