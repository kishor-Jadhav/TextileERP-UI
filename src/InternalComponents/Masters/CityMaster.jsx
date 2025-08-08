import React, { useState, useEffect } from "react";
import '../../CommonCss/_formStyle.scss';
import {
  Panel,
  InputText,
  useForm,
  Message,
} from "./../../CommonImports/commonImports";
import FormActionContainer from "../FormActionContainer";
import { CityMasterService } from "../../Services/CommonService/ApiService";
import PanelHeaderWithBack from "../../SharedComponents/PanelHeaderWithBack";
import CommonDataTable from "../../SharedComponents/CommonDatatable";

const CityMaster = () => {
  const initFormData = {
    cityId: "",
    cityName: "",
    state: "",
    pinCode: ""
  };

  const [action, setAction] = useState("view");
  const [cityData, setCityData] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [operation, setOperation] = useState();
  const [toastAction, setToastAction] = useState();

  const columns = [
    { field: 'cityName', header: 'CityName', colType: 'text', isVisible: true, width:"100px", isFilterApply:true, isSortApply: true },
    { field: 'state', header: 'State', colType: 'text', isVisible: true,  width:"100px", isFilterApply:true, isSortApply: true  },
    { field: 'pinCode', header: 'pinCode', colType: 'text', isVisible: false,  width:"100px", isFilterApply:true, isSortApply: true },
	{ field: "",
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
    formState: { errors }
  } = useForm({
    defaultValues: initFormData
  });

  useEffect(() => {
    if(action=='view'){
      CityMasterService.getCityMasterData().then(data => setCityData(data));
    }
   
  }, [action]);

  useEffect(() => {
    const cityId = selectedData?.rowData?.cityId;
    if (cityId && action === 'edit') {
        CityMasterService.getCityMasterFormData(cityId).then((data) => {
        if (data) {
          reset(data); // populate form on edit
        }
      });
    }
  }, [selectedData, action, reset]);

  useEffect(() => {
    if (action === 'add') {
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
      await CityMasterService.saveCityMaster(data);
      setToastAction('save');
      setAction('view');
    }
    if (action === 'edit') {
      await CityMasterService.updateCityMaster(data);
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
        header={<PanelHeaderWithBack action={action} title="City Master" onBack={() => setAction('view')} />}
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
              dataList={cityData}
              columnConfig={dtColumns}
              action={action}
              actionClick={actionClick}
              actionTableBtn={actionTableBtn}
            />
          </div>
        )}

        {(action === 'add' || action === 'edit') && (
          <div>
            <form id="city-form" onSubmit={handleSubmit(onSubmit)}>
            
              <div className="m-0 form-container">
                <div className="form-section" style={{ flexDirection: 'column' }}>
                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: '85px' }}>City Name:</label>
                    <InputText
                      id="cityName"
                      type="text"
                      className={`p-inputtext-sm ${errors.cityName ? 'input-error' : ''}`}
                        {...register("cityName", {
                            required: "City Name is required"
                        })}
                    />
                   
                  </div>

                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: '85px' }}>State:</label>
                    <InputText
                      id="state"
                      type="text"
                      className={`p-inputtext-sm ${errors.state ? 'input-error' : ''}`}
                      {...register("state", {
                        required: "State name is required"
                      })}
                    />
                    
                  </div>

                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: '85px' }}>Pincode:</label>
                    <InputText
                      id="pinCode"
                      type="text"
                      className={`p-inputtext-sm ${errors.pinCode ? 'input-error' : ''}`}
                      {...register("pinCode", {                        
                        pattern: {
                          value: /^[0-9]{6}$/,
                          message: "Pincode must be a 6-digit number"
                        }
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

export default CityMaster;
