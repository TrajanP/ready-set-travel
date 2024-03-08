//This component display brief information for each "Itinerary" found for a user.
//This component is used in the Dashboard Page and triggers for each clicked "Trip"
//Library Imports
import React from 'react';
import { useNavigate } from 'react-router-dom';
//CSS Imports
import css from './componentsCSS/tileOverview.module.css';

export const TileOverview = ({value,passDeleteHandler}) => {

    const navigate = useNavigate();

    return (
        <div className={css.tileOverviewContainer}>
            <div className={css.title}> {value.trip_name} </div>
            <div className={css.description}>
                {value.trip_description}
            </div>
            <div className={css.footer}>
                <button className={css.button} onClick={() => navigate(`/pages/EditTrip/${value?.trip_id}`)}> Edit Trip </button>
                <button className={css.button} onClick={() => passDeleteHandler(value.trip_id)}> Delete Trip </button>
            </div>
        </div>
    );
}

export default TileOverview;