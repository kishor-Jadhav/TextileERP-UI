import React, { createContext, useState } from 'react';

const ApplicationContext = createContext();

const ApplicationProvider = ({ children }) => {
    const userDetails = {userName:'',emailId:''};
    const [loadAppLoader, setloadAppLoader] = useState(false);
    const [showAPageLoader, setShowAPageLoader] = useState(true);
     
    const [appContextuserDetails, setAppContextuserDetails] = useState(userDetails);
    const [headerRequestContentType, setHeaderRequestContentType] = useState(true);
    return (
      <ApplicationContext.Provider
        value={{
                loadAppLoader,setloadAppLoader,
                
                showAPageLoader,setShowAPageLoader,               
                 
                appContextuserDetails, setAppContextuserDetails,

                headerRequestContentType, setHeaderRequestContentType
                 
        }}
      >
        {children}
      </ApplicationContext.Provider>
    );
};

export { ApplicationContext, ApplicationProvider };