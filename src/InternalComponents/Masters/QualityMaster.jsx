import React, { useState, useEffect } from "react";
import "../../CommonCss/_formStyle.scss";
import {
  Panel,
  InputText,
  useForm,
  Message,
  Dropdown,
  Controller,
  Button
} from "./../../CommonImports/commonImports";
import FormActionContainer from "../FormActionContainer";
import { QualityService, ReportService } from "../../Services/CommonService/ApiService";
import PanelHeaderWithBack from "../../SharedComponents/PanelHeaderWithBack";
import CommonDataTable from "../../SharedComponents/CommonDatatable";
const QualityMaster = () => {
  const initFormData = {
    qualityId: "",
    width: "",
    reed: "",
    pick: "",
    warp: "",
    weft: "",
    reedSpace: "",
    qualityName: "",
    qualityAlice: "",
  };

  const [action, setAction] = useState("view");
  const [FormData, setFormData] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [operation, setOperation] = useState();
  const [toastAction, setToastAction] = useState();
  

  const columns = [
    {
      field: "qualityName",
      header: "Quality Name",
      colType: "text",
      isVisible: true,
      width: "100px",
      isFilterApply: true,
      isSortApply: true,
    },
    {
      field: "qualityAlice",
      header: "Quality Alice",
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
    formState: { errors },
  } = useForm({
    defaultValues: initFormData,
  });

  useEffect(() => {
    if (action == "view") {
      QualityService.getQualityMaster().then((data) => setFormData(data));
    }
  }, [action]);

  useEffect(() => {
    const Id = selectedData?.rowData?.qualityId;
    if (Id && action === "edit") {
      QualityService.getQualityMasterById(Id).then((data) => {
        if (data) {
          reset(data); // populate form on edit
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
      await QualityService.saveQualityMaster(data);
      setToastAction("save");
      setAction("view");
    }
    if (action === "edit") {
      await QualityService.updateQualityMaster(data);
      setToastAction("save");
      setAction("view");
    }
    // Call your save API here, then refresh view
    // Example: await CityMasterService.saveCity(data);
    // Then refetch:
    // CityMasterService.getCityMasterData().then(data => setCityData(data));
  };
  const actionClick =(dt)=>{
    setAction(dt);
  }
  const handleExportPDF=()=>{
    ReportService.exportQualityMasterReport().then(blob => {
      if (blob && blob instanceof Blob) {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'quality-master.pdf'; // Set desired file name
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url); // Clean up
      } else {
        console.error("Failed to export: ", blob?.error || "Unknown error");
      }
    }).catch(err => {
      console.error("Download failed:", err);
    });
  }
  return (
    <>
      <Panel
        header={
          <PanelHeaderWithBack
            action={action}
            title="Quality Master"
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
          <>
           <div>
          
           <Button
                className="btn-action"
                label="Export PDF"
                onClick={handleExportPDF}
                severity="danger"
                text
                type="button"
              />    
         </div>
          <div>
            <CommonDataTable
              dataList={FormData}
              columnConfig={dtColumns}
              action={action}
              actionClick={actionClick}
              actionTableBtn={actionTableBtn}
            />
          </div>
          </>
        )}

        {(action === "add" || action === "edit") && (
          <div>
            <form id="count-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="m-0 form-container">
                <div
                  className="form-section"
                  style={{ flexDirection: "column" }}
                >
                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: "85px" }}>
                      Quality Name:
                    </label>
                    <InputText
                      id="qualityName"
                      type="text"
                      className={`p-inputtext-sm ${
                        errors.qualityName ? "input-error" : ""
                      }`}
                      {...register("qualityName", {
                        required: "Count Name is required",
                      })}
                    />
                  </div>

                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: "85px" }}>
                      Quality Alice:
                    </label>
                    <InputText
                      id="qualityAlice"
                      type="text"
                      className={`p-inputtext-sm ${
                        errors.qualityAlice ? "input-error" : ""
                      }`}
                      {...register("qualityAlice")}
                    />
                  </div>
                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: "85px" }}>
                      Width:
                    </label>
                    <InputText
                      id="width"
                      type="text"
                      className={`p-inputtext-sm ${
                        errors.width ? "input-error" : ""
                      }`}
                      {...register("width")}
                    />
                  </div>
                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: "85px" }}>
                      Reed:
                    </label>
                    <InputText
                      id="reed"
                      type="text"
                      className={`p-inputtext-sm ${
                        errors.reed ? "input-error" : ""
                      }`}
                      {...register("reed")}
                    />
                  </div>
                   <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: "85px" }}>
                      Pick:
                    </label>
                    <InputText
                      id="pick"
                      type="text"
                      className={`p-inputtext-sm ${
                        errors.pick ? "input-error" : ""
                      }`}
                      {...register("pick")}
                    />
                  </div>
                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: "85px" }}>
                      Pick:
                    </label>
                    <InputText
                      id="pick"
                      type="text"
                      className={`p-inputtext-sm ${
                        errors.pick ? "input-error" : ""
                      }`}
                      {...register("pick")}
                    />
                  </div>
                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: "85px" }}>
                      Warp:
                    </label>
                    <InputText
                      id="warp"
                      type="text"
                      className={`p-inputtext-sm ${
                        errors.warp ? "input-error" : ""
                      }`}
                      {...register("warp")}
                    />
                  </div>
                   <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: "85px" }}>
                      Warp:
                    </label>
                    <InputText
                      id="weft"
                      type="text"
                      className={`p-inputtext-sm ${
                        errors.weft ? "input-error" : ""
                      }`}
                      {...register("weft")}
                    />
                  </div>
                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: "85px" }}>
                      Warp:
                    </label>
                    <InputText
                      id="reedSpace"
                      type="text"
                      className={`p-inputtext-sm ${
                        errors.reedSpace ? "input-error" : ""
                      }`}
                      {...register("reedSpace")}
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
export default QualityMaster;
