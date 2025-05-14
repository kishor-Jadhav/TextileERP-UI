import React, { useEffect, useRef } from "react";
import '../CommonCss/_formStyle.scss' 
import {
    Button,
    InputText,    
  } from "./../CommonImports/commonImports";
import PrimeToast from "../CommonComponents/PrimeToast";
import { ERROR, SUCCESS } from "../Constants/SharedConstants";
const CustomFormActionContainer =(props)=>{
     const {action,actionClick,operationClick,toastAction,setToastAction,dataList} = props;
      const toastRef = useRef(null);
     const handleAction=(data)=>{
      actionClick(data);
     }
     const handleOperation=(operation)=>{
      operationClick(operation);
     }
     useEffect(()=>{
      if (toastRef.current) {
        if(toastAction=='save'){
          const msg = {
            msgType: SUCCESS,
            detail: "New record added successful!",
          };
          toastRef.current.show(msg);
          setTimeout(()=>{
            setToastAction("")
          },3000)
        }
       
        if(toastAction=='error'){
          const msg = {
            msgType: ERROR,
            detail: "Please check mandatory fields!",
          };
          toastRef.current.show(msg);
          setTimeout(()=>{
            setToastAction("")
          },3000)
        }
       
      }
     },[toastAction])
    return(<>
    <PrimeToast ref={toastRef} />
    <div id="header-action">
      {(action=='add' || action=='edit') && (<div className="action-header">
        <div className="action">
            <span className="action-lbl">Action:</span> <span className="action-lbl-val">{ (action=='add')? 'New Record':'Edit Record'}</span> 
        </div>
       <div>
       <Button className="btn-action" label="Save" onClick={() => handleOperation('save')} severity="success" text  />
       <Button className="btn-action" label="Cancel" onClick={() => handleOperation('cancel')} severity="danger" text   />
       </div>
      </div>)}

      {action=='view' && (
        <div className="action-header">
          <div className="action">
              <span className="action-lbl">Action:</span> <span className="action-lbl-val">View</span> 
          </div>
          <div>
          {dataList?.length ==0 && (<>
            <Button className="btn-action" label="Add" onClick={() => handleAction('add')} severity="danger" text   /> 
          </>)}
          {dataList?.length >0 && (<>
            <Button className="btn-action" label="Edit" onClick={() => handleAction('edit')} severity="danger" text   />
          </>)}
          
          </div>
      </div>
    )}
    </div>
    </>)
}

export default CustomFormActionContainer