//This component is used to represent each "Day" for a location on the Itinerary page. 
//The component will be clickable to open up the day's hour to hour schedule.
//React Imports
import React, { forwardRef, useState } from 'react';
import css from './componentsCSS/dayCard.module.css';
//Component Imports
import AddDayModal from './AddDayModal.js';
import RemoveDayModal from './RemoveDayModal.js';
//React Icons Imports
import { MdLocalHotel, MdOutlineAttractions } from "react-icons/md";
import { HiPlusCircle, HiMinusCircle } from "react-icons/hi";

export const DayCard = forwardRef(({ day, passShowDayItinerary, daysHandler, stopID }, ref) => {

    const [modalAddShow, setAddModalShow] = useState(false);
    const [modalRemoveShow, setRemoveModalShow] = useState(false);

    return (
        <div className={css.container} onMouseDown={() => passShowDayItinerary} ref={ref}>
            <div>
                <div className={css.dayLabelBorder}><h5>Day {day.day_order} </h5></div>
                <div style={{display:"flex", textAlign: "start"}}><h4>{day.day_name} </h4></div>
            </div>
            <div>
                <div style={{display:"block"}}>
                    <HiPlusCircle className={css.cardIcon} onClick={() => setAddModalShow(true)}/>
                    <HiMinusCircle className={css.cardIcon} onClick={() => setRemoveModalShow(true)}/>
                </div>
                <div>
                    <div style={{display:"inline", paddingRight:"10px"}}><MdLocalHotel className={css.iconContainer}/> 5</div>
                    <MdOutlineAttractions className={css.iconContainer}/> 5 
                </div>
            </div>
                {modalAddShow ? <AddDayModal passSetAddModalShow={setAddModalShow} daysHandler={daysHandler} stopID={stopID}/> : ""}
                {modalRemoveShow ?<RemoveDayModal passSetRemoveModalShow={setRemoveModalShow} daysHandler={daysHandler} day={day}/>: ""}
        </div>
    )
});

export default DayCard;