//This page contains the user interface to interact and build an "Itinerary".
//This is shown visually with MapBox to display a "Map". 
//The map is based on itinerary UI which a user can add or remove "Stops". 
//Each "Stop" has a list of "Days", where each day can be filled with activities through an hour by hour itinerary.
//React Imports
import React, { useRef, useEffect, useState, useMemo, useContext } from 'react';
import css from './pagesCSS/editTrip.module.css';
import { useParams } from 'react-router';
//Component Imports
import NavbarMain from '../components/NavbarMain.js';
import StopCard from '../components/StopCard.js';
import DayItineraryPopUp from '../components/DayItineraryPopUp.js';
//DND-Kit Sortable library
import {DndContext, closestCenter,} from "@dnd-kit/core";
import {arrayMove, SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
//Map Box library 
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import Marker from 'mapbox-gl';
import AddStopModal from '../components/AddStopModal';
//API Imports
import StopFinder from '../apis/StopFinder.js';
import TripFinder from '../apis/TripFinder.js';
//Middleware Imports 
import { UserContext } from '../context/UserContext';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

export const EditTripPage = () => {
    const { tripid } = useParams();
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(0);
    const [lat, setLat] = useState(0);
    const [zoom, setZoom] = useState(0);
    const [destinations, setDestinations] = useState([]);
    const destinationIds = useMemo(() => destinations.map((item) => item.trip_name), [destinations]);
    const [modalAddShow, setAddModalShow] = useState(false);
    const [listStops, setListStops] = useState([]);
    const [stopsChanged, setStopsChanged] = useState(false);
    const [myTrip, setMyTrip] = useState("Test");
    const { user, setUser } = useContext(UserContext);
    const [newStop, setNewStop] = useState({});
    const [markersList, setMarkersList] = useState([]);
    const stopsHandler = (newStop) => {
        setStopsChanged(!stopsChanged);
        setNewStop(newStop);
    };

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
    }

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

    //Get current stops for chosen trip
    useEffect(() => {
        const getStops = async () => {
            try {
                const response = await StopFinder.get(`/${tripid}`, {
                    headers: { 
                        Authorization: `Bearer ${user.accessToken}` 
                    }
                });
                setListStops(response.data);
            } catch (err) {
                console.error(err.message);
            }
        };
        getStops();
    }, [stopsChanged]);

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


    useEffect(() => {
        //We need to clear all markers before reupdating them or else we will have cloned markers on top of each other
        markersList.map((marker) => { 
                marker.remove();
        })
        setMarkersList([]);
        const list = [];
        console.log("Liststops changed " + listStops)
        listStops.map((stops) => {
            if(map.current)
            {
                console.log("Create Marker for " + stops.stop_name + " in Edit Page")
                const marker = new mapboxgl.Marker({
                    scale: "1.5",
                    color: "red",
    
                })
                .setLngLat([stops.stop_long, stops.stop_lat])
                .addTo(map.current);
                list.push(marker);
                list.map((marker) => (
                    console.log(marker)
                ))
            }
        })
        setMarkersList(list);
        if(list.length > 1)
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
        else if(list.length === 1)
        {
            var singleMarker = new mapboxgl.LngLat(list[0]._lngLat.lng, list[0]._lngLat.lat);
            map.current.flyTo({
                center: singleMarker,
                zoom: 5
            })
        }
    }, [listStops]);

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
                                    {myTrip.trip_name}
                                </div>
                                <div className={css.destListContainer}>
                                    {/* <SortableContext items={destinationIds} strategy={verticalListSortingStrategy}> */}
                                    {listStops.length === 0 ? 
                                    <div className={css.noStopsContainer}> 
                                        <div> Every trip needs a start! Lets add a Stop to begin. </div>
                                        <div className={css.noStopsButtonContainer}> <button onClick={() => setAddModalShow(true)}>Add Stop</button> </div>
                                        {modalAddShow ? <AddStopModal passSetAddModalShow={setAddModalShow}  stopsHandler={stopsHandler} stopsCount={0} /> : ""}
                                    </div> : ""}
                                        {listStops.map((location) => (
                                            <StopCard key={location.stop_id} id={location.stop_name} dest={location} stopsHandler={stopsHandler} stopsCount={listStops.length} setNewStop={setNewStop} map={map} markersList={markersList} setMarkersList={setMarkersList}/>
                                        ))}
                                    {/* </SortableContext> */}
                                </div>
                            </div>
                            {/* </DndContext> */}
                            {/* {showModal ? <DayItineraryPopUp/> : ""} */}
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