//This component represents each "Location" on a trip, and is found on a trip's itinerary page. 
//This component acts as the parent component to many sub child components, which open from this component.
//React Imports
import React, {forwardRef, useState, useEffect} from 'react';
import css from './componentsCSS/destinationCard.module.css';
//Component Imports
import DayItinerary from './DayItinerary.js';
import AddStopModal from './AddStopModal.js';
import RemoveStopModal from './RemoveStopModal.js';
//DND-Kit Sortable library
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
//React-Icons Library Imports
import { MdSurfing } from "react-icons/md";
import { BsPersonWalking } from "react-icons/bs";
import { HiPlusCircle } from "react-icons/hi";
import { HiMinusCircle } from "react-icons/hi";
import { FaChevronCircleDown, FaChevronCircleUp } from 'react-icons/fa';

export const StopCard = forwardRef(({id, dest, passShowDayItinerary, stopsHandler}, ref) => {

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({id:id});

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    const [modalAddShow, setAddModalShow] = useState(false);
    const [modalRemoveShow, setRemoveModalShow] = useState(false);
    const [dropDown, setDropDown] = useState(false);

    const startDateRaw = new Date(dest.stop_first_day);
    const startDate = (startDateRaw.getMonth()+ 1) + "/" + startDateRaw.getDate() + "/" + startDateRaw.getFullYear();
    const endDateRaw = new Date(dest.stop_last_day);
    const endDate = (endDateRaw.getMonth()+ 1) + "/" + endDateRaw.getDate() + "/" + endDateRaw.getFullYear();

    return (
        <div className={css.cardContainer} ref={setNodeRef} style={style} {...attributes} {...listeners} >
            <div className={css.cardBody}>
                <div className={css.header}>
                    <div className={css.cardLetter}><h2>{dest.letter}</h2></div>
                    <h1>{dest.stop_name}</h1>
                    <div style={{position:"absolute", right:"0", paddingRight:"10px"}}>
                        <HiPlusCircle className={css.cardIcon} onMouseDown={() => setAddModalShow(true)}/>
                        <HiMinusCircle className={css.cardIcon} onMouseDown={() => setRemoveModalShow(true)}/>
                    </div>
                </div>
                <div className={css.footer}>
                    <div onMouseDown={() => setDropDown(!dropDown)}> {dropDown ? <FaChevronCircleUp className={css.cardUpDownIcon} /> : <FaChevronCircleDown className={css.cardUpDownIcon}/>} </div>
                    <MdSurfing className={css.cardIcon}/> <h4>{startDate}</h4>
                    <BsPersonWalking className={css.cardIcon}/> <h4>{endDate}</h4>
                </div>
            </div>
            {dropDown ? <DayItinerary passShowDayItinerary={passShowDayItinerary} stopID={dest.stop_id} ref={ref}/> : ""}
            {modalAddShow ?<AddStopModal passSetAddModalShow={setAddModalShow} stopsHandler={stopsHandler}/>: ""}
            {modalRemoveShow ?<RemoveStopModal passSetRemoveModalShow={setRemoveModalShow} stopsHandler={stopsHandler} stop={dest}/>: ""}
        </div>
    )
});

export default StopCard;