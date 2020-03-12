const initialState = {
    userData: {
        user: {},
        savedTracks: [],
        savedAlbums: [],
        playlists: [],
        following: []
    },
    authLoadData: false,
    step: 0,
    dataAdded: false
};

const reducer = (state = initialState, action) => {
    const newState = {...state};

    if (action.type === "TOGGLE_LOAD") {
        console.log("\nchanging authLoadData in redux store to true...\n");
        newState.authLoadData = action.bool;
    } else if (action.type === "SET_USER_DATA") {
        console.log("\nsetting user data in redux store...\n");
        newState.userData = action.userData;
    } else if (action.type === "NEXT_CARD") {
        newState.step++;
    } else if (action.type === "PREV_CARD") {
        newState.step--;
    } else if (action.type === "DATA_SET") {
        newState.dataAdded = true;
    } else if (action.type === "SET_STEP") {
        newState.step = action.step;
    }

    return newState;
};

export default reducer;