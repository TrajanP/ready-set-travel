//This was designed as being a generic template for a Filtering component. 
//By passing the properties which you can filter by and the value shown on the button.

//Library Imports
import React, {useState} from 'react';
import {FaChevronCircleDown, FaChevronCircleUp} from 'react-icons/fa';
//CSS Imports
import css from './componentsCSS/filter.module.css';

export const Filter = ({filterLabel, options}) => {

    const [showFilter, setShowFilter] = useState(false);
    
    return (
        // onBlur={() => (setShowFilter(false), console.log("Fudge"))}> Is failing because the Label is messing up the propogation of onblur
        <div className={css.container} >
            <button id="filterID" onClick={() => setShowFilter(!showFilter)} > {filterLabel} {showFilter ? <FaChevronCircleUp/> : <FaChevronCircleDown/>} </button>
            <li className={`${css.options} ${showFilter ? css.show: ""}`}>
                {options.map(option => (
                    <label for={option.label}>
                        <ul onMouseDown={(event) => {event.preventDefault(); console.log("Prevent")}} key={option.label} className={css.option}>
                            <input type="checkbox" id={option.label}></input> {option.label} 
                        </ul>
                    </label>
                ))}
            </li>
        </div>
    )
}

export default Filter;