//This component renders the modal to Add a "Stop" in a user's itinerary. User is asked to fill in basic "Stop" info.
//React Imports
import React, {useState} from 'react';
//React-Bootstrap Imports
import Modal from 'react-bootstrap/Modal';
//CSS Import
import css from '../components/componentsCSS/modalStop.module.css';
//React-Icons Import
import { ImCross } from "react-icons/im";
//React-Router Imports
import { useParams } from 'react-router-dom';
//API Imports
import StopFinder from '../apis/StopFinder.js';

export const AddStopModal = (props) => {
    const { tripid } = useParams();

    const functionHandler = () => {
        props.passSetAddModalShow(false);
        postStop();
    };

    const postStop = async () => {
        try {
            const response = await StopFinder.post("/", {
                "trip_id": tripid,
                "stop_name": document.getElementById("nameID").value,
                "stop_location": document.getElementById("locationID").value,
                "stop_first_day": document.getElementById("startDateID").value,
                "stop_last_day": document.getElementById("endDateID").value
            });
            props.stopsHandler();
        } catch (err) {
            console.log(err.message);
        }
    };

    return(
        <div className={css.modalContainers}>
            <Modal show={true} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
              <div className={css.modalContainer} >
                <Modal.Header className={css.modalHeader}>
                    <Modal.Title>Let's add a stop!</Modal.Title>
                    <ImCross className={css.exitIcon} onClick={() => props.passSetAddModalShow(false)}/>
                </Modal.Header >
                <Modal.Body className={css.modalBody} >
                    <form>
                        <div className={css.inputGroupRow}>   
                            <div className={css.inputGroupCol}>   
                                <label> Name: </label> 
                                <input id="nameID" type="text" name="StopName" title="Give it a name." placeholder="The Lodge"/>
                            </div>   
                            <div className={css.inputGroupCol}>   
                                <label> Start Date: </label>
                                <input id="startDateID" type="date" name="DateStart"></input>
                            </div>   
                        </div>   
                        <div className={css.inputGroupRow}>  
                            <div className={css.inputGroupCol}>   
                                <label> Location: </label> 
                                <input id="locationID" type="text" name="StopLocation" title="Where on our journey are we?" placeholder="Interlaken, Switzerland"/>
                            </div>    
                            <div className={css.inputGroupCol}>   
                                <label> End Date: </label>
                                <input id="endDateID" type="date" name="DateEnd"></input>
                            </div>   
                        </div>
                    </form>
                </Modal.Body>
                  <Modal.Footer>
                    <button onClick={() => functionHandler()}>
                        Add Stop
                    </button>
                </Modal.Footer>
            </div>
            </Modal>
        </div>
    )
};

export default AddStopModal;
