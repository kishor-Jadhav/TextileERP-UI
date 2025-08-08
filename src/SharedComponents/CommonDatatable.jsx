import React, { useState } from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

const CommonDataTable = (props) => {
  const {
    dataList,
    columnConfig,
    action,
    actionClick,
    actionTableBtn,
    getOnCellEditComplete,
    onClickDGChk,
    dataTableType,
    isPaginationRequired,
    isScrollableRequired,
    lazy,
    loading,
    onLazyLoad,
  } = props;

  const [selectedRows, setSelectedRows] = useState([]);

  const handleButtonClick = (col, rowData) => {
    const dt = { col, rowData, action: col?.action };
    setTimeout(() => {
      actionTableBtn(dt);
    }, 100);
  };

  const onCellEditComplete = (e) => {
    let { rowData, newValue, field } = e;
    const data = { rowData, newValue, field };
    getOnCellEditComplete(data);
  };

  const cellEditor = (options, col) => {
    if (col.colType === "text-edit" && col.isVisible) {
      if (col.fieldType === "text") {
        return textEditor(options);
      } else if (col.fieldType === "dropdown-edit") {
        return dropdownEditor(options, col);
      }
    }
    return null;
  };

  const textEditor = (options) => (
    <InputText
      type="text"
      value={options.value}
      onChange={(e) => options.editorCallback(e.target.value)}
      onKeyDown={(e) => e.stopPropagation()}
    />
  );

  const dropdownEditor = (options, col) => (
    <Dropdown
      value={options.value}
      options={col.dropdownOptions || []}
      onChange={(e) => options.editorCallback(e.value)}
      placeholder={`Select ${col.header}`}
      className="w-full"
    />
  );

  return (
    <div className="p-data-table">
      <DataTable
        value={dataList}
        editMode="cell"
        tableStyle={{ width: "100%" }}
        filterDisplay="row"
        rowClassName={(rowData, rowIndex) =>
          rowIndex % 2 === 0 ? "even-row" : "odd-row"
        }
        emptyMessage="No record found."
        selection={selectedRows}
        
        dataKey="id" // <-- make sure your objects have this field or replace with actual unique key
        lazy={lazy}
        loading={loading}
        virtualScrollerOptions={{
          itemSize: 80,
          lazy: true,
          onLazyLoad,
          delay: 300,
        }}
        {...(isPaginationRequired && {
          paginator: true,
          rows: 10,
          rowsPerPageOptions: [5, 10, 20, 50],
        })}
        {...(isScrollableRequired && {
          scrollable: true,
          scrollHeight: "200px",
        })}
      >
        {columnConfig.map((col, i) => {
          if (!col.isVisible) return null;

          // Checkbox column
          if (col.colType === "check-box" && col.isVisible) {
            return (
              <Column
                key={col.field}
                header={col.header}
                style={{ width: col.width || "3rem" }}
                body={(rowData) => (
                  <input
                    type="checkbox"
                    checked={rowData[col.field] || false}
                    onChange={(e) =>
                      onClickDGChk?.({ rowData, checked: e.target.checked,field:col.field })
                    }
                  />
                )}
              />
            );
          }
          // Regular text column
          if (col.colType === "text") {
            return (
              <Column
                key={col.field}
                field={col.field}
                header={col.header}
                sortable={col?.isSortApply}
                filter={col?.isFilterApply}
                filterPlaceholder={`Search by ${col.header}`}
                style={{ width: col?.width }}
              />
            );
          }

          // Editable column
          if (col.colType === "text-edit") {
            return (
              <Column
                key={col.field}
                field={col.field}
                header={col.header}
                editor={(options) => cellEditor(options, col)}
                onCellEditComplete={onCellEditComplete}
                style={{ width: col?.width }}
                filterPlaceholder={`Search by ${col.header}`}
              />
            );
          }

          // Button column
          if (col.colType === "button") {
            return (
              <Column
                key={col.field || i}
                header={col.header}
                style={{ width: col?.width }}
                body={(rowData) => (
                  <Button
                    type="button"
                    label={col.label || col.header}
                    onClick={() => handleButtonClick(col, rowData)}
                    className={`p-button-sm ${col.classStyleName}`}
                  />
                )}
              />
            );
          }

          return null;
        })}
      </DataTable>
    </div>
  );
};

export default CommonDataTable;
