import HomePage from './pages/HomePage.js';
import DashboardPage from './pages/DashboardPage.js';
import NewTrip from './pages/NewTrip.js';
import EditTrip from './pages/EditTripPage.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
        <Router> 
          <Routes>
            <Route exact path="/" element={<HomePage/>}/>
            <Route path="/pages/DashboardPage" element = {<DashboardPage/>}/>
            <Route path="/pages/NewTrip" element = {<NewTrip/>}/>
            <Route path="/pages/EditTrip" element = {<EditTrip/>}/> 
          </Routes>
        </Router>
    </div>
  );
}

export default App;