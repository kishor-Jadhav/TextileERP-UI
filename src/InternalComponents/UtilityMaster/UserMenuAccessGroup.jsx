import React, { useState, useEffect } from "react";
import "../../CommonCss/_formStyle.scss";
import {
  Panel,
  InputText,
  useForm,
  Message,
  Dropdown,
  Controller
} from "./../../CommonImports/commonImports";
import FormActionContainer from "../FormActionContainer";
import { utilityService } from "../../Services/CommonService/ApiService";
import PanelHeaderWithBack from "../../SharedComponents/PanelHeaderWithBack";
import CommonDataTable from "../../SharedComponents/CommonDatatable";
const UserMenuAccessGroup = () => {
  const initFormData = {
    userMenuGroupId: "",
    userGroupName: "",
    activeMenuGroup: "",
    
  };

  const columns = [
    {
      field: "userGroupName",
      header: "User Group",
      colType: "text",
      isVisible: true,
      width: "100px",
      isFilterApply: true,
      isSortApply: true,
    },
	 {
      field: "appClientMaster.clientName",
      header: "Client Name",
      colType: "text",
      isVisible: true,
      width: "100px",
      isFilterApply: true,
      isSortApply: true,
    },
    {
      field: "appClientProjectMaster.projectName",
      header: "Project Name",
      colType: "text",
      isVisible: true,
      width: "100px",
      isFilterApply: true,
      isSortApply: true,
    },

    {
      field: "",
      header: "Edit",
      action: "edit",
      colType: "button",
      isVisible: true,
      classStyleName: "edit-btn",
      width: "50px",
      isFilterApply: true,
      isSortApply: true,
    },
    {
      field: "",
      header: "Delete",
      action: "delete",
      colType: "button",
      isVisible: true,
      classStyleName: "edit-btn",
      width: "50px",
      isFilterApply: true,
      isSortApply: true,
    },
  ];

  const menuDropdownOptions = [];

  const columnsDG = [
    {
      field: "menuName",
      header: "Menu Name",
      colType: "text",       
      isVisible: true,
      width: "200px",
      isFilterApply: false,
      isSortApply: false,
      
    },
    {
        field: "isAdd",
        header: "Is Add",
        colType: "check-box",
        isVisible: true,
        width: "100px",
        isFilterApply: false,
        isSortApply: false,
      },
      {
        field: "isEdit",
        header: "Is Edit",
        colType: "check-box",
        isVisible: true,
        width: "100px",
        isFilterApply: false,
        isSortApply: false,
      },
      {
        field: "isDelete",
        header: "Is Delete",
        colType: "check-box",
        isVisible: true,
        width: "100px",
        isFilterApply: false,
        isSortApply: false,
      },
      {
        field: "isView",
        header: "Is View",
        colType: "check-box",
        isVisible: true,
        width: "100px",
        isFilterApply: false,
        isSortApply: false,
      },
  ];
 
  const [action, setAction] = useState("view");
  const [FormData, setFormData] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [operation, setOperation] = useState();
  const [toastAction, setToastAction] = useState();

  //Form Controll data
  const [selectedFormControll, setSelectedFormControll] = useState({});

  // drop down
  
  const [selectedclientName, setSelectedclientName] = useState({});
  const [drclientNameData, setdrclientNameData] = useState([]);

  const [selectedclientProj, setSelectedclientProj] = useState({});
  const [drclientProjData, setdrclientProjData] = useState([]);

  // Data Table
  const [DGData, setDGData] = useState([]);
  const [dtDGColumns, setDtDGColumns] = useState(columnsDG);
  const [menuDataList, setMenuDataList] = useState([]);
 

  const [dtColumns, setDtColumns] = useState(columns);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: initFormData,
  });

  useEffect(() => {
    if (action == "view") {
      utilityService.getClientMaster().then((data) => setdrclientNameData(data));
      utilityService.getClientProjectMaster().then((data) => setdrclientProjData(data));
      utilityService.getMenuGroupMaster().then((data) => setFormData(data));
      utilityService.getMenuMaster().then((data) => setMenuDataList(data));
    }
  }, [action]);

  useEffect(() => {
    const Id = selectedData?.rowData?.userMenuGroupId;
    if (Id && action === "edit") {
      reset(initFormData);
      utilityService.geteMenuGroupMasterById(Id).then((data) => {
        if (data) {          
          reset(data);
          setValue("clientName", data?.appClientMaster?.clientName);
          setValue("projectName", data?.appClientProjectMaster?.projectName);
		      setValue("userMenuGroupId", Id);
           const userMenuGroupDetailMasterModel = data.userMenuGroupDetailMasterModel;
           
          
        //  console.log("prepareDG:",prepareDG);
          prepaireDGData(userMenuGroupDetailMasterModel);
          setSelectedFormControll(data);
        }
      });
    } else if(action === "add"){
        clearFormData();
        prepaireDGData(menuDataList);
      } else  if (Id && action === "delete") {
        utilityService.deleteMenuGroupMaster(Id).then(() => {
          utilityService.getMenuGroupMaster().then((data) => setFormData(data));  //Refresh data
        });
      }
  }, [selectedData, action, reset]);

  const prepaireDGData = (data) => {
    let getDGColData;
    if(action === "edit"){
      
      const prepareDG = menuDataList;
           prepareDG.forEach((item,index)=>{
            data.forEach((model)=>{
               const userMenuMaster = model.userMenuMaster;
                if(item.menuId == userMenuMaster.menuId){
                 item.userMenuMaster = { ...item };
                 item.rowNo = index;
                 
                 item.isAdd = model.add;
                 item.isEdit = model.edit;
                 item.isView = model.view;
                 item.isDelete = model.delete;
                 item.add = model.add;
                 item.edit = model.edit;
                 item.view = model.view;
                 item.delete = model.delete;
                 
                }
             })
           })
           getDGColData = prepareDG;
    }
    if(action === "add"){
      data.forEach((item,index) => {     
      
        item.userMenuMaster = { ...item };
        item.rowNo = index;
        item.menuId = item.menuId;
        item.menuName = item.menuName;
        item.isAdd = false;
        item.isEdit = false;
        item.isView = false;
        item.isDelete = false;
        item.inActiveMenu = false;
      
    })
    getDGColData = data;
  }
    console.log("getDGData:",getDGColData);
    setDGData(getDGColData);
  }
 

  useEffect(() => {
    if (action === "add") {
      reset(initFormData); // reset form on add
    }
  }, [action, reset]);

  const actionTableBtn = (dt) => {
    setAction(dt?.action);
    setSelectedData(dt);
  };

  const actionClick = (dt) => {
    setAction(dt);
  };
  const operationClick = (operation) => {
    setOperation(operation);
    if (operation === 'cancel') {
      setAction('view');
    }
    if (operation === 'save') {
      handleSubmit(onSubmit, onError)(); // trigger form submit
    }
  };

  const onError = (errors) => {
    if (Object.keys(errors).length > 0) {
      setToastAction('error'); // Pass this to FormActionContainer for toast
    }
  };
  useEffect(() => {
    if (action === "add") {
      clearFormData();
    }
  }, [action, reset]);

  const clearFormData = () => {
    reset(initFormData); // reset form on add    
    setSelectedclientName({});
    setSelectedclientProj({});
    setValue("clientName", null);
    setValue("projectName", null);
    setValue("userMenuGroupId", null);
  };

  const onCellEditComplete = (e) => {
    let { rowData, newValue, field } = e;


    const data = DGData;
    if (field == "menuName") {
      const selectedData = menuDataList.filter(
        (item) => item.value == newValue
      )[0];
      data[rowData?.rowNo][field] = selectedData?.label;
    //   data[rowData?.rowNo].isAdd = selectedData?.isAdd;
    //   data[rowData?.rowNo].isEdit = selectedData?.isEdit;
    //   data[rowData?.rowNo].isView = selectedData?.isView;
    //   data[rowData?.rowNo].isView = selectedData?.isView;
    //   data[rowData?.rowNo].repeat = 1;

    } else {
      data[rowData?.rowNo][field] = newValue;
     
    }
    setDGData(data)

  };
  const onClickDGChk = (data) => {
    let { rowData, field, checked } = data;
  
    // Clone the existing data array to trigger re-render
    const updatedData = [...DGData];
    updatedData[rowData?.rowNo] = {
      ...updatedData[rowData?.rowNo],
      [field]: checked
    };
  
    setDGData(updatedData); // ✅ Triggers re-render
  };
  const onSubmit = async (data) => {
    const payload = data;
    const clentdata = drclientNameData.find((q) => q.clientName === data.clientName); // match selected quality
    payload.appClientMaster = clentdata;
    const clentprojdata = drclientProjData.find((q) => q.projectName === data.projectName); // match selected quality
    payload.appClientProjectMaster = clentprojdata;
    const modifyData =DGData;
    modifyData.forEach((item)=>{
      item.add = item.isAdd;
      item.edit = item.isEdit;
      item.view = item.isView;
      item.delete = item.isDelete;
    })
    payload.userMenuGroupDetailMasterModel = modifyData;
	 
    //payload.userRole = "ROLE_" + payload.userRole;
    console.log("save Successful:", payload);
    if (action === 'add') {
      await utilityService.saveMenuGroupMaster(payload);
      setToastAction('save');
      setAction('view');
    }
    if (action === 'edit') {
      await utilityService.updateMenuGroupMaster(payload);
      setToastAction('save');
      setAction('view');
    }
 

  };

  return (
    <>
      <Panel
        header={<PanelHeaderWithBack action={action} title="User Menu Access Group" onBack={() => setAction('view')} />}
        style={{ width: '50%' }}
      >
        <FormActionContainer
          action={action}
          actionClick={actionClick}
          operationClick={operationClick}
          toastAction={toastAction}
          setToastAction={setToastAction}
        />

        {action === 'view' && (
          <div>
            <CommonDataTable
              dataList={FormData}
              columnConfig={dtColumns}
              action={action}
              actionClick={actionClick}
              actionTableBtn={actionTableBtn}
            />
          </div>
        )}

        {(action === 'add' || action === 'edit') && (
          <div>
            <form id="menu-group-form" onSubmit={handleSubmit(onSubmit)}>

              <div className="m-0 form-container">
                <div className="form-section" style={{ flexDirection: 'column' }}>
                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: '85px' }}>Group Name:</label>
                    <InputText
                      id="userGroupName"
                      type="text"
                      className={`p-inputtext-sm ${errors.userGroupName ? 'input-error' : ''}`}
                      {...register("userGroupName", {
                        required: "User Group is required"
                      })}
                    />

                  </div>

                 
                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: "85px" }}>
                      Client Name:
                                        </label>
                    <Controller
                      name="clientName"
                      control={control}
                      rules={{ required: "Client name is required" }}
                      render={({ field }) => (
                        <Dropdown
                          {...field}
                          value={drclientNameData.find((q) => q.clientName === field.value)}
                          onChange={(e) => {
                            field.onChange(e.value.clientName); // set cityName in form
                            setSelectedclientName(e.value);

                          }}
                          options={drclientNameData}
                          optionLabel="clientName"
                          placeholder="Select a client name"
                          editable
                          className={`field-style ${
                            errors.clientName ? "input-error" : ""
                            }`}
                        />
                      )}
                    />
                  </div>

                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: "85px" }}>
                      Client Project Name:
                                        </label>
                    <Controller
                      name="projectName"
                      control={control}
                      rules={{ required: "Project name is required" }}
                      render={({ field }) => (
                        <Dropdown
                          {...field}
                          value={drclientProjData.find((q) => q.projectName === field.value)}
                          onChange={(e) => {
                            field.onChange(e.value.projectName); // set cityName in form
                            setSelectedclientProj(e.value);

                          }}
                          options={drclientProjData}
                          optionLabel="projectName"
                          placeholder="Select a client project name"
                          editable
                          className={`field-style ${
                            errors.projectName ? "input-error" : ""
                            }`}
                        />
                      )}
                    />
                  </div>
 
                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: "85px" }}>
                     Is Active Group: </label>

                    <Controller
                      name="activeMenuGroup"
                      control={control}
                      defaultValue={false}
                      render={({ field }) => (
                        <input
                          type="checkbox"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                          style={{ width: "20px", height: "20px" }}
                        />
                      )}
                    />
                  </div>
                  <div id='data-table'>
                      {dtDGColumns?.length &&(
                        <CommonDataTable
                        dataList={DGData}
                        getOnCellEditComplete={onCellEditComplete}
                        columnConfig={dtDGColumns}
                        action={action}
                        actionClick={actionClick}
                        actionTableBtn={actionTableBtn}
                        onClickDGChk={onClickDGChk}
                        />
                      )}
                   
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
export default UserMenuAccessGroup;
