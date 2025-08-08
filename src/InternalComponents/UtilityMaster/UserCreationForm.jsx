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
const UserCreationForm = () => {
  const initFormData = {
    userId: "",
    userName: "",
    authUserName: "",
    password: "",
    email: "",
    language: "",
    userAdminKeys: "",
    accountName: "",
    appClientId: "",
    appClientProjectId: "",
    enabled: "",
    isDactive: "",
    userRole: "",
  };
  const userLanguage = [{ language: "en" }, { language: "mr" }]
  const userRoll = [{ userRole: "ROLE_USER" }, { userRole: "ROLE_ADMIN" },{ userRole: "ROLE_SUPERADMIN" }]


  const [action, setAction] = useState("view");
  const [FormData, setFormData] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [operation, setOperation] = useState();
  const [toastAction, setToastAction] = useState();

  //Form Controll data
  const [selectedFormControll, setSelectedFormControll] = useState({});

  // drop down
  const [drUserRoll, setdrUserRoll] = useState(userRoll);
  const [selectedUserRoll, setSelectedUserRoll] = useState({});

  const [drUserLanguage, setdrUserLanguage] = useState(userLanguage);
  const [selectedUserLanguage, setSelectedUserLanguage] = useState({});

  const [selectedclientName, setSelectedclientName] = useState({});
  const [drclientNameData, setdrclientNameData] = useState([]);

  const [selectedclientProj, setSelectedclientProj] = useState({});
  const [drclientProjData, setdrclientProjData] = useState([]);
  const columns = [
    {
      field: "userName",
      header: "User Name",
      colType: "text",
      isVisible: true,
      width: "100px",
      isFilterApply: true,
      isSortApply: true,
    },
    {
      field: "authUserName",
      header: "User Id",
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
  ];

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
      utilityService.getUserMaster().then((data) => setFormData(data));
    }
  }, [action]);

  useEffect(() => {
    const Id = selectedData?.rowData?.userId;
    if (Id && action === "edit") {
      reset(initFormData);
      utilityService.getUserMasterById(Id).then((data) => {
        if (data) {
          reset(data); // populate form on edit
          setValue("clientName", data?.appClientMaster?.clientName);
          setValue("projectName", data?.appClientProjectMaster?.projectName);
         
         // setSelectedUserLanguage(data);
          const userRole = data.userRoles[0];
         // userRole.roleName = userRole.roleName.replace("ROLE_","");
          data.userRole = userRole.roleName;
          setValue("userRole", data?.userRole);
          setSelectedFormControll(data);
        }
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
  useEffect(() => {
    if (action === "add") {
      clearFormData();
    }
  }, [action, reset]);

  const clearFormData = () => {
    reset(initFormData); // reset form on add    
    setSelectedclientName({});
    setSelectedclientProj({});
  };
  const onSubmit = async (data) => {
    const payload = data;
    const clentdata = drclientNameData.find((q) => q.clientName === data.clientName); // match selected quality
    payload.appClientMaster = clentdata;
    const clentprojdata = drclientProjData.find((q) => q.projectName === data.projectName); // match selected quality
    payload.appClientProjectMaster = clentprojdata;
    //payload.userRole = "ROLE_" + payload.userRole;
    console.log("save Successful:", payload);
    if (action === 'add') {
      await utilityService.saveUserMaster(payload);
      setToastAction('save');
      setAction('view');
    }
    if (action === 'edit') {
      await utilityService.updateUserMaster(payload);
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
        header={<PanelHeaderWithBack action={action} title="User Creation" onBack={() => setAction('view')} />}
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
            <form id="user-form" onSubmit={handleSubmit(onSubmit)}>

              <div className="m-0 form-container">
                <div className="form-section" style={{ flexDirection: 'column' }}>
                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: '85px' }}>User Name:</label>
                    <InputText
                      id="userName"
                      type="text"
                      className={`p-inputtext-sm ${errors.userName ? 'input-error' : ''}`}
                      {...register("userName", {
                        required: "User Name is required"
                      })}
                    />

                  </div>

                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: "85px" }}>
                    User Role:
                      </label>
                    <Controller
                      name="userRole"
                      control={control}
                      rules={{ required: "Role is required" }}
                      render={({ field }) => (
                        <Dropdown
                          {...field}
                          value={selectedFormControll?.userRole}
                          onChange={(e) => {
                            field.onChange(e.value.userRole); // set cityName in form
                           
                            setSelectedFormControll(e.value); // set full city object for later
                            console.log(selectedFormControll)
                          }}
                          options={drUserRoll}
                          optionLabel="userRole"
                          placeholder="Select a User Type"
                          editable
                          className={`field-style ${
                            errors.userRole ? "input-error" : ""
                            }`}
                        />
                      )}
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
                    <label className="form-lbl" style={{ minWidth: '85px' }}>Email-Id:</label>
                    <InputText
                      id="email"
                      type="text"
                      className={`p-inputtext-sm ${errors.email ? 'input-error' : ''}`}
                      {...register("email", {
                        required: "Email-Id is required"
                      })}
                    />

                  </div>

                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: '85px' }}>User Id:</label>
                    <InputText
                      id="authUserName"
                      type="text"
                      className={`p-inputtext-sm ${errors.authUserName ? 'input-error' : ''}`}
                      {...register("authUserName", {
                        required: "User Id is required"
                      })}
                    />

                  </div>


                  {( action === 'add') && (
                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: '85px' }}>Password:</label>
                    <InputText
                      id="password"
                      type="text"
                      className={`p-inputtext-sm ${errors.password ? 'input-error' : ''}`}
                      {...register("password")}
                    />

                  </div>)}

                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: "85px" }}>
                    Language:
                      </label>
                    <Controller
                      name="language"
                      control={control}
                      rules={{ required: "Language is required" }}
                      render={({ field }) => (
                        <Dropdown
                          {...field}
                          value={selectedFormControll?.language}
                          onChange={(e) => {
                            field.onChange(e.value.language); // set cityName in form
                            setSelectedFormControll(e.value); // set full city object for later
                          }}
                          options={drUserLanguage}
                          optionLabel="language"
                          placeholder="Select a Type"
                          editable
                          className={`field-style ${
                            errors.language ? "input-error" : ""
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
export default UserCreationForm;
