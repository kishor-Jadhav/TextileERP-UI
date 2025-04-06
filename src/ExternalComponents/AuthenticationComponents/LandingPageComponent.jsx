import React,{useState,useEffect} from "react";
import SignInComponent from "./SignInComponent";

const LandingPageComponent =({handleLoginEvent})=>{
 const [isSignIn,setSignIn] = useState(true);
 useEffect(()=>{
  localStorage.removeItem("authtoken");
},[])
 const handleLoginSuccessEvent=(value)=>{
  handleLoginEvent(value);
}
    return(<>
      <div className="container-fluid h-custom">
         <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-6 my-lg-5 py-lg-5">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid"
              alt="Sample image"
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-5 offset-xl-1 my-lg-5 py-lg-5">
          <SignInComponent handleLoginSuccessEvent={handleLoginSuccessEvent}/>
          </div>
        </div>
      </div>
    </>)
}
export default LandingPageComponent;