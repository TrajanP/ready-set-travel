//The Defualt Tile appears first before a trip is selected or if no trips exist.
//Library Imports
import React, { useRef, useEffect, useState } from 'react';
//CSS Imports
import css from './componentsCSS/tripTile.module.css';

export const DefaultTile = (props) => {
    return (
        <div className={css.tileContainer}>
                {/* <spline-viewer url="https://prod.spline.design/GTFxI7JaIAusIY7P/scene.splinecode"></spline-viewer> */}
            Create a trip to begin exploring.
        </div>
    );
}

export default DefaultTile;