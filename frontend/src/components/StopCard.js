//This component represents each "Location" on a trip, and is found on a trip's itinerary page. 
//This component acts as the parent component to many sub child components, which open from this component.
//React Imports
import React, {forwardRef, useState } from 'react';
import css from './componentsCSS/stopCard.module.css';
//Component Imports
import DayItinerary from './DayItinerary.js';
import AddStopModal from './AddStopModal.js';
import RemoveStopModal from './RemoveStopModal.js';
//React-Icons Library Imports
import { MdSurfing } from "react-icons/md";
import { BsPersonWalking } from "react-icons/bs";
import { HiPlusCircle } from "react-icons/hi";
import { HiMinusCircle } from "react-icons/hi";

export const StopCard = forwardRef(({ id, dest, passShowDayItinerary, stopsHandler, stopsCount, setNewStop, map={map}, markersList={markersList}, setMarkersList={setMarkersList}, stopIndex={stopIndex} }, ref) => {

    //Component State
    const [modalAddShow, setAddModalShow] = useState(false);
    const [modalRemoveShow, setRemoveModalShow] = useState(false);
    const [dropDown, setDropDown] = useState(false);

    //Date Conversions
    const startDateRaw = new Date(dest.stop_first_day);
    const startDate = (startDateRaw.getMonth()+ 1) + "/" + startDateRaw.getDate() + "/" + startDateRaw.getFullYear();
    const endDateRaw = new Date(dest.stop_last_day);
    const endDate = (endDateRaw.getMonth()+ 1) + "/" + endDateRaw.getDate() + "/" + endDateRaw.getFullYear();

    return (
        <div className={css.cardContainer}>
            <div className={css.cardBody}>
                <div className={css.header}>
                    <div className={css.cardLetter}><h2>{stopIndex + 1}</h2></div>
                    <div>
                        <h1 className={css.name}> {dest.stop_name} </h1> 
                    </div>
                    <div style={{position:"absolute", right:"0", paddingRight:"10px"}}>
                        <HiPlusCircle className={css.cardIcon} onMouseDown={() => setAddModalShow(true)}/>
                        <HiMinusCircle className={css.cardIcon} onMouseDown={() => setRemoveModalShow(true)}/>
                    </div>
                </div>
                <h3 className={css.location}> {dest.stop_location} </h3> 
                <div className={css.footer}>
                    {/* <div onMouseDown={() => setDropDown(!dropDown)}> {dropDown ? <FaChevronCircleUp className={css.cardUpDownIcon} /> : <FaChevronCircleDown className={css.cardUpDownIcon}/>} </div> */}
                    <MdSurfing className={css.cardIcon}/> <h4>{startDate}</h4>
                    <BsPersonWalking className={css.cardIcon}/> <h4>{endDate}</h4>
                </div>
            </div>
            {dropDown ? <DayItinerary passShowDayItinerary={passShowDayItinerary} stopID={dest.stop_id} ref={ref}/> : ""}
            {modalAddShow ?<AddStopModal passSetAddModalShow={setAddModalShow} stopsHandler={stopsHandler} stopsCount={stopsCount} setNewStop={setNewStop} map={map} markersList={markersList} setMarkersList={setMarkersList} stop={dest} stopIndex={stopIndex}/>: ""}
            {modalRemoveShow ?<RemoveStopModal passSetRemoveModalShow={setRemoveModalShow} stopsHandler={stopsHandler} stop={dest} map={map} markersList={markersList} setMarkersList={setMarkersList} stopIndex={stopIndex}/>: ""}
        </div>
    )
});

export default StopCard;