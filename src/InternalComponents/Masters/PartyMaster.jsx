import React, { useState, useEffect } from "react";
import "../../CommonCss/_formStyle.scss";
import {
  Panel,
  InputText,
  useForm,
  Message,
  Dropdown,
  InputTextarea,
  Controller,
} from "./../../CommonImports/commonImports";
import FormActionContainer from "../FormActionContainer";
import {
  PartyMasterService,
  CityMasterService,
  CategoryService,
  
} from "../../Services/CommonService/ApiService";
import PanelHeaderWithBack from "../../SharedComponents/PanelHeaderWithBack";
import CommonDataTable from "../../SharedComponents/CommonDatatable";

const PartyMaster = () => {
  const initFormData = {
    partyId: "",
    partyName: "",
    partAddress: "",
    partyCategoryId:"",
    partyCategoryName:"",
    panNo: "",
    cityId: "",
    cityName: "",
    state: "",
    pinCode: "",
    mobNo:"",
    phNo:"",
    emailId:"",
    brokerId:"",
    brokerName:"",
    gstNo:"",
  };

  const [action, setAction] = useState("view");
  const [partyData, setPartyData] = useState([]);  
  const [selectedData, setSelectedData] = useState({});
  const [operation, setOperation] = useState();
  const [toastAction, setToastAction] = useState();

  // Form Constant
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCategoty, setSelectedCategory] = useState(null);
  const [selectedBroker, setSelectedBroker] = useState(null);
  const [cityData, setCityData] = useState([]);
  const [categotyData, setCategoryData] = useState(null);
  const [brokerData, setBrokerData] = useState(null);

  const columns = [
    {
      field: "partyName",
      header: "Party Name",
      colType: "text",
      isVisible: true,
      width: "100px",
      isFilterApply: true,
      isSortApply: true,
    },
    {
      field: "partyCategoryMaster.partyCategoryName",
      header: "Category",
      colType: "text",
      isVisible: true,
      width: "100px",
      isFilterApply: true,
      isSortApply: true,
    },
    {
      field: "cityMaster.cityName",
      header: "City Name",
      colType: "text",
      isVisible: true,
      width: "100px",
      isFilterApply: true,
      isSortApply: true,
    },
    {
      field: "",
      header: "Edit",
      colType: "button",
      isVisible: true,
      classStyleName: "edit-btn",
      width: "50px",
    },
  ];

  const [dtColumns, setDtColumns] = useState(columns);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initFormData,
  });

  useEffect(() => {
    PartyMasterService.getPartyMasterData().then((data) => setPartyData(data));
  }, [action]);

 

  useEffect(() => {
    const formId = selectedData?.rowData?.partyId;
    if (formId && action === "edit") {
      PartyMasterService.getPartyMasterFormData(formId).then((data) => {
        if (data) {
          reset(data); // populate form on edit
          const setData = data;
          setSelectedCity(setData.cityMaster);
          setSelectedCategory(setData?.partyCategoryMaster);
          setSelectedBroker(setData)
          
        }
      });
    }
  }, [selectedData, action, reset]);

  useEffect(() => {
    if (action === "add") {
      reset(initFormData); // reset form on add
      setSelectedCity(initFormData);
      setSelectedCategory(initFormData);
      setSelectedBroker(initFormData);
    }
    if (action === "edit") {
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
    if (action === "add") {
      await PartyMasterService.savePartyMaster(data);
      setToastAction("save");
      setAction("view");
    }
    if (action === "edit") {
      await PartyMasterService.updatePartyMaster(data);
      setToastAction("save");
      setAction("view");
    }
  };

  //-----Form Methods-----
  useEffect(() => {
    console.log(selectedCity);
    if (selectedCity) {
      setValue("cityId", selectedCity.cityId || "");
      setValue("cityName", selectedCity.cityName || "");
      setValue("state", selectedCity.state || "");
      setValue("pinCode", selectedCity.pinCode || "");
    }
    if(selectedCategoty){
      setValue("partyCategoryId", selectedCategoty.partyCategoryId || "");
      setValue("partyCategoryName", selectedCategoty.partyCategoryName || ""); 
    }
   if (selectedBroker) {
      setValue("brokerId", selectedBroker.brokerId || "");
      setValue("brokerName", selectedBroker.brokerName || "");
    }   
  }, [selectedCity,selectedCategoty,selectedBroker]);

  useEffect(() => {
    CityMasterService.getCityMasterData().then((data) => setCityData(data));
    CategoryService.getPartyCategoryFormData().then((data) => setCategoryData(data));
   // PartyMasterService.getBrokerMasterData().then((data) => setBrokerData(data));
    const brokerData = partyData.length? partyData.filter((item)=>item?.partyCategoryMaster?.partyCategoryId == 9): [];
    brokerData.forEach((item)=>{
      item.brokerName = item.partyName;
      item.brokerId = item.partyId;
    })
    setBrokerData(brokerData)
  }, [action]);


  return (
    <>
      <Panel
        header={
          <PanelHeaderWithBack
            action={action}
            title="Party Master"
            onBack={() => setAction("view")}
          />
        }
        style={{ width: "50%" }}
      >
        <FormActionContainer
          action={action}
          actionClick={actionClick}
          operationClick={operationClick}
          toastAction={toastAction}
          setToastAction={setToastAction}
        />

        {action === "view" && (
          <div>
            <CommonDataTable
              dataList={partyData}
              columnConfig={dtColumns}
              action={action}
              actionClick={actionClick}
              actionTableBtn={actionTableBtn}
            />
          </div>
        )}

        {(action === "add" || action === "edit") && (
          <div>
            <form id="party-master-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="m-0 form-container">
                <div
                  className="form-section"
                  style={{ flexDirection: "column" }}
                >
                  <Panel className="pln-card" header="Party Details">
                    <div className="form-field-group">
                      <label className="form-lbl" style={{ minWidth: "85px" }}>
                        Party Name:
                      </label>
                      <InputText
                        id="partyName"
                        type="text"
                        className={`p-inputtext-sm ${
                          errors.partyName ? "input-error" : ""
                        }`}
                        {...register("partyName", {
                          required: "Party Name is required",
                        })}
                      />
                    </div>

                    <div className="form-field-group">
                      <label className="form-lbl" style={{ minWidth: "85px" }}>
                        Category Name:
                      </label>
                      <Controller
                        name="partyCategoryName"
                        control={control}
                        rules={{ required: "Party Categor Name is required" }}
                        render={({ field }) => (
                          <Dropdown
                            {...field}
                            value={selectedCategoty?.partyCategoryName}
                            onChange={(e) => {
                              field.onChange(e.value.partyCategoryName); // set cityName in form
                              setSelectedCategory(e.value); // set full city object for later
                            }}
                            options={categotyData}
                            optionLabel="partyCategoryName"
                            placeholder="Select a Category"
                            editable
                            className={`field-style ${
                              errors.partyCategoryName ? "input-error" : ""
                            }`}
                          />
                        )}
                      />
                    </div>

                    <div className="form-field-group">
                      <label
                        className="form-lbl"
                        style={{
                          minWidth: "85px",
                          position: "relative",
                          top: "-40px",
                        }}
                      >
                        Address:
                      </label>
                      <InputTextarea
                        id="partAddress"
                        type="text"
                        style={{ height: "85px", width: "265px" }}
                        className={`  ${errors.partAddress ? "input-error" : ""}`}
                        {...register("partAddress", {
                          required: "Address is required",
                        })}
                      />
                    </div>

                    <div className="form-field-group">
                      <label className="form-lbl" style={{ minWidth: "85px" }}>
                        Pan No:
                      </label>
                      <InputText
                        id="panNo"
                        type="text"
                        className={`p-inputtext-sm ${
                          errors.panNo ? "input-error" : ""
                        }`}
                        {...register("panNo")}
                      />
                    </div>

                    <div className="form-field-group">
                      <label className="form-lbl" style={{ minWidth: "85px" }}>
                        Mobile No:
                      </label>
                      <InputText
                        id="mobNo"
                        type="text"
                        className={`p-inputtext-sm ${
                          errors.mobNo ? "input-error" : ""
                        }`}
                        {...register("mobNo")}
                      />
                    </div>

                    <div className="form-field-group">
                      <label className="form-lbl" style={{ minWidth: "85px" }}>
                        Phone No:
                      </label>
                      <InputText
                        id="phNo"
                        type="text"
                        className={`p-inputtext-sm ${
                          errors.phNo ? "input-error" : ""
                        }`}
                        {...register("phNo")}
                      />
                    </div>

                    <div className="form-field-group">
                      <label className="form-lbl" style={{ minWidth: "85px" }}>
                        Email Id:
                      </label>
                      <InputText
                        id="emailId"
                        type="text"
                        className={`p-inputtext-sm ${
                          errors.emailId ? "input-error" : ""
                        }`}
                        {...register("emailId")}
                      />
                    </div>

                    <div className="form-field-group">
                      <label className="form-lbl" style={{ minWidth: "85px" }}>
                        GST No:
                      </label>
                      <InputText
                        id="gstNo"
                        type="text"
                        className={`p-inputtext-sm ${
                          errors.gstNo ? "input-error" : ""
                        }`}
                        {...register("gstNo")}
                      />
                    </div>

                  </Panel>

                  <Panel className="pln-card" header="Other Details">
                  <div className="form-field-group">
                      <label className="form-lbl" style={{ minWidth: "85px" }}>
                        Broker Name:
                      </label>
                      <Controller
                        name="brokerName"
                        control={control}                         
                        render={({ field }) => (
                          <Dropdown
                            {...field}
                            value={selectedBroker?.brokerName}
                            onChange={(e) => {
                              field.onChange(e.value.brokerName); // set cityName in form
                              setSelectedBroker(e.value); // set full city object for later
                            }}
                            options={brokerData}
                            optionLabel="brokerName"
                            placeholder="Select a Broker"
                            editable
                            className={`field-style`}
                          />
                        )}
                      />
                    </div>
                  </Panel>
                  
                  <Panel className="pln-card" header="City Details">
                    <div className="form-field-group">
                      <label className="form-lbl" style={{ minWidth: "85px" }}>
                        City Name:
                      </label>
                      <Controller
                        name="cityName"
                        control={control}                        
                        render={({ field }) => (
                          <Dropdown
                            {...field}
                            value={selectedCity?.cityName}
                            onChange={(e) => {
                              field.onChange(e.value.cityName); // set cityName in form
                              setSelectedCity(e.value); // set full city object for later
                            }}
                            options={cityData}
                            optionLabel="cityName"
                            placeholder="Select a City"
                            editable
                            className={`field-style`}
                          />
                        )}
                      />
                    </div>

                    <div className="form-field-group">
                      <label className="form-lbl" style={{ minWidth: "85px" }}>
                        State:
                      </label>
                      <InputText
                        readOnly
                        id="state"
                        type="text"
                        className={`p-inputtext-sm disable-state`}
                        {...register("state")}
                      />
                    </div>

                    <div className="form-field-group">
                      <label className="form-lbl" style={{ minWidth: "85px" }}>
                        Pincode:
                      </label>
                      <InputText
                        readOnly
                        id="pinCode"
                        type="text"
                        className={`p-inputtext-sm disable-state`}
                        {...register("pinCode")}
                      />
                    </div>
                  </Panel>
               

                    

                </div>
              </div>
            </form>
          </div>
        )}
      </Panel>
    </>
  );
};

export default PartyMaster;
