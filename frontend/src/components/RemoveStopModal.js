//This component renders the modal to Remove a "Stop" in a user's itinerary. 
//A user removes a stop, but this is only saved locally
//A user must save the changes in the Parent Component to make changes in DB
//React Imports
import React, { useState, useContext } from 'react';
//React Router Imports
import { useParams } from 'react-router-dom';
//CSS Import
import css from './componentsCSS/modalStop.module.css';
//React-Icons Import
import { ImCross } from "react-icons/im";
//React-Bootstrap Imports 
import Modal from 'react-bootstrap/Modal';

export const RemoveStopModal = (props) => {

    const functionHandler = (stopID) => {
        // console.log("StopID is " + stopID)
        props.passSetRemoveModalShow(false);
        deleteStop(stopID);
    };

    const filterByMarker = (marker) => {
        if (marker._lngLat.lat === props.stop.stop_lat)
        {
            // console.log(props.stop.stop_name + "Marker has been removed.");
            return false;
        }
        return true;
    }

    //Remove a Stop from a user's trip locally
    const deleteStop = async (stopID) => {
            // console.log(`Stop ${stopID} has been deleted.`);
            props.stopsHandler(props.stop, props.stopIndex, "Remove");
            props.markersList.map((marker) => { 
                if (marker._lngLat.lat === props.stop.stop_lat)
                {
                    // console.log(`Found Marker for ${props.stop.stop_name} + to delete`);
                    marker.remove(); 
                }
            });
            var updatedMarkers = props.markersList.filter(filterByMarker);
            props.setMarkersList(updatedMarkers);
            // updatedMarkers.map((mark) => (console.log("Old Marker: " + mark._lngLat)))
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
                  <Modal.Footer className={css.modalFooter}>
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