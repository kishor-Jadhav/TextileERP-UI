import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import store from './redux/Store.js'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "primereact/resources/themes/lara-light-blue/theme.css"; 
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import 'primereact/resources/primereact.min.css'; // Core CSS
import 'primereact/resources/themes/saga-blue/theme.css'; // Default Theme
import 'primeicons/primeicons.css'; // PrimeIcons
//import 'primeflex/primeflex.css'; // PrimeFlex utility classes
import App from './App.jsx'
import { Provider } from 'react-redux';
 
createRoot(document.getElementById('root')).render(
  <StrictMode>
     <Provider store={store}>
        <App />
    </Provider>
  </StrictMode>,
)
