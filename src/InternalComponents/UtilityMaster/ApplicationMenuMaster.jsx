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
import { utilityService,getDropDownsService } from "../../Services/CommonService/ApiService";
import PanelHeaderWithBack from "../../SharedComponents/PanelHeaderWithBack";
import CommonDataTable from "../../SharedComponents/CommonDatatable";
const ApplicationMenuMaster = () => {
  const initFormData = {
    menuId: "",
    menuName: "",
    parentMenuId: "",
    isActive: "",
    menuOrder: "",
    menuLevel: "",
    menuRoute: "",
    parentMenuName: "",
    isNotDelete: ""
  };

  const formVariables = {
    displayParentMenuControll: false,
   
  };

  const [action, setAction] = useState("view");
  const [FormData, setFormData] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [operation, setOperation] = useState();
  const [toastAction, setToastAction] = useState();
  const [formVariablesState, setFormVariablesState] = useState(formVariables);
  // drop down


  const [selectedclientProj, setSelectedclientProj] = useState({});
  const [drclientProjData, setdrclientProjData] = useState([]);

  const [selectedParentMenu, setSelectedParentMenu] = useState({});
  const [menuList, setMenuList] = useState([]);
  const columns = [
    {
      field: "menuName",
      header: "Menu Name",
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
  const [selectedclientName, setSelectedclientName] = useState({});
  const [drclientNameData, setdrclientNameData] = useState([]);

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
      utilityService.getClientProjectMaster().then((data) => setdrclientProjData(data));
      utilityService.getClientMaster().then((data) => setdrclientNameData(data));
      utilityService.getMenuMaster().then((data) => {
        setMenuList(data);
        setFormData(data);
      });
    }
  }, [action]);

  useEffect(() => {
    const Id = selectedData?.rowData?.menuId;
    if (Id && action === "edit") {
      utilityService.geteMenuMasterById(Id).then((data) => {
        if (data) {
          reset(data); // populate form on edit
          //setValue("clientName", data?.appClientMaster?.clientName);
            setValue("projectName", data?.clientProjectMaster?.projectName);
            setSelectedFormControll(data)
          
        }
      });
    } else if (Id && action === "delete") {
      utilityService.deleteMenuMaster(Id).then(() => {
        utilityService.getMenuMaster().then((data) => setFormData(data));  //Refresh data
      });
    }
  }, [selectedData, action, reset]);

  const fillProjectList = (clientId) => {

    getDropDownsService.getProjectListByClientId(clientId).then((projectData) => {
      setSelectedFormControll(data)
    });
  };
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


    const clentprojdata = drclientProjData.find((q) => q.projectName === data.projectName); // match selected quality
    payload.clientProjectMaster = clentprojdata;
    if (action === 'add') {
      console.log(selectedParentMenu);
      if(Object.keys(selectedParentMenu).length){
        payload.parentMenuId = selectedParentMenu?.menuId;
      } else {
        payload.parentMenuId = 0;
      }
      await utilityService.saveMenuMaster(payload);
      setToastAction('save');
      setAction('view');
    }
    if (action === 'edit') {
		 console.log(selectedParentMenu);
      if(Object.keys(selectedParentMenu).length){
        payload.parentMenuId = selectedParentMenu?.menuId;
      } else {
        payload.parentMenuId = 0;
      }
      await utilityService.updateMenuMaster(payload);
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
        header={<PanelHeaderWithBack action={action} title="Menu Master" onBack={() => setAction('view')} />}
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
            <form id="mrnu-form" onSubmit={handleSubmit(onSubmit)}>

              <div className="m-0 form-container">
                <div className="form-section" style={{ flexDirection: 'column' }}>
                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: '85px' }}>Menu Name:</label>
                    <InputText
                      id="menuName"
                      type="text"
                      className={`p-inputtext-sm ${errors.menuName ? 'input-error' : ''}`}
                      {...register("menuName", {
                        required: "Menu Name is required"
                      })}
                    />

                  </div>
                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: '85px' }}>Menu Level:</label>
                    <InputText 
                      id="menuLevel"
                      type="number"
                      min ="0"
                      max ="3"
                      onInput={(e) => {
                         console.log(e.target.value)
                          if(Number(e.target.value)>0){
                            setFormVariablesState((preval)=>{
                               return {...preval,displayParentMenuControll:true}
                            })
                          } else {
                            setFormVariablesState((preval)=>{
                              return {...preval,displayParentMenuControll:false}
                           })
                          }
                      }}
                      className={`p-inputtext-sm ${errors.menuLevel ? 'input-error' : ''}`}
                      {...register("menuLevel", {
                        required: "Menu Level is required"
                      })}
                    />

                  </div>
                  {(formVariablesState.displayParentMenuControll) && (
                    <div className="form-field-group">
                      <label className="form-lbl" style={{ minWidth: "85px" }}>
                        Parent Menu Name:
                     </label>
                      <Controller
                        name="parentMenuName"
                        control={control}
                        rules={{ required: "Parent Menu Name is required" }}
                        render={({ field }) => (
                          <Dropdown
                            {...field}
                            value={menuList.find((q) => q.menuName === field.value)}
                            onChange={(e) => {
                              field.onChange(e.value.menuName); // set cityName in form
                              setSelectedParentMenu(e.value);

                            }}
                            options={menuList}
                            optionLabel="menuName"
                            placeholder="Select a parent menu"
                            editable
                            className={`field-style ${
                              errors.parentMenuName ? "input-error" : ""
                              }`}
                          />
                        )}
                      />
                    </div>

                  )}

                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: '85px' }}>Routing URL:</label>
                    <InputText
                      id="menuRoute"
                      type="text"
                      className={`p-inputtext-sm ${errors.menuRoute ? 'input-error' : ''}`}
                      {...register("menuRoute")}
                    />

                  </div>

                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: "85px" }}>
                      Project Name:
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
                    <label className="form-lbl" style={{ minWidth: '85px' }}>Menu Order:</label>
                    <InputText
                      id="menuOrder"
                      type="text"
                      className={`p-inputtext-sm ${errors.menuOrder ? 'input-error' : ''}`}
                      {...register("menuOrder", {
                        required: "Menu Order is required"
                      })}
                    />

                  </div>
                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: "85px" }}>
                      Not Deletable: </label>

                    <Controller
                      name="isNotDelete"
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

                </div>
              </div>
            </form>
          </div>
        )}
      </Panel>
    </>
  );
};
export default ApplicationMenuMaster;
