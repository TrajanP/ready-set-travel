//Component is used to display the first New Trip form's page.

//Library Imports
import {React, useState} from 'react';
//CSS Import
import css from './componentsCSS/newTripForm.module.css';

export const NewTrip1 = ({ module, passNewTrip }) => {

    const handleChange = () => {
        let tripName = document.getElementById("nameID").value;
        let tripDescription = document.getElementById("descriptionID").value;
        passNewTrip({name: tripName, description: tripDescription}); //We use this to carry the 1st page state to the next page, where we submit all the data.
    };

    return (
        <div>

            <div className={css.title}>
                Describe Your Trip!
            </div>
            <div className={css.description}>
                <p> Your trip is more than just a packed suitcase! Give your trip a name and description which best describes it.</p>
            </div>
            <div className={css.inputField}>
                <form>
                    <div className={css.largeInput}>   
                        <label> Trip Name </label>
                        <input id="nameID" type="text" name="name" placeholder="French Riviera"/>
                    </div>  

                    <div className={css.largeInput}>
                        <label> Trip Description </label>
                        <textarea id="descriptionID" name="description" rows="3" cols="50" placeholder="The trip of a lifetime!" />
                    </div>
                    <div className={css.largeInput}>
                        <button className={css.buttonNext} onClick={() => {handleChange(); module(1)}}> Next </button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default NewTrip1;