import React,{useState} from "react";
import HeaderMenue from "./HeaderMenueComponent";
import { headerConfig } from "../Config/ApplicationConfig";

const ApplicationDashboad = ({handleSignOutEvent})=>{
    const [searchTerm, setSearchTerm] = useState("");
  
   
    const handleSignOut=()=>{
        handleSignOutEvent(false);
    }
    return(<>
     <HeaderMenue config={headerConfig}></HeaderMenue>
     <h1> Dashboard Page</h1>
     <button
                  type="button"                  
                  className="btn btn-primary btn-lg"                 
                  onClick={handleSignOut}
                >
                 Login 
                </button>
        </>)
   
}
export default ApplicationDashboad
    