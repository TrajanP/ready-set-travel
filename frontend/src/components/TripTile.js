//The TripTile component is used on the dashboard to represent an individual trip
//React Imports
import React from 'react';
//React Icons Imports
import {FaPlaneDeparture} from 'react-icons/fa';
import {BsFillSunriseFill, BsFillSunsetFill} from 'react-icons/bs';
//CSS Imports
import css from './componentsCSS/tripTile.module.css';

export const TripTile = (props) => {
    //Used to pass data back to Parent Component
    const functionHandler = (data) => {
        props.passShowInfo(data);
        props.passTileID(props.tile.trip_id);
        props.passTile(props.tile);
    }

    const startDate = new Date(props.tile.trip_start_date).toDateString().toLocaleString();
    const endDate = new Date(props.tile.trip_end_date).toDateString().toLocaleString();
    const createdDate = new Date(props.tile.trip_created_date).toDateString().toLocaleString();
    
    return (
        <div className={css.tileContainer} onClick={() => functionHandler(true)}>
            <div className={css.tileTop}>
                <div className={css.header}> {props.tile.trip_name } </div>
                <FaPlaneDeparture className={css.icon}/>
            </div>
            <div className={css.tileBottom}>
                <div>
                    <BsFillSunriseFill/>
                    {startDate}
                </div>
                <div>
                    <BsFillSunsetFill/>
                    {endDate}
                </div>
                <div>
                    Created {createdDate}
                </div>
            </div>
        </div>
    );
}

export default TripTile;