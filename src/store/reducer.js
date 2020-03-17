const initialState = {
    userData: {
        user: {},
        savedTracks: [],
        savedAlbums: [],
        playlists: [],
        following: []
    },
    newUserData: {},
    authLoadData: false,
    step: 0,
    dataAdded: false,
    newAuth: false,
    migrationComplete: false
};

const reducer = (state = initialState, action) => {
    const newState = {...state};

    if (action.type === "TOGGLE_LOAD") {
        newState.authLoadData = action.bool;
    } else if (action.type === "SET_USER_DATA") {
        newState.userData = action.userData;
    } else if (action.type === "NEXT_CARD") {
        newState.step++;
    } else if (action.type === "PREV_CARD") {
        newState.step--;
    } else if (action.type === "DATA_SET") {
        newState.dataAdded = true;
    } else if (action.type === "SET_STEP") {
        newState.step = action.step;
    } else if (action.type === "NEW_AUTH") {
        newState.newAuth = true;
    } else if (action.type === "NEW_USER") {
        newState.newUserData = action.newUserData;
    }

    return newState;
};

export default reducer;