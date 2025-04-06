import axiosInstance from "../../GlobalService/axiosConfig";
import { COMMON_APIS, TEST_APIS } from "../../Constants/ApplicationConstants/ApplicationConstants";
export const signIn= async(payload) =>{
    
    try {
        const response = await axiosInstance.post(COMMON_APIS.signInApi, payload);        
        if (response) {
            localStorage.setItem('authtoken', response.data.authToken
            ); 
            //toast.success("Registration successful!");
            return response.data;
        }
        console.error(response);
    } catch (error) {       
        throw error;
    }
}

export const getAdminUserList= async() =>{
    
    try {
        const response = await axiosInstance.get(TEST_APIS.getadmin);        
        if (response) {
             
            return response.data;
        }
        console.error(response);
    } catch (error) {       
       // throw error;
       return {error:"Somethig went wrong"}
    }
} 
export const getUserList= async() =>{
    
    try {
        const response = await axiosInstance.get(TEST_APIS.getuser);        
        if (response) {
             
            return response.data;
        }
        console.error(response);
    } catch (error) {       
      //  throw error;
      return {error:"Somethig went wrong"}
    }
}
export default signIn;