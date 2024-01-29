//This component is the parent container for each "Day" component. It is a sub component of a "Location" on an itinerary. 
//Contains a "Day" component for every day at this location.
//React Imports
import React, {forwardRef, useState} from 'react';
import css from './componentsCSS/dayItinerary.module.css';
//Component Imports
import DayCard from './DayCard.js';
//React Icons Imports
import { MdDisplaySettings } from 'react-icons/md';

export const DayItinerary = forwardRef(({passShowDayItinerary}, ref) => {
    const [days,setDays] = useState([
        {
            day: 1,
            accomodation: "Holiday Inn",
            activity_count: 4,
        },
        {
            day: 2,
            accomodation: "Holiday Inn",
            activity_count: 1,
        },
        {
            day: 3,
            accomodation: "Chalet",
            activity_count: 6,
        },
        {
            day: 4,
            accomodation: "Lincoln's Hostel",
            activity_count: 2,
        },
    ]);

    return (
        <div className={css.container}>
            <div className={css.rightBody}>
                {days.map((item) => (
                    <DayCard passShowDayItinerary={passShowDayItinerary} day={item} ref={ref}/>
                ))}
            </div>
        </div>
    )
});

export default DayItinerary;