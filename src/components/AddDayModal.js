//This component renders the modal to Add a "Day" in a user's itinerary. User is asked to fill in basic "Day" info.
//React Imports
import React, {useState} from 'react';
//React-Bootstrap Imports
import Modal from 'react-bootstrap/Modal';
//CSS Import
import css from '../components/componentsCSS/modalStop.module.css';
//React-Icons Import
import { ImCross } from "react-icons/im";
import StopFinder from '../apis/StopFinder';
//React-Router Imports
import { useParams } from 'react-router-dom';
//API Imports 
import DayFinder from '../apis/DayFinder.js';

export const AddDayModal = (props) => {

    const functionHandler = () => {
        props.passSetAddModalShow(false);
        addDay();
    };

    //Need to establish initial values in case user doesn't change input placeholder from 1.
    const [personCount, setPersonCount] = useState(1);
    const [activitiesCount, setActivitiesCount] = useState(1);

    const addDay = async () => {
        try {
            const response = await DayFinder.post("/", {
                "stop_id": props.stopID,
                "accommodation_id": 1,
                "day_person_count": personCount,
                "day_activity_count": activitiesCount,
                "day_name": document.getElementById("nameID").value
            });
            props.daysHandler();
        } catch (err) {
                console.log(err.message);
            }
    }


    return (
        <div className={css.modalContainers}>
            <Modal show={true} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
              <div className={css.modalContainer} >
                <Modal.Header className={css.modalHeader}>
                    <Modal.Title>Let's add a day!</Modal.Title>
                    <ImCross className={css.exitIcon} onClick={() => props.passSetAddModalShow(false)}/>
                </Modal.Header >
                <Modal.Body className={css.modalBody} >
                    <form>
                        <div className={css.inputGroupRow}>   
                            <div className={css.inputGroupCol}>   
                                <label> Name: </label> 
                                <input id="nameID" type="text" name="DayName" title="Give it a name." placeholder="Museum Day"/>
                            </div>   
                            <div className={css.inputGroupCol}>   
                                <label> Number of People: </label>
                                <input type="number" id="personCountID" name="personCount" title="How many people are on the trip today?" min="1" max="8" placeholder="1" onClick={() => setPersonCount(document.getElementById("personCountID").value)}/>
                            </div>    
                        </div>   
                        <div className={css.inputGroupRow}>  
                            <div className={css.inputGroupCol}>   
                                <label> Accommodation: </label> 
                                <input id="accomodationID" type="text" name="DayAccommodation" title="Where are we staying tonight?" placeholder="Hotel Central"/>
                            </div>    
                            <div className={css.inputGroupCol}>   
                                <label> Number of Activities: </label>
                                <input type="number" id="activitiesCountID" name="activitiesCount" title="How many activities are we doing today?" min="1" max="12" placeholder="1" onClick={() => setActivitiesCount(document.getElementById("activitiesCountID").value)}/>
                            </div>   
                        </div>
                    </form>
                </Modal.Body>
                  <Modal.Footer>
                    <button onClick={() => functionHandler()}>
                        Add Day
                    </button>
                </Modal.Footer>
            </div>
            </Modal>
        </div>
    )
};

export default AddDayModal;