//The Defualt Tile appears first before a trip is selected or if no trips exist.
//Library Imports
import React from 'react';
//CSS Imports
import css from './componentsCSS/tileOverview.module.css';
import TitlePage from '../media/misc/WhereWillYouGo.png';

export const DefaultTile = () => {
    return (
        <div className={css.titleImgContainer}>
            <img alt="Let's add a trip" style={{scale:"1.2"}} src={TitlePage} />
        </div>
    );
}

export default DefaultTile;
