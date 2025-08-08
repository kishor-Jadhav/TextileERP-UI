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
import { CountService } from "../../Services/CommonService/ApiService";
import PanelHeaderWithBack from "../../SharedComponents/PanelHeaderWithBack";
import CommonDataTable from "../../SharedComponents/CommonDatatable";
const CountMaster = () => {
  const initFormData = {
    countId: "",
    countName: "",
    countNo: "",
    countType: "",
  };
  const countTypeData =[{countType:"COTTON"},{countType:"GRAY"}]

  
  const [action, setAction] = useState("view");
  const [FormData, setFormData] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [operation, setOperation] = useState();
  const [toastAction, setToastAction] = useState();
  const [drCountTypeData, setdrcountTypeData] = useState(countTypeData);
  const [selectedCountType, setSelectedCountType] = useState({});
  const columns = [
    {
      field: "countName",
      header: "Count Name",
      colType: "text",
      isVisible: true,
      width: "100px",
      isFilterApply: true,
      isSortApply: true,
    },
    {
      field: "countNo",
      header: "Count",
      colType: "text",
      isVisible: true,
      width: "100px",
      isFilterApply: true,
      isSortApply: true,
    },
    {
      field: "countType",
      header: "Type",
      colType: "text",
      isVisible: false,
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
    formState: { errors },
  } = useForm({
    defaultValues: initFormData,
  });

  useEffect(() => {
    if (action == "view") {
      CountService.getCountMaster().then((data) => setFormData(data));
    }
  }, [action]);

  useEffect(() => {
    const Id = selectedData?.rowData?.countId;
    if (Id && action === "edit") {
      CountService.getCountMasterById(Id).then((data) => {
        if (data) {
          reset(data); // populate form on edit
           
           setSelectedCountType(data);
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
      if (action === 'add') {
        await CountService.saveCountMaster(data);
        setToastAction('save');
        setAction('view');
      }
      if (action === 'edit') {
        await CountService.updateCountMaster(data);
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
        header={<PanelHeaderWithBack action={action} title="Count Master" onBack={() => setAction('view')} />}
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
            <form id="count-form" onSubmit={handleSubmit(onSubmit)}>
            
              <div className="m-0 form-container">
                <div className="form-section" style={{ flexDirection: 'column' }}>
                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: '85px' }}>Count Name:</label>
                    <InputText
                      id="countName"
                      type="text"
                      className={`p-inputtext-sm ${errors.countName ? 'input-error' : ''}`}
                        {...register("countName", {
                            required: "Count Name is required"
                        })}
                    />
                   
                  </div>

                 

                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: '85px' }}>Count:</label>
                    <InputText
                      id="countNo"
                      type="text"
                      className={`p-inputtext-sm ${errors.countNo ? 'input-error' : ''}`}
                      {...register("countNo")}
                    />
                    
                  </div>

                   <div className="form-field-group">
                      <label className="form-lbl" style={{ minWidth: "85px" }}>
                        Type:
                      </label>
                      <Controller
                        name="countType"
                        control={control}
                        rules={{ required: "Count Type is required" }}
                        render={({ field }) => (
                          <Dropdown
                            {...field}
                            value={selectedCountType?.countType}
                            onChange={(e) => {
                              field.onChange(e.value.countType); // set cityName in form
                              setSelectedCountType(e.value); // set full city object for later
                            }}
                            options={drCountTypeData}
                            optionLabel="countType"
                            placeholder="Select a Type"
                            editable
                            className={`field-style ${
                              errors.countType ? "input-error" : ""
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
export default CountMaster;
