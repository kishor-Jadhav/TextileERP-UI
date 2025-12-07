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
const ApplicationClientProjectMaster = () => {
  const initFormData = {
    appClientProjectId: "",
    projectName: "",
    projectCode: "",   
    appClientMaster: "",
  };
   

  
  const [action, setAction] = useState("view");
  const [FormData, setFormData] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [operation, setOperation] = useState();
  const [toastAction, setToastAction] = useState();

  // drop down


  const [selectedclientName, setSelectedclientName] = useState({});
  const [drclientNameData, setdrclientNameData] = useState([]);
 
  const columns = [
    {
      field: "projectCode",
      header: "Project Code",
      colType: "text",
      isVisible: true,
      width: "100px",
      isFilterApply: true,
      isSortApply: true,
    },
    {
      field: "projectName",
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
      action:"edit",
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
       // utilityService.getClientMaster().then((data) => setdrclientNameData(data));
        utilityService.getClientProjectMaster().then((data) => setFormData(data));
    }
  }, [action]);

  useEffect(() => {
    const Id = selectedData?.rowData?.appClientProjectId;
    if (Id && action === "edit") {
        utilityService.geteClientProjectMasterById(Id).then((data) => {
        if (data) {
          reset(data); // populate form on edit
          setValue("clientName", data?.appClientMaster?.clientName);
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
      console.log("save Successful:", data);
      const payload = data;
      //const clentdata = drclientNameData.find((q) => q.clientName === data.clientName); // match selected quality
      //payload.appClientMaster = clentdata;
      if (action === 'add') {
        await utilityService.saveClientProjectMaster(data);
        setToastAction('save');
        setAction('view');
      }
      if (action === 'edit') {
        await utilityService.updateClientProjectMaster(data);
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
        header={<PanelHeaderWithBack action={action} title="Client Project Master" onBack={() => setAction('view')} />}
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
            <form id="client-project-form" onSubmit={handleSubmit(onSubmit)}>
            
              <div className="m-0 form-container">
                <div className="form-section" style={{ flexDirection: 'column' }}>
                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: '85px' }}>Project Name:</label>
                    <InputText
                      id="projectName"
                      type="text"
                      className={`p-inputtext-sm ${errors.projectName ? 'input-error' : ''}`}
                        {...register("projectName", {
                            required: "Project Name is required"
                        })}
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
export default ApplicationClientProjectMaster;
