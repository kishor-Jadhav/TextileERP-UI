import React,{useRef} from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';  
import { OverlayPanel } from 'primereact/overlaypanel';

import './../CommonCss/_headerMenueStyle.scss';

const HeaderMenue = ({ config }) => {
  const { title, leftLogo, menuItems ,rightSearchBox,endButtons,profileMenu  } = config;
  const op = useRef(null);
   

  const start = (
  <>
  {title.visible && leftLogo.visible && (
    <>
    <div>
      <h1>{title.label}</h1>
    <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2">
    </img>
    </div>
    </>
  )}
  {
    !title.visible && leftLogo.visible && (
      <>
      <div>        
      <img alt="logo" src="https://primefaces.org/cdn/primereact/images/logo.png" height="40" className="mr-2">
      </img>
      </div>
      </>
    )
  }

{
    title.visible && !leftLogo.visible && (
      <>
      <div>        
      <h1>{title.label}</h1>
      </div>
      </>
    )
  }
  
  </>)
  const end = (
      <div className="flex align-items-center gap-2">
        {rightSearchBox.visible && (
        <InputText
          placeholder={rightSearchBox.placeholder || 'Search...'}
          onChange={(e) => rightSearchBox.onSearch?.(e.target.value)}
          type="text"
          className="w-8rem sm:w-auto"
        />
      )}
      {endButtons.visible && (
        endButtons.buttonsItem.map((btnitem)=>(
             <>
               {btnitem.type === 'icon'  && btnitem?.visible && <Button                 
                icon={btnitem.icon || ''}
                className={btnitem.className || 'p-button-primary'}
                onClick={btnitem.onClick}
               >{btnitem.label ? btnitem.label : ''}</Button> }

                {btnitem.type === 'button' && btnitem?.visible && <Button                
                icon={btnitem.icon || ''}
                className={btnitem.className || 'p-button-primary'}
                onClick={btnitem.onClick}
               >{btnitem.label}</Button>}
             </>
        ))
      
      )}
      
        {profileMenu.visible && <><Avatar
          image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
          shape="circle"
          onClick={(e) => op.current.toggle(e)}
          style={{ cursor: 'pointer' }}
        /> 
          <OverlayPanel ref={op} dismissable>
          <ul className="p-0 m-0" style={{ listStyleType: 'none' }}>
            {profileMenu.items.map((item, index) => (
              <li key={index} className="p-2">
                <Button
                  label={item.label}
                  icon={item.icon}
                  className="p-button-text"
                  onClick={item.command}
                />
              </li>
            ))}
          </ul>
        </OverlayPanel>
        </>
       }
      </div>
  );

  return (
    <>
    <div className='select-theme-blue header-menue'>
      <Menubar model={menuItems} start={start} end={end} />
    </div>
    </>
    
  );
};

export default HeaderMenue;
