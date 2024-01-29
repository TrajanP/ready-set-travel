//This component is used to represent each "Day" for a location on the Itinerary page. 
//The component is clickable to open up the day's hour to hour schedule.
//React Imports
import React, { forwardRef, useState } from 'react';
import css from './componentsCSS/dayCard.module.css';
//React Icons Imports
import { MdLocalHotel, MdOutlineAttractions } from "react-icons/md";

export const DayCard = forwardRef(({day, passShowDayItinerary}, ref) => {
    return (
        <div className={css.container} onMouseDown={() => passShowDayItinerary()} ref={ref}>
                <div><h5>Day {day.day}</h5></div>
                <span style={{position:"relative", marginRight:"100px"}}><div style={{position:"absolute", left:"0", width:"200px"}}><MdLocalHotel className={css.iconContainer}/> {day.accomodation}</div></span>
                <div><MdOutlineAttractions className={css.iconContainer}/> {day.activity_count}</div>
        </div>
    )
});

export default DayCard;