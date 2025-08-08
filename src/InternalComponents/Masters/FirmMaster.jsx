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
  FirmMasterService,
  CityMasterService,
} from "../../Services/CommonService/ApiService";
import PanelHeaderWithBack from "../../SharedComponents/PanelHeaderWithBack";
import CommonDataTable from "../../SharedComponents/CommonDatatable";

const FirmMaster = () => {
  const initFormData = {
    firmId: "",
    firmName: "",
    address: "",
    bankName: "",
    accountNo: "",
    bankAddress: "",
    panNo: "",
    cityId: "",
    cityName: "",
    state: "",
    pinCode: "",
  };

  const [action, setAction] = useState("view");
  const [firmData, setFirmData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [operation, setOperation] = useState();
  const [toastAction, setToastAction] = useState();
  const [selectedCity, setSelectedCity] = useState(null);

  const columns = [
    {
      field: "firmName",
      header: "Firm Name",
      colType: "text",
      isVisible: true,
      width: "100px",
      isFilterApply: true,
      isSortApply: true,
    },
    {
      field: "panNo",
      header: "Pan No",
      colType: "text",
      isVisible: true,
      width: "100px",
      isFilterApply: true,
      isSortApply: true,
    },
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
    setValue,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initFormData,
  });

  useEffect(() => {
    FirmMasterService.getFirmMasterData().then((data) => setFirmData(data));
  }, [action]);

  useEffect(() => {
    CityMasterService.getCityMasterData().then((data) => setCityData(data));
  }, [action]);

  useEffect(() => {
    const formId = selectedData?.rowData?.firmId;
    if (formId && action === "edit") {
      FirmMasterService.getFirmMasterFormData(formId).then((data) => {
        if (data) {
          console.log(data);
          reset(data); // populate form on edit
          const setCity = data?.cityMaster;
          setSelectedCity(setCity);
          console.log(selectedCity);
        }
         
      });
    }
  }, [selectedData, action, reset]);

  useEffect(() => {
    if (action === "add") {
      reset(initFormData); // reset form on add
      setSelectedCity(initFormData);
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
     if (action === 'add') {
          await FirmMasterService.saveFirmMaster(data);
          setToastAction('save');
          setAction('view');
        }
        if (action === 'edit') {
          await FirmMasterService.updateFirmMaster(data);
          setToastAction('save');
          setAction('view');
        }
    //setToastAction("save");
    // Call your save API here, then refresh view
    // Example: await CityMasterService.saveCity(data);
    // Then refetch:
    // CityMasterService.getCityMasterData().then(data => setCityData(data));
    //setAction("view");

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
  }, [selectedCity]);

  return (
    <>
      <Panel
        header={
          <PanelHeaderWithBack
            action={action}
            title="Firm Master"
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
              dataList={firmData}
              columnConfig={dtColumns}
              action={action}
              actionClick={actionClick}
              actionTableBtn={actionTableBtn}
            />
          </div>
        )}

        {(action === "add" || action === "edit") && (
          <div>
            <form id="firm-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="m-0 form-container">
                <div
                  className="form-section"
                  style={{ flexDirection: "column" }}
                >
                  <Panel className="pln-card" header="Firm Details">
                    <div className="form-field-group">
                      <label className="form-lbl" style={{ minWidth: "85px" }}>
                        Firm Name:
                      </label>
                      <InputText
                        id="firmName"
                        type="text"
                        className={`p-inputtext-sm ${
                          errors.firmName ? "input-error" : ""
                        }`}
                        {...register("firmName", {
                          required: "Firm Name is required",
                        })}
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
                        id="address"
                        type="text"
                        style={{ height: "85px", width: "265px" }}
                        className={`  ${errors.address ? "input-error" : ""}`}
                        {...register("address", {
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
                        {...register("panNo", {
                          required: "Pan number is required",
                        })}
                      />
                    </div>
                  </Panel>
                  <Panel className="pln-card" header="Bank Details">
                    <div className="form-field-group">
                      <label className="form-lbl" style={{ minWidth: "85px" }}>
                        Bank Name:
                      </label>
                      <InputText
                        id="bankName"
                        type="text"
                        className={`p-inputtext-sm ${
                          errors.bankName ? "input-error" : ""
                        }`}
                        {...register("bankName", {
                          required: "Bank name is required",
                        })}
                      />
                    </div>

                    <div className="form-field-group">
                      <label className="form-lbl" style={{ minWidth: "85px" }}>
                        Bank Account No:
                      </label>
                      <InputText
                        id="accountNo"
                        type="text"
                        className={`p-inputtext-sm ${
                          errors.accountNo ? "input-error" : ""
                        }`}
                        {...register("accountNo", {
                          required: "Bank accountNo is required",
                        })}
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
                        Bank Address:
                      </label>
                      <InputTextarea
                        id="bankAddress"
                        type="text"
                        style={{ height: "85px", width: "265px" }}
                        className={`  ${
                          errors.bankAddress ? "input-error" : ""
                        }`}
                        {...register("bankAddress", {
                          required: "Bank Address is required",
                        })}
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
                        rules={{ required: "City name is required" }}
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
                            className={`field-style ${
                              errors.cityName ? "input-error" : ""
                            }`}
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

export default FirmMaster;
