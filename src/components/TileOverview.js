//Library Imports
import React from 'react';
//CSS Imports
import css from './componentsCSS/tileOverview.module.css';

export const TileOverview = ({value,passDeleteHandler}) => {

    return (
        <div className={css.tileOverviewContainer}>
            <div className={css.title}> {value.trip_name} </div>
            <div className={css.description}>
                {value.trip_description}
            </div>
            <div className={css.footer}>
                <button className={css.button} > Edit Trip </button>
                <button className={css.button} onclick={() => passDeleteHandler(value.trip_id)}> Delete Trip </button>
            </div>
        </div>
    );
}

export default TileOverview;