//The NewTrip page hosts the form for a user to create a new trip.

//Library Imports
import {React, useState} from 'react';
//Component Imports
import NavBar from '../components/NavbarMain.js';
import NewTrip1 from '../components/NewTrip1.js';
import NewTrip2 from '../components/NewTrip2.js';
//CSS Import
import css from './pagesCSS/newTrip.module.css';
//Media Imports
import Balloons from '../media/misc/HotAirBalloons.gif';


export const NewTrip = () => {

    const [module, setModule] = useState(0);
    const [newTrip, setNewTrip] = useState({name:"Mytrip", origin: "", return: "", description: "", type: "", start: "", end: "", purpose: ""});
    let shownModule;

    //Controls which Form tile is shown
    const handleModule = (value) => {
        setModule(value);
    }

    //Allows previous tile state input to be saved for final submission
    const handleTripState = (newValue) => {
        setNewTrip(newValue);
    }

    if(module === 0)
        shownModule = <NewTrip1 module={handleModule} passNewTrip = {handleTripState}/>
    else if(module === 1)
        shownModule = <NewTrip2 trip = {newTrip}/>

    return (
        <div className={css.body}>
            <NavBar/>
            <div className={css.moduleBody}>
                <div className={css.bodyLeft}>
                    <img alt="Hot Air balloons" src = {Balloons}/>
                </div>
                <div className={css.bodyRight}>
                    {shownModule}
                </div>
            </div>
        </div>
    )

};

export default NewTrip;