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
const UserAccessGroupForm = () => {
  const initFormData = {
    userGroupAssignId: "",
    userGroupName: "",
    userName: "",     
  };

  const form_Variables = {
    displayParentMenuControll: false,
   
  };
// States
  const [action, setAction] = useState("view");
  const [FormData, setFormData] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [operation, setOperation] = useState();
  const [toastAction, setToastAction] = useState();

// Variables
  const [formVariablesState, setFormVariablesState] = useState(form_Variables);

  // drop down
  

  const [selectedParentMenu, setSelectedParentMenu] = useState({});
  const [menuList, setMenuList] = useState([]);
  const columns = [
    {
      field: "userMaser.userName",
      header: "User Name",
      colType: "text",
      isVisible: true,
      width: "100px",
      isFilterApply: true,
      isSortApply: true,
    },

    {
        field: "userMenuGroupMaster.userGroupName",
        header: "Group Name",
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
  //Form Controll data
  const [selectedFormControll, setSelectedFormControll] = useState({});

  const [dtColumns, setDtColumns] = useState(columns);

  // dropdowns
  const [selectedUserName, setSelectedUserName] = useState({});
  const [drUserNameData, setdrUserNameData] = useState([]);
  const [selectedGroupName, setSelectedGroupName] = useState({});
  const [drGroupName, setdrGroupName] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: initFormData,
  });

  useEffect(() => {
    if (action == "view") {
      utilityService.getMenuGroupMaster().then((data) => setdrGroupName(data));
      utilityService.getUserMaster().then((data) => setdrUserNameData(data));
      utilityService.getUserAssignGroupList().then((data) => {
         
        setFormData(data);
      });
    }
  }, [action]);

  useEffect(() => {
    const Id = selectedData?.rowData?.userGroupAssignId;
    if (Id && action === "edit") {
      utilityService.getUserAssignGroupById(Id).then((data) => {
        if (data) {
          reset(data); // populate form on edit
          setValue("userName", data?.userMaser?.userName);
          setValue("userGroupName", data?.userMenuGroupMaster?.userGroupName);
        }
      });
    } else if (Id && action === "delete") {
      utilityService.deleteUserAssignGroup(Id).then(() => {
        utilityService.getUserAssignGroupList().then((data) => setFormData(data));  //Refresh data
      });
    }
  }, [selectedData, action, reset]);

  
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

  const onSubmit = async (data) => {
    console.log("save Successful:", data);
    const payload = data;


    const userData = drUserNameData.find((q) => q.userName === data.userName); // match selected quality
    payload.userMaser = userData;

    const userGroupData = drGroupName.find((q) => q.userGroupName === data.userGroupName); // match selected quality
    payload.userMenuGroupMaster = userGroupData;
    if (action === 'add') {
      
      await utilityService.saveUserAssignGroup(payload);
      setToastAction('save');
      setAction('view');
    }
    if (action === 'edit') {
      await utilityService.updateUserAssignGroup(payload);
      setToastAction('save');
      setAction('view');
    }
    // Call your save API here, then refresh view
    // Example: await CityMasterService.saveCity(data);
    // Then refetch:
    // CityMasterService.getCityMasterData().then(data => setCityData(data));


  };

  return (
    <>
      <Panel
        header={<PanelHeaderWithBack action={action} title="User Assign Group" onBack={() => setAction('view')} />}
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
            <form id="user_group-form" onSubmit={handleSubmit(onSubmit)}>

              <div className="m-0 form-container">
                <div className="form-section" style={{ flexDirection: 'column' }}>
                  
                  
                  
 

                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: "85px" }}>
                      User Name:
                                        </label>
                    <Controller
                      name="userName"
                      control={control}
                      rules={{ required: "User name is required" }}
                      render={({ field }) => (
                        <Dropdown
                          {...field}
                          value={drUserNameData.find((q) => q.userName === field.value)}
                          onChange={(e) => {
                            field.onChange(e.value.userName); // set cityName in form
                            setSelectedUserName(e.value);

                          }}
                          options={drUserNameData}
                          optionLabel="userName"
                          placeholder="Select a user name"
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
                      Group Name:
                                        </label>
                    <Controller
                      name="userGroupName"
                      control={control}
                      rules={{ required: "Group name is required" }}
                      render={({ field }) => (
                        <Dropdown
                          {...field}
                          value={drGroupName.find((q) => q.userGroupName === field.value)}
                          onChange={(e) => {
                            field.onChange(e.value.userGroupName); // set cityName in form
                            setSelectedGroupName(e.value);

                          }}
                          options={drGroupName}
                          optionLabel="userGroupName"
                          placeholder="Select a group name"
                          editable
                          className={`field-style ${
                            errors.projectName ? "input-error" : ""
                            }`}
                        />
                      )}
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
export default UserAccessGroupForm;
