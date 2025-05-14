import React, { useState, useEffect } from "react";
import "../../CommonCss/_formStyle.scss";
import {
  Panel,
  InputText,
  useForm,
  Button,
} from "./../../CommonImports/commonImports";
import FormActionContainer from "../FormActionContainer";
import { LoomMasterService } from "../../Services/CommonService/ApiService";
import PanelHeaderWithBack from "../../SharedComponents/PanelHeaderWithBack";
import CommonDataTable from "../../SharedComponents/CommonDatatable";
import CustomFormActionContainer from "../CustomFormActionContainer";
import { UNIT_ID } from "../../Constants/ApplicationConstants/ApplicationConstants";

const LoomMaster = () => {
  const initFormData = {
    loomMasterId: "",
    prefix: "",
    noOfLoom: "",
  };

  const shiftDropdownOptions = [
        { label: '2nd Shift', value: '1' },
        { label: '3rd Shift', value: '2' },
    ]

  const [action, setAction] = useState("view");
  const [dtAction, setDtAction] = useState("");
  const [loomData, setLoomData] = useState([]);
  const [addLoomData, setAddLoomData] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [operation, setOperation] = useState();
  const [toastAction, setToastAction] = useState();

  const columns = [
    {
      field: "srNo",
      header: "SR No",
      colType: "text",
      isVisible: true,
      width: "10%",
      isFilterApply: false,
      isSortApply: false,
    },
    {
      field: "loomNo",
      header: "Loom No",
      colType: "text",
      isVisible: true,
      width: "30%",
      isFilterApply: false,
      isSortApply: false,
    },
    {
      field: "shiftMaster.shiftName",
      header: "Shift",
      colType: "text",
      isVisible: true,
      width: "50%",
      isFilterApply: false,
      isSortApply: false,
    },
    
  ];

  const columnsAdd = [
    {
      field: "srNo",
      header: "SR No",
      colType: "text",
      isVisible: true,
      width: "10%",
      isFilterApply: false,
      isSortApply: false,
    },
    {
      field: "loomNo",
      header: "Loom No",
      colType: "text",
      isVisible: true,
      width: "50%",
      isFilterApply: false,
      isSortApply: false,
    },
    {
      field: "shiftName",
      header: "Shift",
      colType: "text",
      isVisible: true,
      width: "50%",
      isFilterApply: false,
      isSortApply: false,
      dropdownOptions: shiftDropdownOptions
    },
    {
      field: "",
      header: "Delete",
      colType: "button",
      isVisible: true,
      classStyleName: "edit-btn",
      width: "50px",
      isFilterApply: false,
      isSortApply: false,
      action:"delete-loom"
    },
  ];

  const [dtColumns, setDtColumns] = useState(columns);
  const [dtColumnsAdd, setDtColumnsAdd] = useState(columnsAdd);
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: initFormData,
  });

  useEffect(() => {
    getLoomMasterData();
  }, [action]);

  const getLoomMasterData = () => {
    LoomMasterService.getLoomMasterData().then((data) => {
      data?.forEach((item, index) => {
        item.srNo = index + 1;
      });
      setLoomData(data || []);
      
    });
  };

  useEffect(() => {
  setupAddLoomData();
  }, [loomData]);

  useEffect(() => {
    if (dtAction.col?.action == "delete-loom") {
      const loomId = dtAction.rowData.loomMasterId;
      LoomMasterService.deleteLoomMasterData(loomId).then((data) => {
        getLoomMasterData();
      });
    }
  }, [dtAction]);

  useEffect(() => {
    if (action === "add") {
      reset(initFormData); // reset form on add   
       const dtColumnsEditConfig =dtColumnsAdd;
      dtColumnsEditConfig.forEach((item)=>{
        if(item.field=="loomNo"){
          item.colType="text-edit";
          item.fieldType="text";
        }
         if(item.field=="shiftName"){
          item.colType="text-edit";
          item.fieldType="dropdown-edit";
        }
      })       
      setDtColumnsAdd(dtColumnsEditConfig);   
      setAddLoomData([]); 
    }
    if (action === "edit") {
      setupAddLoomData();
      const dtColumnsEditConfig =dtColumnsAdd;
      dtColumnsEditConfig.forEach((item)=>{
        if(item.field=="loomNo"){
          item.colType="text-edit";
          item.fieldType="text";
        }
        if(item.field=="shiftName"){
          item.colType="text-edit";
          item.fieldType="dropdown-edit";
        }
      })       
      setDtColumnsAdd(dtColumnsEditConfig);
    }
  }, [action, reset]);

  const setupAddLoomData=()=>{
     loomData.forEach((item)=>{
        item.shiftId= item.shiftMaster.shiftId;
        item.shiftName= item.shiftMaster.shiftName;
      })
      setAddLoomData([...loomData]); // reset form on add
  }

  const actionTableBtn = (dt) => {
    setDtAction(dt);
    
  };

  const actionClick = (dt) => {
    setAction(dt);
  };

  const operationClick = (operation) => {
    setOperation(operation);
    if (operation === "cancel") {
      setAction("view");
    }
    if (operation === "save") {
      handleSubmit(onSubmit, onError)(); // trigger form submit
    }
  };

  const onError = (errors) => {
    if (Object.keys(errors).length > 0) {
      setToastAction("error"); // Pass this to FormActionContainer for toast
    }
  };

  const onSubmit = async (data) => {
    console.log("save Successful:", data);
    
     if (action === "add" || action === "edit") {
       const dgData = addLoomData;
      dgData.forEach((item)=>{
        item.loomMasterId = "";
        item.unitId = UNIT_ID;
      })
       await LoomMasterService.saveLoomMaster(dgData);
       setToastAction("save");
       setAction("view");
     }
   
  };

  const handleGenerate = (e) => {
    const { prefix, noOfLoom } = getValues();
    const numLoom = parseInt(noOfLoom);
    if (isNaN(numLoom) || numLoom <= 0) {
      alert("No Of Looms should be a positive number");
      return;
    }

    const generatedLooms = [];
    for (let i = 1; i <= numLoom; i++) {
      generatedLooms.push({
        srNo: i,
        loomNo: `${prefix}${i.toString().padStart(2, "0")}`, // example: PR01, PR02
        shiftId: "1",
        shiftName: "2st shift",
      });
    }

    setAddLoomData(generatedLooms);
  };

  const handleInserRow =()=>{
    const { prefix } = getValues();
    const i = addLoomData?.length || 0;
    
    const newRow = {
      loomMasterId: i + 1,
      srNo: i + 1,
      loomNo: `${prefix}${(i + 1).toString().padStart(2, "0")}`, // example: PR01, PR02
      shiftId: "1",
      shiftName: "2st shift",
    };
    
    setAddLoomData([...addLoomData, newRow]);
  }

  const onCellEditComplete = (e) => {
    let { rowData, newValue, field } = e;
    
     console.log(rowData)
     console.log(newValue)
     console.log(field)

     const data =addLoomData;
     data.forEach((item) => {
       if (item.loomNo == rowData.loomNo) {
         if (field == "loomNo") {
           item.loomNo = newValue;
         }
         if (field == "shiftName") {
           item.shiftId = newValue;
           item.shiftName = shiftDropdownOptions.filter(
             (item) => item.value == newValue
           )[0].label;
         }
       }
     });       
     setAddLoomData(data);
     
};

  return (
    <>
      <Panel
        header={
          <PanelHeaderWithBack
            action={action}
            title="Loom Master"
            onBack={() => setAction("view")}
          />
        }
        style={{ width: "50%" }}
      >
        <CustomFormActionContainer
          action={action}
          dataList={loomData}
          actionClick={actionClick}
          operationClick={operationClick}
          toastAction={toastAction}
          setToastAction={setToastAction}
        />

        {action === "view" && (
          <div>
            <CommonDataTable
              dataList={loomData}
              columnConfig={dtColumns}
              action={action}
              actionClick={actionClick}
              actionTableBtn={actionTableBtn}
            />
          </div>
        )}

        {(action === "add" || action === "edit") && (
          <div>
            <form id="loomMaster-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="m-0 form-container">
                <div
                  className="form-section"
                  style={{ flexDirection: "column" }}
                >
                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: "85px" }}>
                      Prefix:
                    </label>
                    <InputText
                      id="prefix"
                      type="text"
                      {...register("prefix")}
                      className={`p-inputtext-sm`}
                      disabled={action === "edit"}
                    />
                  </div>

                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: "85px" }}>
                      No Of Looms:
                    </label>
                    <InputText
                      id="noOfLoom"
                      type="text"
                      {...register("noOfLoom")}
                      className={`p-inputtext-sm`}
                      disabled={action === "edit"}
                    />
                    <Button
                      className="btn-action"
                      label="Generate"
                      onClick={handleGenerate}
                      severity="danger"
                      text
                      type="button"
                    />
                  </div>
                  <div>
                    <CommonDataTable
                      dataList={addLoomData}
                      getOnCellEditComplete={onCellEditComplete}
                      columnConfig={dtColumnsAdd}
                      action={action}
                      actionClick={actionClick}
                      actionTableBtn={actionTableBtn}
                    />
                  </div>
                  <div>
                  <Button
                      className="btn-action"
                      label="Insert Row"
                      onClick={handleInserRow}
                      severity="success"                      
                      type="button"
                      style={{margin:'20px'}}
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}
      </Panel>
    </>
  );
};

export default LoomMaster;
