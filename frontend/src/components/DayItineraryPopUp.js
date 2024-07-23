//This component displays a indepth itinerary for a specific day at a "Location".
//It shows hourly details for activities during the day. 
//Not currently implemented
//React Imports
import React, { forwardRef }from 'react';
import css from './componentsCSS/dayItineraryPopUp.module.css';

export const DayItineraryPopUp = forwardRef((props, ref) => {
    const times = [
        {
            time: "06:00",
        },
        {time: "07:00",},
        {time: "08:00",},
        {time: "09:00",},
        {time: "10:00",},
        {time: "11:00",},
        {time: "12:00",},
        {time: "13:00",},
        {time: "14:00",},
        {time: "15:00",},
        {time: "16:00",},
        {time: "17:00",},
        {time: "18:00",},
        {time: "19:00",},
        {time: "20:00",},
        {time: "21:00",},
        {time: "22:00",},
        {time: "23:00",},
        {time: "24:00",},
        {time: "01:00",},
        {time: "02:00",},
        {time: "03:00",},
        {time: "04:00",},
        {time: "05:00",}
    ];
    return(
        <div ref={ref} className={css.popUpContainer}>
            <div className={css.popUpHeader}>
                <h1>Day 2 London</h1>
            </div>
            <div className={css.popUpBody}>
            {times.map((time) => (
                <div className={css.timeCard}><h3>{time.time}</h3> <input type="text"/> </div>
            ))}
            </div>
            <div className={css.popUpFooter}>
                    Accomodation Name:<input type="text"/>
                    Accomodation Address:<input type="text"/>
            </div>
        </div>
    )
});

export default DayItineraryPopUp;