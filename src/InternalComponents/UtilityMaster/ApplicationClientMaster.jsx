import React,{useState,useEffect } from "react";
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
const ApplicationClientMaster = () => {
  const initFormData = {
    appClientId: "",
    clientUniqueId: "",
    clientName: "",   
    clientAlias: "",
  };
   

  
  const [action, setAction] = useState("view");
  const [FormData, setFormData] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [operation, setOperation] = useState();
  const [toastAction, setToastAction] = useState();
 
  const columns = [
    {
      field: "clientName",
      header: "Client Name",
      colType: "text",
      isVisible: true,
      width: "100px",
      isFilterApply: true,
      isSortApply: true,
    },
    {
      field: "clientUniqueId",
      header: "Client Id",
      colType: "text",
      isVisible: true,
      width: "100px",
      isFilterApply: true,
      isSortApply: true,
    },
   
    {
      field: "",
      header: "Edit",
      action:"edit",
      colType: "button",
      isVisible: true,
      classStyleName: "edit-btn",
      width: "50px",
      isFilterApply: true,
      isSortApply: true,
    },
  ];
// drop down


const [selectedclientProj, setSelectedclientProj] = useState({});
const [drclientProjData, setdrclientProjData] = useState([]);
  const [dtColumns, setDtColumns] = useState(columns);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initFormData,
  });

  useEffect(() => {
    if (action == "view") {
        utilityService.getClientProjectMaster().then((data) => setdrclientProjData(data));
        utilityService.getClientMaster().then((data) => setFormData(data));
    }
  }, [action]);

  useEffect(() => {
    const Id = selectedData?.rowData?.appClientId;
    if (Id && action === "edit") {
        utilityService.geteClientMasterById(Id).then((data) => {
        if (data) {
          reset(data); // populate form on edit
          setValue("projectName", data?.clientProjectMaster?.projectName);
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
      handleSubmit(onSubmit,onError)(); // trigger form submit
    }
  };

  const onError = (errors) => {
    if (Object.keys(errors).length > 0) {
      setToastAction('error'); // Pass this to FormActionContainer for toast
    }
  };

   const onSubmit = async (data) => {
    const payload = data;
    const clentprojdata = drclientProjData.find((q) => q.projectName === data.projectName); // match selected quality
    payload.appClientProjectMaster = clentprojdata;
      console.log("save Successful:", data);
      if (action === 'add') {
        await utilityService.saveClientMaster(data);
        setToastAction('save');
        setAction('view');
      }
      if (action === 'edit') {
        await utilityService.updateClientMaster(data);
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
        header={<PanelHeaderWithBack action={action} title="Client Master" onBack={() => setAction('view')} />}
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
            <form id="client-form" onSubmit={handleSubmit(onSubmit)}>
            
              <div className="m-0 form-container">
                <div className="form-section" style={{ flexDirection: 'column' }}>
                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: '85px' }}>Client Name:</label>
                    <InputText
                      id="clientName"
                      type="text"
                      className={`p-inputtext-sm ${errors.clientName ? 'input-error' : ''}`}
                        {...register("clientName", {
                            required: "Client Name is required"
                        })}
                    />
                   
                  </div>
                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: '85px' }}>Client Alias:</label>
                    <InputText
                      id="clientAlias"
                      type="text"
                      className={`p-inputtext-sm ${errors.clientAlias ? 'input-error' : ''}`}
                        {...register("clientAlias", {
                            required: "Client Alias is required"
                        })}
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


                   
                </div>
              </div>
            </form>
          </div>
        )}
      </Panel>
    </>
  );
};
export default ApplicationClientMaster;
