import React,{useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, asyncIncrement } from './redux/actions/counterActions';
import LandingPageComponent from './ExternalComponents/AuthenticationComponents/LandingPageComponent';
import { ApplicationProvider } from './Context/applicationGlobalContext';
import ApplicationInterceptor from './Interceptor/ApplicationInterceptor';
import ApplicationDashboad from './InternalComponents/ApplicationDashboad';
import ContactMaster from './InternalComponents/Masters/ContactMaster'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import CityMaster from './InternalComponents/Masters/CityMaster';
import FirmMaster from './InternalComponents/Masters/FirmMaster';
import PartyMaster from './InternalComponents/Masters/PartyMaster';
import LoomMaster from './InternalComponents/Masters/LoomMaster';
 

function App() {
    
    const [isSignIn,setSignIn] = useState(false);

    const handleLoginEvent=(isSign)=>{   
      setSignIn(isSign);
      console.log(isSign);
    }
    const handleSignOut =(isSign)=>{
        setSignIn(isSign);
    }
    return (
        <ApplicationProvider>
            <ApplicationInterceptor>              
               <Router>
                <Routes>
                    <Route path="/" element={isSignIn ? <Navigate to="/dashboard" /> : <LandingPageComponent handleLoginEvent={handleLoginEvent} />} />
                    <Route path="/dashboard" element={isSignIn ? <ApplicationDashboad handleSignOutEvent = {handleSignOut} /> : <Navigate to="/" />} >
                   
                    <Route path="cityMaster" element={<CityMaster />} />
                    <Route path="firmMaster" element={<FirmMaster />} />
                    <Route path="partyMaster" element={<PartyMaster />} />
                    <Route path="loomMaster" element={<LoomMaster />} />
                    </Route>
                </Routes>
               </Router>
            </ApplicationInterceptor>
        </ApplicationProvider>
        
    );
}

export default App;
