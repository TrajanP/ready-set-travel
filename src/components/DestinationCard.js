//This component represents each "Location" on a trip, and is found on a trip's itinerary page. 
//This component acts as the parent component to many sub child components, which open from this component.
//React Imports
import React, {forwardRef, useState} from 'react';
import css from './componentsCSS/destinationCard.module.css';
//Component Imports
import DayItinerary from './DayItinerary.js';
//DND-Kit Sortable library
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from '@dnd-kit/utilities';
//React-Icons Library Imports
import { MdSurfing } from "react-icons/md";
import { BsPersonWalking } from "react-icons/bs";
import { HiPlusCircle } from "react-icons/hi";
import { HiMinusCircle } from "react-icons/hi";
import { FaChevronCircleDown, FaChevronCircleUp } from 'react-icons/fa';

export const DestinationCard = forwardRef(({id, dest, passShowDayItinerary}, ref) => {

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
    }

    const [dropDown, setDropDown] = useState(false);

    return (
        <div className={css.cardContainer} ref={setNodeRef} style={style} {...attributes} {...listeners} >
            <div className={css.cardBody}>
            <div className={css.header}>
                <div className={css.cardLetter}><h2>{dest.letter}</h2></div>
                <h1>{dest.trip_name}</h1>
                <div style={{position:"absolute", right:"0", paddingRight:"10px"}}>
                    <HiPlusCircle className={css.cardIcon}/>
                    <HiMinusCircle className={css.cardIcon}/>
                </div>
            </div>
            <div className={css.footer}>
                <div onMouseDown={() => setDropDown(!dropDown)}> {dropDown ? <FaChevronCircleUp className={css.cardUpDownIcon} /> : <FaChevronCircleDown className={css.cardUpDownIcon}/>} </div>
                <MdSurfing className={css.cardIcon}/> <h4>6/22/24</h4>
                <BsPersonWalking className={css.cardIcon}/> <h4>6/22/28</h4>
            </div>
            </div>
            {dropDown ? <DayItinerary passShowDayItinerary={passShowDayItinerary} ref={ref}/> : ""}
        </div>
    )
});

export default DestinationCard;