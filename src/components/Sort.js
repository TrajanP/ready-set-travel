//This was designed as being a generic template for a Sorting component. 
//By passing the properties which you can sort by and the value shown on the button.

import React , {useState} from 'react';
import { FaChevronCircleDown, FaChevronCircleUp } from 'react-icons/fa';
import css from './componentsCSS/filter.module.css';

export const Sort = ({ sortLabel, options, passSortByData, passedData }) => {

    const [showSort, setShowSort] = useState(false);

    const compareSoonest = (a,b) => {
        var date1 = new Date(a.trip_start_date);
        var date2 = new Date(b.trip_start_date);
        // console.log(`Place1 ${a.trip_name} Place2 ${b.trip_name}`)
        if (date1 > date2)
            return 1;
        else if (date1 < date2)
            return -1;
        else
            return 0;
    };

    const compareFurthest = (a,b) => {
        var date1 = new Date(a.trip_start_date);
        var date2 = new Date(b.trip_start_date);
        // console.log(`Place1 ${a.trip_name} Place2 ${b.trip_name}`)
        if (date1 > date2)
            return -1;
        else if (date1 < date2)
            return 1;
        else
            return 0;
    };

    const sortHandler = (sortBy) => {
        // console.log(`Orginal Data: ${passedData[0].trip_start_date}`);
        // console.log(`UnSortedData ${passedData[0].trip_id} ${passedData[1].trip_id}`);
        var sorted = [];
        if(passedData.length!=0)
        {
            if(sortBy === "Soonest")
            {
                // console.log("Soonest");
                document.getElementById("Furthest").checked = false;
                sorted = [...passedData].sort(compareSoonest);
            }
            else if(sortBy === "Furthest")
            {
                // console.log("Furthest")
                document.getElementById("Soonest").checked = false;
                sorted = [...passedData].sort(compareFurthest);   
            }
            passSortByData(sorted);
            // console.log("Changing data");
        }
        // console.log(`SortedData ${sorted[0].trip_id} ${sorted[1].trip_id}`);
    };

    return (
        <div className={css.container}>
                    <button id="sortID" onClick={() => setShowSort(!showSort)} > {sortLabel} {showSort ? <FaChevronCircleUp/> : <FaChevronCircleDown/>} </button>
                    <li className={`${css.options} ${showSort ? css.show: ""}`}>
                        {options.map(option => (
                            <label for={option.label}>
                                {/* <ul onMouseDown={(event) => {event.preventDefault(); }} key={option.label} className={css.option}> */}
                                <ul key={option.label} className={css.option}>
                                    <input type="checkbox" id={option.label} onChange={() => sortHandler(option.label)}></input> {option.label} 
                                </ul>
                            </label>
                        ))}
                    </li>
        </div>
    )
}

export default Sort;