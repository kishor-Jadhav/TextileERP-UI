import { useContext, useEffect } from "react";
import { ApplicationContext } from "../Context/applicationGlobalContext";
import axiosInstance from "../GlobalService/axiosConfig";
import { errorHandleMsg } from "../GlobalService/errorHandleMsg";
import { toast } from "react-toastify";
const ApplicationInterceptor =({ children })=>{
    const {headerRequestContentType, setHeaderRequestContentType,setloadAppLoader,showAPageLoader}= useContext(ApplicationContext);   

    useEffect(() => {
      // Add a request interceptor
      axiosInstance.interceptors.request.use(
        (config) => {
            if(showAPageLoader){
                setloadAppLoader(true);
            }
          
          // Get the JWT token from local storage or any other storage mechanism
          const token = localStorage.getItem("authtoken");
  
          if (token) {
            // If token is available, set it in the Authorization header
            config.headers["Authorization"] = `Bearer ${token}`;
          }
         
  
          return config;
        },
        (error) => {
          setloadAppLoader(false);           
          // Handle request error
          return Promise.reject(error);
        }
      );
  
      // Optionally, you can also add a response interceptor to handle errors globally
      axiosInstance.interceptors.response.use(
        (response) => {
          setHeaderRequestContentType(null);
          setloadAppLoader(false);
          return response;
        },
        (error) => {
          setHeaderRequestContentType(null);
          setloadAppLoader(false);
          const errorMsg = errorHandleMsg(error);
          toast.error(errorMsg); 
          // Handle response error
          if (error?.response?.status === 401) {
            // Handle unauthorized access, e.g., redirect to login page
            console.log("Unauthorized, redirecting to login...");
            // You can also dispatch a logout action or remove the token
            localStorage.removeItem("authtoken");
            
          }
          return Promise.reject(error);
        }
      );
    }, []);
    return <div>{children}</div>;
}
export default ApplicationInterceptor;