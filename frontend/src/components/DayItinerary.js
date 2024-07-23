//This component is the parent container for each "Day" component. It is a sub component of a "Location" on an itinerary. 
//Contains a "Day" component for every day at this location.
//React Imports
import React, { forwardRef, useState, useEffect, useContext } from 'react';
import css from './componentsCSS/dayItinerary.module.css';
//Component Imports
import DayCard from './DayCard.js';
import AddDayModal from './AddDayModal.js';
//React Icons Imports
import { MdDisplaySettings } from 'react-icons/md';
//API Imports
import DayFinder from '../apis/DayFinder.js';
//Middleware Imports
import { UserContext } from '../context/UserContext';

export const DayItinerary = forwardRef(({ passShowDayItinerary, stopID }, ref) => {

    const [myDays, setMyDays] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [daysChanged, setDaysChanged] = useState(false);
    const { user, setUser } = useContext(UserContext);

    //Get all days for a given Trip's Stop
    useEffect(() => {
        const getDays = async () => {
            try {
                const response = await DayFinder.get(`/${stopID}`, { 
                    headers: { 
                        Authorization: `Bearer ${user.accessToken}`
                    }
                });
                setMyDays(response.data);
            } catch (err) {
                console.error(err.message);
            }
        }   
        getDays();
    }, [daysChanged]);

    const daysHandler = () => {
        setDaysChanged(!daysChanged);
    };

    return (
        <div className={css.container}>
            <div className={css.rightBody}>
                {myDays.length === 0 ? 
                <div className={css.noDaysContainer}>
                    <div> What are we doing first? Lets add a Day to begin. </div>
                    <div className={css.noDaysButtonContainer}> 
                        <button onClick={() => setAddModalShow(true)}>Add Day</button> 
                    </div>
                </div> : ""}
                {addModalShow ? <AddDayModal passSetAddModalShow={setAddModalShow} daysHandler={daysHandler} stopID={stopID} ref={ref}/> : ""}
                {myDays.map((item) => (
                    <DayCard passShowDayItinerary={passShowDayItinerary} day={item} daysHandler={daysHandler} stopID={stopID} ref={ref}/>
                ))}
            </div>
        </div>
    )
});

export default DayItinerary;

