//This component renders the modal to Add a "Stop" in a user's itinerary locally. User is asked to fill in basic "Stop" info.
//React Imports
import React, { useState } from 'react';
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

export const AddStopModal = (props) => {
     
    const { tripid } = useParams();
    const [locationValue, setLocationValue] = useState("");
    const [name, setName] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const functionHandler = () => {
        props.passSetAddModalShow(false);
        GetLatlong();
    };

    //We pass the new Stop back to the Parent component in EditTripPage
    const postStop = async (long, lat, address) => {
            props.stopsHandler({
                trip_id: tripid,
                stop_name: name,
                stop_location: address,
                stop_order: (props.stopIndex+1),
                stop_first_day: startDate,
                stop_last_day: endDate,
                stop_long: long,
                stop_lat: lat,
                stop_is_new: true
            }, props.stopIndex+1, "Add");
    };

    //Get coordinates for the user's chosen location using Google Places API
    const GetLatlong = () => {
            // var geocoder = new window.google.maps.Geocoder();
            var address = document.getElementById("locationID").value
            // geocoder.geocode({
            // 'address': address
            // }, function(results, status) {
        
            // if (status == window.google.maps.GeocoderStatus.OK) {
            //     var latitude = results[0].geometry.location.lat();
            //     var longitude = results[0].geometry.location.lng();
            //     // postStop(longitude, latitude, address);
            // }
            // });
            postStop(0, 0, address);
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
                    {props.stopOrder}
                </Modal.Footer>
            </div>
            </Modal>
        </div>
    )
};

export default AddStopModal;
