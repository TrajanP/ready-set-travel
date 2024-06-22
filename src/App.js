//Component Imports
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import NewTrip from './pages/NewTrip';
import EditTrip from './pages/EditTripPage';
import AccountPage from './pages/AccountPage';
//Library Imports
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from 'react';
//Middleware Imports
import PrivateRoutes from './utils/PrivateRoutes';
import { UserContext } from './context/UserContext';

function App() {
  const [user, setUser] = useState({
    username: "No User",
    accessToken: "No Token",
    isAuth: false,
  });

  return (
    <div>
      <Router> 
        <UserContext.Provider value={{user, setUser}}>
          <Routes>
            <Route exact path="/" element={<HomePage/>}/>
            <Route element ={<PrivateRoutes />}> 
              <Route path="/pages/NewTrip" element = {<NewTrip/>}/>
              <Route path="/pages/EditTrip/:tripid" element = {<EditTrip/>}/> 
              <Route path="/pages/DashboardPage" element = {<DashboardPage/>}/>
              <Route path="/pages/AccountPage" element = {<AccountPage/>}/>
            </Route>
          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
