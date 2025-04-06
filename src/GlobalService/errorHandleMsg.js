export const errorHandleMsg=(error)=>{
    if (error.response) {
        switch (error.response.status) {
            case 404:
                return 'Resource not found';                
                 
            case 500:
                return 'Server error'; 
                
            case 401:
                return 'Invalid Credientials';     
                 
            default:
                if(error?.response?.data?.message){
                    return error?.response?.data?.message;
                }
                return 'An unexpected error occurred';
                
        }
    } else {
        return 'Network error';        
    }
}