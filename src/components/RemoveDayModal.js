//This component renders the modal to Remove a "Day" in a user's itinerary.
//React Imports
import React, { useContext } from 'react';
//CSS Import
import css from './componentsCSS/modalStop.module.css';
//React-Icons Import
import { ImCross } from "react-icons/im";
//React-Bootstrap Imports 
import Modal from 'react-bootstrap/Modal';
import StopFinder from '../apis/StopFinder';
//API Import
import DayFinder from '../apis/DayFinder.js';
//Middleware
import { UserContext } from '../context/UserContext';

export const RemoveDayModal = (props) => {

    const { user, setUser } = useContext(UserContext);

    //Handles the event of removing a Day and closing the "Remove" menu
    const functionHandler = (dayID) => {
        props.passSetRemoveModalShow(false);
        deleteDay(dayID);
    };

    //Delete a day from a User's Trip's Stop
    const deleteDay = async (dayID) => {
        try {
            const response = await DayFinder.delete(`delete/${dayID}`, { 
                headers: { 
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            console.log(`Day ${dayID} has been deleted.`);
            props.daysHandler();
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <div className={css.modalContainer}>
            <Modal show={true} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
              <div className={css.modalContainer} >
                <Modal.Header className={css.modalHeader}>
                    <Modal.Title>Maybe next time!</Modal.Title>
                    <ImCross className={css.exitIcon} onMouseDown={() => props.passSetRemoveModalShow(false)}/>
                </Modal.Header >
                <Modal.Body className={css.modalBody}>
                    <div style={{padding:"20px"}}>
                        <h2>Are you sure you want to remove {props.day.day_name} from your stop?</h2>
                    </div>     
                </Modal.Body>
                  <Modal.Footer className={css.modalFooter}>
                    <div>
                        <button onClick={() => functionHandler(props.day.day_id)}>Yes</button> <button onClick={() => props.passSetRemoveModalShow(false)}>No</button>
                    </div>
                </Modal.Footer>
             </div>
            </Modal>
        </div>
    )
};

export default RemoveDayModal; 