import HomePage from './pages/HomePage.js';
import DashboardPage from './pages/DashboardPage.js';
import NewTrip from './pages/NewTrip.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
        <Router> 
          <Routes>
            <Route exact path="/" element={<HomePage/>}/>
            <Route path="/pages/DashboardPage" element = {<DashboardPage/>}/>
            <Route path="/pages/NewTrip" element = {<NewTrip/>}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;