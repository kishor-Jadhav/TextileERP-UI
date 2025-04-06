import { FETCH_USER_FAIL, FETCH_USER_LIST_REQUEST, FETCH_USER_LIST_SUCCESS, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from "../StoreConstants";

const initialState ={
    loading: false,
    loginUserDetails:{},
    userList:[],
    error: null
  }
  
  const UserDetailsReducer = ( state = initialState, action) =>{
    switch (action.type){
      case FETCH_USER_REQUEST:
        return {...state, loading: true, error: null}
      case FETCH_USER_SUCCESS:
        return {...state, loading: false, loginUserDetails:action.payload};
      case FETCH_USER_FAIL:
        return {...state, loading: false, error: action.payload}  
      case FETCH_USER_LIST_REQUEST:
        return {...state, loading: true, error: null}
      case FETCH_USER_LIST_SUCCESS:  
        return {...state, loading: true, userList: action.payload}
      default: return state;
    }
  }
  
  export default UserDetailsReducer;