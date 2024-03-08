//This component renders the modal to Remove a "Stop" in a user's itinerary.
//React Imports
import React, {useState} from 'react';
//React Router Imports
import { useParams } from 'react-router-dom';
//CSS Import
import css from './componentsCSS/modalStop.module.css';
//React-Icons Import
import { ImCross } from "react-icons/im";
//React-Bootstrap Imports 
import Modal from 'react-bootstrap/Modal';
import StopFinder from '../apis/StopFinder';

export const RemoveStopModal = (props) => {

    const { tripid } = useParams();

    const functionHandler = (stopID) => {
        props.passSetRemoveModalShow(false);
        deleteStop(stopID);
    };

    const deleteStop = async (stopID) => {
               try {
            const response = await StopFinder.delete(`delete/${stopID}`);
            console.log(`Stop ${stopID} has been deleted.`);
            props.stopsHandler();
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
                        <h2>Are you sure you want to remove the {props.stop.stop_name} Stop from your itinerary?</h2>
                    </div>     
                </Modal.Body>
                  <Modal.Footer>
                    <div>
                        <button onClick={() => functionHandler(props.stop.stop_id)}>Yes</button> <button onClick={() => props.passSetRemoveModalShow(false)}>No</button>
                    </div>
                </Modal.Footer>
             </div>
            </Modal>
        </div>
    )
};

export default RemoveStopModal; 