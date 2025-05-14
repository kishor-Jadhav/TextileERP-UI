import React,{useState} from "react";
import HeaderMenue from "./HeaderMenueComponent";
import { Card } from 'primereact/card';
import { getHeaderConfig } from "../Config/ApplicationConfig";
import { Outlet,useNavigate } from "react-router-dom";

const ApplicationDashboad = ({handleSignOutEvent})=>{
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const headerConfig = getHeaderConfig(navigate, setSearchTerm); // dynamic config
    const handleSignOut=()=>{
        handleSignOutEvent(false);
    }
    return(<>
     <HeaderMenue config={headerConfig}></HeaderMenue>
     
        <div className="m-3">
        <Outlet /> 
        </div>
     
       
        </>)
   
}
export default ApplicationDashboad
    