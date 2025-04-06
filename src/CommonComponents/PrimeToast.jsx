import React,{ useRef, useImperativeHandle, forwardRef } from "react";
import {Toast } from "../CommonImports/commonImports";
import { ERROR, INFO, SUCCESS, WARN } from "../Constants/SharedConstants";
const PrimeToast = forwardRef((props, ref) => {
    const toast = useRef(null);
  
    // Expose the show function to parent components
    useImperativeHandle(ref, () => ({
      show: ({ msgType, summary, detail, life = 3000 }) => {
        let toastMessage;
        if(msgType == SUCCESS){
          toastMessage = {
            severity: msgType, // success, error, info, warn
            summary: summary? summary :"Success",
            detail: detail,
            life: life,  
          };
        }
        if(msgType == ERROR){
          toastMessage = {
            severity: msgType, // success, error, info, warn
            summary: summary? summary :"Error",
            detail: detail,
            life: life,  
          };
        }
        if(msgType == INFO){
          toastMessage = {
            severity: msgType, // success, error, info, warn
            summary:  summary? summary :"Info",
            detail: detail,
            life: life,  
          };
        }
        if(msgType == WARN){
          toastMessage = {
            severity: msgType, // success, error, info, warn
            summary:  summary? summary :"Attention",
            detail: detail,
            life: life,  
          };
        }
        toast.current.show(toastMessage);
      },
    }));
  
    return <Toast ref={toast} />;
  });
  export default PrimeToast