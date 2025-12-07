import React, { useState, useEffect } from "react";
import HeaderMenue from "./HeaderMenueComponent";
import { Card } from 'primereact/card';
import { getHeaderConfig } from "../Config/ApplicationConfig";
import { Outlet, useNavigate } from "react-router-dom";
import { utilityService } from "../Services/CommonService/ApiService";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserConfig } from "../redux/actions/UserDetailsAction";

const ApplicationDashboad = ({ handleSignOutEvent }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [userConfigDetails, setUserConfigDetails] = useState();
    const [menuBarDetails, setMenuBarDetails] = useState([]);
    const [headerConfigState, setHeaderConfigState] = useState({
    "title": {
        
    },
    "leftLogo": {
        
    },
    "menuItems": [],
    "endButtons": {
        
    },
    "rightSearchBox": {
        
    },
    "profileMenu": {
       
    }
});
    const navigate = useNavigate();
    
   // const [headerConfigState, setHeaderConfigState] = useState(
    //getHeaderConfig1(navigate, setSearchTerm));
    
    
    const dispatch = useDispatch();
    const { loading, loginUserDetails, error, userConfigData } = useSelector(
        (store) => store.userDetails
    );
    const handleSignOut = () => {
        handleSignOutEvent(false);
    }
    useEffect(() => {
         console.log("userConfigData ---");
         console.log(userConfigData);
         if(userConfigData?.userMenuGroupDetailMaster){
            if(menuBarDetails.length == 0){
                const menuItems = userConfigData?.userMenuGroupDetailMaster || [];
                setMenuBarDetails([...menuItems]);
                const headerConfig = getHeaderConfig(navigate,userConfigData?.userMenuGroupDetailMaster, setSearchTerm);
                setHeaderConfigState(headerConfig); 
            }
           
        }
      
        return () => {
             
        }
    }, [userConfigData])
    useEffect(() => {
        dispatch(fetchUserConfig());
        return () => {
            // cleanup if needed
        }
    }, []); // Only run once on mount
    return (<>
        
        {(headerConfigState?.menuItems?.length > 0) && (
            <HeaderMenue config={headerConfigState}></HeaderMenue>)
            }

        <div className="m-3">
            <Outlet />
        </div>


    </>)

}
export default ApplicationDashboad
