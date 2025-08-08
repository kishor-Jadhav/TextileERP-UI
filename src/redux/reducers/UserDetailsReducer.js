import { FETCH_USER_FAIL, FETCH_USER_LIST_REQUEST, FETCH_USER_LIST_SUCCESS, FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USERCONFIG_REQUEST, FETCH_USERCONFIG_SUCCESS, FETCH_USERCONFIG_FAIL } from "../StoreConstants";

const initialState = {
    loading: false,
    loginUserDetails: {},
    userConfigData: {},
    userList: [],
    error: null
}

const UserDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_REQUEST:
            return {...state, loading: true, error: null }
        case FETCH_USER_SUCCESS:
            return {...state, loading: false, loginUserDetails: action.payload };
        case FETCH_USER_FAIL:
            return {...state, loading: false, error: action.payload }
        case FETCH_USER_LIST_REQUEST:
            return {...state, loading: true, error: null }
        case FETCH_USER_LIST_SUCCESS:
            return {...state, loading: true, userList: action.payload }
        case FETCH_USER_REQUEST:
            return {...state, loading: true, error: null }
        case FETCH_USERCONFIG_REQUEST:
            return {...state, loading: true, error: null }
        case FETCH_USERCONFIG_SUCCESS:
            return {...state, loading: false, userConfigData: action.payload };
        case FETCH_USERCONFIG_FAIL:
            return {...state, loading: false, error: action.payload }
        default:
            return state;
    }
}

export default UserDetailsReducer;