import { Button } from 'primereact/button';
import React from 'react';
const PanelHeaderWithBack = ({ title, onBack,action }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
     {(action=='add' || action=='edit') && (
        <Button 
        icon="pi pi-arrow-left" 
        text 
        severity="secondary"
        onClick={onBack} 
        className="p-button-sm back-btn"
      />
     )} 
      <span style={{ fontWeight: 'bold' }}>{title}</span>
    </div>
  );
  
  export default PanelHeaderWithBack;