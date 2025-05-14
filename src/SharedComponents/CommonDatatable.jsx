import React from 'react';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button'; // NOT bootstrap's Button
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';

const CommonDataTable = (props) => {
    const { dataList, columnConfig, action , actionClick,actionTableBtn,getOnCellEditComplete } = props;

    const handleButtonClick = (col, rowData) => {      
        
        const dt ={col,rowData,action:col?.action}
        setTimeout(()=>{            
            actionTableBtn(dt)
        },100)
       
    };
    const onCellEditComplete = (e) => {
        let { rowData, newValue, field, originalEvent: event } = e;
        const data = { rowData, newValue, field}      
         getOnCellEditComplete(data);
         
    };

    const cellEditor = (options,col) => {
       
        if (col.colType === "text-edit" && col.isVisible) {
            if(col.fieldType ==="text"){
                return textEditor(options);
            } else if(col.fieldType ==="dropdown-edit"){
                return dropdownEditor(options, col);
            }
           
        }  
    };
    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} onKeyDown={(e) => e.stopPropagation()} />;
    };
    const dropdownEditor = (options, col) => {
    return (
        <Dropdown
            value={options.value}
            options={col.dropdownOptions || []}
            onChange={(e) => options.editorCallback(e.value)}
            placeholder={`Select ${col.header}`}
            className="w-full"
        />
    );
    };
      
    return (
        <>
         <div className='p-data-table'>
         <DataTable value={dataList} editMode="cell" tableStyle={{ width: '100%' }} filterDisplay="row"
          rowClassName={(rowData, rowIndex) => (rowIndex % 2 === 0 ? 'even-row' : 'odd-row')}
          emptyMessage="No record found."  
          paginator
          rows={10} // default rows per page
          rowsPerPageOptions={[5, 10, 20, 50]} >
            {columnConfig.map((col, i) => {
                if (col.colType === "text" && col.isVisible) {
                    if (col?.isFilterApply) {
                        if (col?.isSortApply) {
                            return (
                                
                                <Column key={col.field} field={col.field} header={col.header} sortable filter filterPlaceholder={ `Search by ${col.header}`}  style={{width:col?.width}} 
                                  />
                            );
                        } else{
                            return (
                                <Column key={col.field} field={col.field} header={col.header}  filter filterPlaceholder={ `Search by ${col.header}`}  style={{width:col?.width}} 
                                />
                            );
                        }
                        
                    } else{
                        if (col?.isSortApply) {
                            return (
                                <Column key={col.field} field={col.field} header={col.header} sortable  filterPlaceholder={ `Search by ${col.header}`}  style={{width:col?.width}} />
                            );
                        } else{
                            return (
                                <Column key={col.field} field={col.field} header={col.header}  filterPlaceholder={ `Search by ${col.header}`}  style={{width:col?.width}} 
                                />
                            );
                        }
                       
                    }
                   
                }

                if (col.colType === "text-edit" && col.isVisible) {
                    return (
                        <Column key={col.field} field={col.field} header={col.header}  filterPlaceholder={ `Search by ${col.header}`}  style={{width:col?.width}} 
                        editor={(options) => cellEditor(options,col)} onCellEditComplete={onCellEditComplete}/>
                    );
                }
                if (col.colType === "button" && col.isVisible) {
                    return (
                        <Column
                            key={col.field || i}
                            header={col.header}
                            style={{width:col?.width}}
                            body={(rowData) => (
                                <Button
                                type='button'
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
        </>
        
    );
};

export default CommonDataTable;
