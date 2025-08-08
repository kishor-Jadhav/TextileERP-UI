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
import { DesignService, QualityService, CountService, ReportService } from "../../Services/CommonService/ApiService";
import PanelHeaderWithBack from "../../SharedComponents/PanelHeaderWithBack";
import CommonDataTable from "../../SharedComponents/CommonDatatable";
const DesignMaster = () => {
  const initFormData = {
    designMasterMainId: "",
    designName: "",
    width: "",
    reed: "",
    pick: "",
    warp: "",
    weft: "",
    reedSpace: "",
    weftWestage: "",
    qualityId: "",
    qualityName: "",
  }


  const [action, setAction] = useState("view");
  const [FormData, setFormData] = useState([]);
  const [selectedData, setSelectedData] = useState({});
  const [operation, setOperation] = useState();
  const [toastAction, setToastAction] = useState();

  //Drop down
  const [selectedQaulity, setSelectedQaulity] = useState({});
  const [drQaulityData, setdrQaulityData] = useState([]);

  const columns = [
    {
      field: "designName",
      header: "Design Name",
      colType: "text",
      isVisible: true,
      width: "100px",
      isFilterApply: true,
      isSortApply: true,
    },
    {
      field: "qualityName",
      header: "Quality",
      colType: "text",
      isVisible: true,
      width: "200px",
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

  const countDropdownOptions = [];

  const columnsDG = [
    {
      field: "countName",
      header: "Count Name",
      colType: "text-edit",
      fieldType: "dropdown-edit",
      isVisible: true,
      width: "200px",
      isFilterApply: false,
      isSortApply: false,
      dropdownOptions: countDropdownOptions
    },
    {
      field: "countNo",
      header: "Count",
      colType: "text",
      isVisible: true,
      width: "100px",
      isFilterApply: false,
      isSortApply: false,
    },
    {
      field: "countType",
      header: "Count Type",
      colType: "text",
      isVisible: true,
      width: "100px",
      isFilterApply: false,
      isSortApply: false,
    },
    {
      field: "pick",
      header: "Pick",
      colType: "text-edit",
      fieldType: "text",
      isVisible: true,
      width: "100px",
      isFilterApply: false,
      isSortApply: false,
    },
    {
      field: "repeat",
      header: "Repete",
      colType: "text-edit",
      fieldType: "text",
      isVisible: true,
      width: "100px",
      isFilterApply: false,
      isSortApply: false,
    },
    {
      field: "actualWt",
      header: "Actual WT",
      colType: "text",
      isVisible: true,
      width: "100px",
      isFilterApply: false,
      isSortApply: false,
    },
  ];

  const [dtColumns, setDtColumns] = useState(columns);
  const [dtDGColumns, setDtDGColumns] = useState();
  const [DGData, setDGData] = useState([]);
  const [countDataList, setCountDataList] = useState([]);
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
      DesignService.getDesignMaster().then((data) => setFormData(data));
    }
  }, [action]);

  useEffect(() => {
    QualityService.getQualityMaster().then((data) => setdrQaulityData(data));
    CountService.getCountMaster().then((data) => {
      if (data?.length) {
        data.forEach((item) => {
          item.label = item.countName;
          item.value = item.countId;
        })
        columnsDG[0].dropdownOptions = data;
        setCountDataList(data);
        setDtDGColumns(columnsDG)
      }

    });
  }, [])


  useEffect(() => {
    const Id = selectedData?.rowData?.designMasterMainId;
    if (Id && action === "edit") {
      clearFormData();
      DesignService.getDesignMasterById(Id).then((data) => {
        if (data) {
          reset(data); // populate form on edit

          setValue("qualityName", data?.qualMaster?.qualityName);
          prepaireDGData(data);
        }
      });
    }
  }, [selectedData, action, reset]);

  const prepaireDGData = (data) => {
    const getDGData = data?.designMasterDetailsModel;
    getDGData.forEach((item) => {
      item.countId = item.countDetail.countId;
      item.countName = item.countDetail.countName;
      item.countNo = item.countDetail.countNo;
      item.countType = item.countDetail.countType;
    })
    setDGData(getDGData);
  }
  useEffect(() => {
    if (action === "add") {
      clearFormData();
    }
  }, [action, reset]);
  const actionTableBtn = (dt) => {
    setAction(dt?.action);
    setSelectedData(dt);
  };
  const clearFormData = () => {
    reset(initFormData); // reset form on add
    setDGData([]);
    setSelectedQaulity({});
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

    const payload = data;
    const fullQuality = drQaulityData.find((q) => q.qualityName === data.qualityName); // match selected quality
    payload.qualMaster = fullQuality;
    payload.designMasterDetailsModel = DGData;
    console.log("save Successful:", payload);
    if (action === 'add') {
      await DesignService.saveDesignMaster(data);
      setToastAction('save');
      setAction('view');
    }
    if (action === 'edit') {
      await DesignService.updateDesignMaster(data);
      setToastAction('save');
      setAction('view');
    }
    // Call your save API here, then refresh view
    // Example: await CityMasterService.saveCity(data);
    // Then refetch:
    // CityMasterService.getCityMasterData().then(data => setCityData(data));


  };

  const onCellEditComplete = (e) => {
    let { rowData, newValue, field } = e;


    const data = DGData;
    if (field == "countName") {
      const selectedData = countDataList.filter(
        (item) => item.value == newValue
      )[0];
      data[rowData?.rowNo][field] = selectedData?.label;
      data[rowData?.rowNo].countId = selectedData?.countId;
      data[rowData?.rowNo].countNo = selectedData?.countNo;
      data[rowData?.rowNo].countType = selectedData?.countType;
      data[rowData?.rowNo].repeat = 1;

    } else {
      data[rowData?.rowNo][field] = newValue;
      if (data[rowData?.rowNo].countNo && data[rowData?.rowNo].pick) {
        data[rowData?.rowNo].actualWt = Number(data[rowData?.rowNo].countNo) * Number(data[rowData?.rowNo].repeat) * Number(data[rowData?.rowNo].pick);
      }
    }
    setDGData(data)

  };
  const handleInserRow = () => {
    const i = DGData?.length || 0;

    const newRow = {
      rowNo: i,
      countName: "",
      countNo: "",
      countType: "",
      pick: "",
      repeat: "",
      actualWt: ""
    }

    setDGData([...DGData, newRow]);
  }

  const actionClick = (dt) => {
    setAction(dt);
  }

  const handleExportPDF = () => {
    ReportService.exportDesignMasterReport().then(blob => {
      if (blob && blob instanceof Blob) {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'design-master.pdf'; // Set desired file name
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
            title="Design Master"
            onBack={() => setAction("view")}
          />
        }
        style={{ width: "80%" }}
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
            <form id="loomMaster-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="m-0 form-container">
                <div
                  className="form-section"
                  style={{ flexDirection: "column" }}
                >
                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: "85px" }}>
                      Design Name:
                    </label>
                    <InputText
                      id="designName"
                      type="text"
                      className={`p-inputtext-sm ${
                        errors.designName ? "input-error" : ""
                        }`}
                      {...register("designName", {
                        required: "Design Name is required",
                      })}
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
                      Weft:
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
                      Reed Space:
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
                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: "85px" }}>
                      Weft Westage:
                    </label>
                    <InputText
                      id="weftWestage"
                      type="text"
                      className={`p-inputtext-sm ${
                        errors.weftWestage ? "input-error" : ""
                        }`}
                      {...register("weftWestage")}
                    />
                  </div>

                  <div className="form-field-group">
                    <label className="form-lbl" style={{ minWidth: "85px" }}>
                      Qaulity Name:
                                        </label>
                    <Controller
                      name="qualityName"
                      control={control}
                      rules={{ required: "Quality is required" }}
                      render={({ field }) => (
                        <Dropdown
                          {...field}
                          value={drQaulityData.find((q) => q.qualityName === field.value)}
                          onChange={(e) => {
                            field.onChange(e.value.qualityName); // set cityName in form
                            setSelectedQaulity(e.value);

                          }}
                          options={drQaulityData}
                          optionLabel="qualityName"
                          placeholder="Select a Quality"
                          editable
                          className={`field-style ${
                            errors.qualityName ? "input-error" : ""
                            }`}
                        />
                      )}
                    />
                  </div>

                  <div id='data-table'>
                    <CommonDataTable
                      dataList={DGData}
                      getOnCellEditComplete={onCellEditComplete}
                      columnConfig={dtDGColumns}
                      action={action}
                      actionClick={actionClick}
                      actionTableBtn={actionTableBtn}
                    />
                  </div>
                  <div>
                    <Button
                      className="btn-action"
                      label="Insert Row"
                      onClick={handleInserRow}
                      severity="success"
                      type="button"
                      style={{ margin: '20px' }}
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
}

export default DesignMaster