//This page contains the user interface to interact and build an "Itinerary".
//This is shown visually with MapBox to display a "Map". 
//The map is based on itinerary UI which a user can add or remove "Stops". 
//On render, the user gets an up to date view of their trip from the DB
//A user can make changes locally with this data, but the DB will only 
//get updated with this data once a user has "Saved" the changes.
//Each "Stop" has a list of "Days", where each day can be filled with activities through an hour by hour itinerary. - (Days implementation has been put on hold)
//React Imports
import React, { useRef, useEffect, useState, useMemo, useContext } from 'react';
import css from './pagesCSS/editTrip.module.css';
import { useParams } from 'react-router';
//Component Imports
import NavbarMain from '../components/NavbarMain.js';
import StopCard from '../components/StopCard.js';
import AddStopModal from '../components/AddStopModal';
import DayItineraryPopUp from '../components/DayItineraryPopUp.js';
//DND-Kit Sortable library - (Not Currently in use)
import {DndContext, closestCenter,} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
//Map Box library 
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
//API Imports
import StopFinder from '../apis/StopFinder.js';
import TripFinder from '../apis/TripFinder.js';
//Middleware Imports 
import { UserContext } from '../context/UserContext';
//React Icons Imports
import { BiSave } from "react-icons/bi";
import { RxReset } from "react-icons/rx";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

export const EditTripPage = () => {

    const { tripid } = useParams(); //Get selected trip's ID

    //Map State
    const [lng, setLng] = useState(0);
    const [lat, setLat] = useState(0);
    const [zoom, setZoom] = useState(0);
    const [markersList, setMarkersList] = useState([]); //Current active markers on the map for each stop
    const mapContainer = useRef(null);
    const map = useRef(null);

    //Stops State Management
    const [listStops, setListStops] = useState([]); //Current list of Stops based on user's local view
    const [deletedStops, setDeletedStops] = useState([]); //Current list of stops user has deleted locally, but we haven't submitted yet
    const [originalStops, setOriginalStops] = useState([]); //Store the last current state of a Trip's Stops based on the database version, before a user has submitted new changes
    const [newStop, setNewStop] = useState({}); //Used to pass back New Stop from child component

    const [modalAddShow, setAddModalShow] = useState(false); //Show option for user to add initial stop, if no current stops
    const [myTrip, setMyTrip] = useState("Test"); //Stores retrieved Trip data
    const { user, setUser } = useContext(UserContext); //User info
    const [isSaved, setIsSaved] = useState(true); //Bool to display if a user's local changes have been saved

    //Click and Drag Implementation State - (Not Currently implemented)
    // const [destinations, setDestinations] = useState([]); 
    // const destinationIds = useMemo(() => destinations.map((item) => item.trip_name), [destinations]);

    //Code to warn user from leaving page with unsaved work
    // useEffect(() => {
    //     window.addEventListener('beforeunload', alertUser)
    //     return () => {
    //       window.removeEventListener('beforeunload', alertUser)
    //     }
    //   }, []);
      
    //   const alertUser = e => {
    //     e.preventDefault()
    //     e.returnValue = ''
    //   }
    
    //----------------------------Stop Handler Functions------------------------//

    //Called when user Adds or Removes a stop
    //We need to update local display of stops
    const stopsHandler = (newStop, base, action) => {
        const updatedArray = [...listStops];
        if(action === "Add")
        {
            // console.log("We add " + newStop);
            updatedArray.splice(base, 0, newStop);
        }
        else if(action === "Remove")
        {   
            // console.log("Delete Stop!");
            const newList = [...deletedStops];
            newList.push(newStop); 
            setDeletedStops(newList); //Recording stops we need to delete later
            updatedArray.splice(base, 1);
        }
        setListStops([...updatedArray]); //Update local list
        setIsSaved(false); //Database version is now out of sync with local
    };

    //Deletes any stops the user has removed locally
    const DeleteStop = async (stopID) => {
        try {
            const response = await StopFinder.delete(`delete/${stopID}`, { 
                headers: {
                     Authorization: `Bearer ${user.accessToken}`
                    }
                });
        } catch (err) {
            console.error(err.message);
        }
    };

    //Updates each stop for a Trip in order to maintain order
    //A stop may not have been changed, but other CRUD ops will change the itinerary order
    //so we need to reshuffle
    const UpdateStop = async (stopID, stopOrder) => {
        try {
            const response = await StopFinder.patch(`/update/order`, { 
                    "stop_id": stopID,
                    "stop_order": stopOrder,
            }, {
                headers: {
                     Authorization: `Bearer ${user.accessToken}`
                }
            });
        } catch (err) {
            console.error(err.message);
        }
    };

    //User has added a new stop locally, so we need to add the stop to DB
    const AddStop = async (stop, stopOrder) => {
        try {
            const response = await StopFinder.post("/", { 
                "trip_id": tripid,
                "stop_name": stop.stop_name,
                "stop_location": stop.stop_location,
                "stop_order": stopOrder,
                "stop_first_day": stop.stop_first_day,
                "stop_last_day": stop.stop_last_day,
                "stop_long": stop.stop_long,
                "stop_lat": stop.stop_lat
            }, {
                headers: { 
                    "Authorization": `Bearer ${user.accessToken}`
                }
            });
        } catch (err) {
            console.error(err.message);
        }
    };

    //User has submitted call to save Trip: Update Database with local changes to the Trip
    const SaveTrip = () => {
        deletedStops.map((stop) => { //Check do we have any locally deleted stops to apply to the DB?
            DeleteStop(stop.stop_id);
        });
        listStops.map((stop, index) => { //Iterate thru all local stops, either Update or Add the stop to DB
            // console.log("Stop is " + stop.stop_name)
            if (Object.hasOwn(stop, 'stop_is_new')) //The `stop_is_new` attribute is only present with locally added stops, so add stop in DB
            {   
                // console.log("Add Stop")
                AddStop(stop, index); 
                delete stop.stop_is_new; //Remove the attribute to avoid the stop being readded on next save
            }
            else //Stop already exists, so just update in DB
            {
                // console.log("Update Stop")
                UpdateStop(stop.stop_id, index);
            }
        });
        setOriginalStops(listStops);
        setIsSaved(true);
    };

    //Get current stops for chosen trip on initial render
    useEffect(() => {
        const getStops = async () => {
            try {
                const response = await StopFinder.get(`/${tripid}`, {
                    headers: { 
                        Authorization: `Bearer ${user.accessToken}` 
                    }
                });
                setListStops(response.data); //Setting up list of Stops which can be manipulated by the user
                setOriginalStops(response.data); //Stored original data from DB
            } catch (err) {
                console.error(err.message);
            }
        };
        getStops();
    }, []);

    //Grabs trip name based on the passed trip ID
    useEffect(() => {
        const getSingleTrip = async () => {
            try {
                const response = await TripFinder.get(`/myTrip/${tripid}`, {
                    headers: { 
                        Authorization: `Bearer ${user.accessToken}` 
                    }
                });
                setMyTrip(response.data[0]);
            } catch (err) {
                console.error(err.message);
            }
        };
        getSingleTrip();
    }, []);

    //--------------------MAP Handling Functions-------------------//

    //Render Map-Box Map
    useEffect(() => {
        if (map.current) return;
        if (listStops.length > 0)
        {
            setLat(listStops[0].stop_lat)
            setLng(listStops[0].stop_long)
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://actstyles/mapbox/streets-v12',
                // style: 'mapbox://styles/mapbox/dark-v11how to create g',
                center: [listStops[0].stop_long, listStops[0].stop_lat],
                zoom: zoom
            });

            map.current.on('move', () => { 
                setLng(map.current.getCenter().lng.toFixed(4));
                setLat(map.current.getCenter().lat.toFixed(4));
                setZoom(map.current.getZoom().toFixed(2));
            });
        }
    });

    //Reorientate the map based on removing or adding markers
    const ZoomFit = () => {
        if(markersList.length > 1)
        {
            var coordinates = markersList.map(coord => new mapboxgl.LngLat(coord._lngLat.lng, coord._lngLat.lat));
            var bounds = coordinates.reduce(function(bounds, coord) {
                return bounds.extend(coord);
                }, new mapboxgl.LngLatBounds(coordinates[0]._lngLat, coordinates[0]._lngLat));

            map.current.fitBounds(bounds, {
            padding: 200,
            });
        }
        else if(markersList.length === 1)
        {
            var singleMarker = new mapboxgl.LngLat(markersList[0]._lngLat.lng, markersList[0]._lngLat.lat);
            map.current.flyTo({
                center: singleMarker,
                zoom: 5
            })
        }
    };

    //Every time our list of stops is updated, we need to update our markers on the map
    useEffect(() => {
        //We need to clear all markers before reupdating them or else we will have cloned markers on top of each other
        markersList.map((marker) => { 
                marker.remove();
        })
        //console.log("Liststops changed " + listStops)
        setMarkersList([]);
        const list = [];
        listStops.map((stops) => {
            if(map.current) //Is map rendered?
            {
                //console.log("Create Marker for " + stops.stop_name + " in Edit Page")
                const marker = new mapboxgl.Marker({
                    scale: "1.5",
                    color: "red",
                })
                .setLngLat([stops.stop_long, stops.stop_lat])
                .addTo(map.current);
                list.push(marker);
            }
        });
        setMarkersList(list);
        if(list.length > 1) //We need to get most outer bound markers and update zoom bounds
        {
            var coordinates = list.map(coord => new mapboxgl.LngLat(coord._lngLat.lng, coord._lngLat.lat));
            var bounds = coordinates.reduce(function(bounds, coord) {
                return bounds.extend(coord);
                }, new mapboxgl.LngLatBounds(coordinates[0]._lngLat, coordinates[0]._lngLat));

            map.current.fitBounds(bounds, {
            padding: 200,
            });
            // console.log("Bounds are ", bounds.toArray());
        }
        else if(list.length === 1) //Case when we only have one marker, avoid fitbounds as this will break
        {
            var singleMarker = new mapboxgl.LngLat(list[0]._lngLat.lng, list[0]._lngLat.lat);
            map.current.flyTo({
                center: singleMarker,
                zoom: 5
            });
        }
    }, [listStops]);


    //-------------------DAY Itinerary State Handler - (Not currently implemented) -------------------------//
    // const handleShowDayItinerary = () => 
    // {
    //     setShowModal(!showModal);
    // }
    //     function handleDragEnd(event) {
    //     const {active, over} = event;

    //     if(active.id !== over.id)
    //     {
    //         setDestinations((items) => {
    //             const activeIndex = items.map(item => item.trip_name).indexOf(active.id);
    //             const overIndex = items.map(item => item.trip_name).indexOf(over.id);
    //             return arrayMove(items, activeIndex, overIndex);
    //         })
    //     }
    // };

    // let menuRef = useRef();
    // // let menuRef2 = useRef();
    // useEffect(() => {
    //     let clickHandler = (e) => {
    //         console.log("Target is " + e.target)
    //         console.log("menuRef is " + menuRef.current)
    //         if(!menuRef.current?.contains(e.target) ){//|| !menuRef.current.contains(e.target)){
    //             console.log(menuRef.current);
    //             setShowModal(false);
    //         }
    //     };
    //     document.addEventListener("mousedown", clickHandler);
    // });

    //Work in progress code for off click, closes modal
    // let menuRef2 = useRef();
    // let menuRef = useRef();
    // var container = document.getElementsByClassName('popUpContainer');
    // var container2 = document.getElementsByClassName('container');
    // useEffect(() => {
    //     document.addEventListener("mousedown", (event) => {
    //         // if(!menuRef.current.contains(event.target)) {
    //             if(container2 !== event.target && !container2.current.contains(event.target)) {
    //             setShowModal(false);
    //         }
    //     });
    // });

    return (
        <div>
            {listStops ? <div>
            <NavbarMain></NavbarMain>
            <div className={css.background}>
                <div className={css.wrapper}>
                    <div className={css.leftDash}>
                        <div className={css.leftDashBody}>
                            {/* <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}> */}
                            <div className={css.leftDashBodyContainer}>
                                <div className={css.tripHeaderContainer}>
                                    {myTrip.trip_name} <div className={css.isSavedContainer}> <div style={{display:"flex", justifyContent:"center"}}> {isSaved ? <FaCheck style={{scale:".7", color:"#177843"}}/> : <ImCross style={{scale:".6", color:"#B25E4C"}}/>} <BiSave/> </div> </div>
                                </div>
                                <div className={css.destListContainer}>
                                    {/* <SortableContext items={destinationIds} strategy={verticalListSortingStrategy}> */}
                                    {listStops.length === 0 ? 
                                    <div className={css.noStopsContainer}> 
                                        <div> Every trip needs a start! Lets add a Stop to begin. </div>
                                        <div className={css.noStopsButtonContainer}> <button onClick={() => setAddModalShow(true)}>Add Stop</button> </div>
                                        {modalAddShow ? <AddStopModal passSetAddModalShow={setAddModalShow}  stopsHandler={stopsHandler} stopsCount={0} /> : ""}
                                    </div> : ""}
                                        {listStops.map((location, index) => (
                                            <StopCard key={location.stop_id} id={location.stop_name} dest={location} stopsHandler={stopsHandler} stopsCount={listStops.length} stopIndex={index} setNewStop={setNewStop} map={map} markersList={markersList} setMarkersList={setMarkersList}/>
                                        ))}
                                    {/* </SortableContext> */}
                                </div>
                            </div>
                            {/* </DndContext> */}
                            {/* {showModal ? <DayItineraryPopUp/> : ""} */}
                        </div>
                        <div className={css.tripFooterContainer}>
                            <button className={css.tripFooterButton} onClick={() => { setListStops(originalStops); setIsSaved(true)}}> <div style={{display:"flex"}}> Reset <RxReset style={{margin:"10px"}}/></div> </button> 
                            <button className={css.tripFooterButton} onClick={() => SaveTrip()}> <div style={{display:"flex"}}> Save <BiSave style={{margin:"10px"}}/> </div> </button>
                        </div>
                    </div>
                    <div className={css.rightDash}>
                        <div className={css.rightDashBody}>
                            <button className={css.mapButton} onClick={()=>ZoomFit()}>Zoom Fit</button>
                            <div className={css.mapBar}>
                                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
                            </div>
                            <div ref={mapContainer} className={css.mapContainer}/>
                        </div>
                    </div>
                </div>
            </div>
            </div> : ""}
        </div>
    )
};

export default EditTripPage;