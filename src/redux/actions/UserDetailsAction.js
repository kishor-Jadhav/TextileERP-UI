import axios from 'axios';
import { FETCH_USER_FAIL, FETCH_USER_LIST_REQUEST, FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USERCONFIG_REQUEST, FETCH_USERCONFIG_SUCCESS, FETCH_USERCONFIG_FAIL } from '../StoreConstants';
import { COMMON_APIS, TEST_APIS,ERP_APIS } from '../../Constants/ApplicationConstants/ApplicationConstants';
import axiosInstance from '../../GlobalService/axiosConfig';
export const fetchLoginUserDetails = (reqPayload) => {
    return async(dispatch) => {
        dispatch({ type: FETCH_USER_REQUEST });
        try {
            const response = await axiosInstance.post(COMMON_APIS.signInApi, reqPayload);
            console.log(response);
            dispatch({ type: FETCH_USER_SUCCESS, payload: response?.data });
        } catch (error) {
            dispatch({ type: FETCH_USER_FAIL, payload: error?.message });
        }
    };
};

export const fetchUserList = () => {
    return async(dispatch) => {
        dispatch({ type: FETCH_USER_LIST_REQUEST });
        try {
            const response = await axiosInstance.get(TEST_APIS.getadmin);
            console.log(response);
            dispatch({ type: FETCH_USER_LIST_SUCCESS, payload: response?.data });
        } catch (error) {
            dispatch({ type: FETCH_USER_FAIL, payload: error?.message });
        }
    };
};

export const fetchUserConfig = () => {
    return async(dispatch) => {
        dispatch({ type: FETCH_USERCONFIG_REQUEST });
        try {
            const response = await axiosInstance.get(`${ERP_APIS.getuserconfig}`);
             
            dispatch({ type: FETCH_USERCONFIG_SUCCESS, payload: response?.data });
        } catch (error) {
            dispatch({ type: FETCH_USERCONFIG_FAIL, payload: error?.message });
        }
    };
};