//This component renders the modal to Remove a "Stop" in a user's itinerary.
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
import StopFinder from '../apis/StopFinder';
//Middleware 
import { UserContext } from '../context/UserContext';

//Mapbox Library Import
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

export const RemoveStopModal = (props) => {

    const { tripid } = useParams();
    const { user, setUser } = useContext(UserContext);

    const functionHandler = (stopID) => {
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

    //Remove a Stop from a user's trip
    const deleteStop = async (stopID) => {
               try {
            const response = await StopFinder.delete(`delete/${stopID}`, { 
                headers: {
                     Authorization: `Bearer ${user.accessToken}`
                    }
                });
            console.log(`Stop ${stopID} has been deleted.`);
            props.stopsHandler();
            props.markersList.map((marker) => { 
                if (marker._lngLat.lat === props.stop.stop_lat)
                {
                    // console.log(`Found Marker for ${props.stop.stop_name} + to delete`);
                    marker.remove(); 
                }
            })
            // props.markersList.map((mark) => (console.log("Old Marker: " + mark._lngLat)));
            var updatedMarkers = props.markersList.filter(filterByMarker);
            props.setMarkersList(updatedMarkers);
            console.log("FILTERED")
            // updatedMarkers.map((mark) => (console.log("Old Marker: " + mark._lngLat)))
            
            // if(updatedMarkers.length > 0)
            // {
            //     var coordinates = updatedMarkers.map(coord => new mapboxgl.LngLat(coord._lngLat.lng, coord._lngLat.lat));
            //     var bounds = coordinates.reduce(function(bounds, coord) {
            //         return bounds.extend(coord);
            //     }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));
            //     // props.map.current.fitBounds(bounds, {
            //     //     padding: 10
            //     // });
            //     console.log("SW: " + bounds._sw + " " + "NE: " + bounds._ne)
            //     console.log("Bounds are ", bounds.toArray());
            // }

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