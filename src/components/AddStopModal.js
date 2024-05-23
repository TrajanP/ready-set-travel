//This component renders the modal to Add a "Stop" in a user's itinerary. User is asked to fill in basic "Stop" info.
//React Imports
import React, { useState, useContext, useEffect } from 'react';
//React-Bootstrap Imports
import Modal from 'react-bootstrap/Modal';
//Component Imports
import AutoComplete from '../components/AutoComplete';
//CSS Import
import css from '../components/componentsCSS/modalStop.module.css';
//React-Icons Import
import { ImCross } from "react-icons/im";
//React-Router Imports
import { useParams } from 'react-router-dom';
//API Imports
import StopFinder from '../apis/StopFinder.js';
//Middleware Imports
import { UserContext } from '../context/UserContext';

export const AddStopModal = (props) => {
     
    const { tripid } = useParams();
    const [fullscreen, setFullscreen] = useState(true);
    const { user, setUser } = useContext(UserContext);
    const [locationValue, setLocationValue] = useState("");
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const functionHandler = () => {
        props.passSetAddModalShow(false);
        GetLatlong()
    };

    const postStop = async (long, lat, address) => {
        try {
            const response = await StopFinder.post("/", { 
                "trip_id": tripid,
                "stop_name": name,
                "stop_location": address,
                "stop_order": (props.stopsCount+1),
                "stop_first_day": startDate,
                "stop_last_day": endDate,
                "stop_long": long,
                "stop_lat": lat
            }, {
                headers: { 
                    "Authorization": `Bearer ${user.accessToken}`
                }
            });

            props.stopsHandler({
                trip_id: tripid,
                stop_name: name,
                stop_location: address,
                stop_order: (props.stipsCount+1),
                stop_first_day: startDate,
                stop_last_day: endDate,
                stop_long: long,
                stop_lat: lat
            });
        } catch (err) {
            console.log(err.message);
        }
    };

    const GetLatlong =() => {
            var geocoder = new window.google.maps.Geocoder();
            var address = document.getElementById("locationID").value
            geocoder.geocode({
            'address': address
            }, function(results, status) {
        
            if (status == window.google.maps.GeocoderStatus.OK) {
                var latitude = results[0].geometry.location.lat();
                var longitude = results[0].geometry.location.lng();
                postStop(longitude, latitude, address);
            }
            });
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
                                <input id="nameID" type="text" name="StopName" title="Give it a name." placeholder="Enter a name" onChange={(e) => setName(e.target.value)}/>
                            </div>   
                            <div className={css.inputGroupCol}>   
                                <label> Start Date: </label>
                                <input id="startDateID" type="date" name="DateStart" onChange={(e) => setStartDate(e.target.value)}></input>
                            </div>   
                        </div>   
                        <div className={css.inputGroupRow}>  
                            <div className={css.inputGroupCol}>   
                                <label> Location: </label> 
                                <AutoComplete passLocationValue={setLocationValue}></AutoComplete>
                                {/* <input id="locationID" type="text" name="StopLocation" title="Where on our journey are we?" placeholder="Interlaken, Switzerland"/> */}
                            </div>    
                            <div className={css.inputGroupCol}>   
                                <label> End Date: </label>
                                <input id="endDateID" type="date" name="DateEnd" onChange={(e) => setEndDate(e.target.value)}></input>
                            </div>   
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer className={css.modalFooter}>
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
