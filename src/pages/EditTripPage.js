//This page contains the user interface to interact and build an "Itinerary".
//This is shown visually with MapBox to display a "Map". 
//The map is based on itinerary UI which a user can add or remove "Stops". 
//Each "Stop" has a list of "Days", where each day can be filled with activities through an hour by hour itinerary.
//React Imports
import React, { useRef, useEffect, useState, useMemo } from 'react';
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
import AddStopModal from '../components/AddStopModal';
//API Imports
import StopFinder from '../apis/StopFinder.js';
import TripFinder from '../apis/TripFinder.js';
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

export const EditTripPage = () => {
    const { tripid } = useParams();
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(-70.9);
    const [lat, setLat] = useState(42.35);
    const [zoom, setZoom] = useState(9);
    const [destinations, setDestinations] = useState([]);
    const destinationIds = useMemo(() => destinations.map((item) => item.trip_name), [destinations]);
    const [modalAddShow, setAddModalShow] = useState(false);
    const [listStops, setListStops] = useState([]);
    const [stopsChanged, setStopsChanged] = useState(false);
    const [myTrip, setMyTrip] = useState("Test");

    const stopsHandler = () => {
        setStopsChanged(!stopsChanged);
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

    useEffect(() => {
        const getStops = async () => {
            try {
                const response = await StopFinder.get(`/${tripid}`);
                setListStops(response.data);
            } catch (err) {
                console.error(err.message);
            }
        
        };
        getStops();
    }, [stopsChanged]);

    useEffect(() => {
        const getSingleTrip = async () => {
            try {
                const response = await TripFinder.get(`/myTrip/${tripid}`);
                setMyTrip(response.data[0]);
            } catch (err) {
                console.error(err.message);
            }
        };
        getSingleTrip();
    }, []);


    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://actstyles/mapbox/streets-v12',
            // style: 'mapbox://styles/mapbox/dark-v11how to create g',
            center: [lng, lat],
            zoom: zoom
        });
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    return (
        <div>
            {listStops ? <div>
            <NavbarMain></NavbarMain>
            <div className={css.background}>
                <div className={css.wrapper}>
                    <div className={css.leftDash}>
                        <div className={css.leftDashBody}>
                            {/* <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}> */}
                                <div className={css.destListContainer}>
                                    <div className={css.tripHeaderContainer}>
                                        {myTrip.trip_name}
                                    </div>
                                    {/* <SortableContext items={destinationIds} strategy={verticalListSortingStrategy}> */}
                                    {listStops.length === 0 ? 
                                    <div className={css.noStopsContainer}> 
                                        <div> Every trip needs a start! Lets add a Stop to begin. </div>
                                        <div className={css.noStopsButtonContainer}> <button onClick={() => setAddModalShow(true)}>Add Stop</button> </div>
                                        {modalAddShow ? <AddStopModal passSetAddModalShow={setAddModalShow}  stopsHandler={stopsHandler}/> : ""}
                                    </div> : ""}
                                        {listStops.map((location) => (
                                            <StopCard key={location.stop_id} id={location.stop_name} dest={location} stopsHandler={stopsHandler}/>
                                        ))}
                                    {/* </SortableContext> */}
                                </div>
                            {/* </DndContext> */}
                            {/* {showModal ? <DayItineraryPopUp/> : ""} */}
                        </div>
                    </div>
                    <div className={css.rightDash}>
                        <div className={css.rightDashBody}>
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













// import React, { useRef, useEffect, useState, useMemo } from 'react';
// import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
// import css from './pagesCSS/editTrip.module.css';

// import NavbarMain from '../components/NavbarMain.js';
// import DestinationCard from '../components/DestinationCard.js';

// import {DndContext, closestCenter,} from "@dnd-kit/core";
// import {arrayMove, SortableContext, verticalListSortingStrategy} from '@dnd-kit/sortable';
// mapboxgl.accessToken = 'pk.eyJ1IjoidHJhamFuLXAiLCJhIjoiY2xibHFqdzE4MGEyYjNwcWdoZmN4anJ3MiJ9.wkUpzvYIa_0bbjBGrsaBNA';

// export const EditTrip = () => {

//     const mapContainer = useRef(null);
//     const map = useRef(null);
//     const [lng, setLng] = useState(-70.9);
//     const [lat, setLat] = useState(42.35);
//     const [zoom, setZoom] = useState(9);
//     const [destinations, setDestinations] = useState([
//         {
//             id: "0",
//             trip_name: "Toulouse",
//             letter: "A"
//         },
//         {
//             id: "1",
//             trip_name: "London",
//             letter: "B"
//         },
//         {
//             id: "2",
//             trip_name: "Amsterdam",
//             letter: "C"
//         }
//     ]);
//     const destinationIds = useMemo(() => destinations.map((item) => item.id), [destinations]);

//     // const [destinations, setDestinations] = useState([ "Toulouse", "Amsterdamn", "London"
//     // ]);

//     // const handleDragEnd = (event) => {
//         function handleDragEnd(event) {
//         console.log("Drag end called")
//         const {active, over} = event;
//         console.log("ACTIVE " + active.id);
//         console.log("OVER " + over.id);

//         if(active.id !== over.id)
//         {
//             setDestinations((items) => {
//                 // const activeIndex = items.indexOf(active.id);
//                 // const overIndex = items.indexOf(over.id);
//                 const activeIndex = items.map(item => item.trip_name).indexOf(active.id);
//                 const overIndex = items.map(item => item.trip_name).indexOf(over.id);
//                 console.log(activeIndex)
//                 console.log(overIndex);
//                 //const array = [...destinations];
//                 // console.log(array[overIndex])
//                 // console.log(destinations[activeIndex])
//                 // array[overIndex] = destinations[activeIndex];
//                 // console.log(array);
//                 // console.log(arrayMoveImmutable(items, activeIndex, overIndex));
//                 // return arrayMoveImmutable(items, activeIndex, overIndex); //Helper function which shuffles array
//                 return arrayMove(items, activeIndex, overIndex);
//             })
//         }
//     };


//     useEffect(() => {
//         if (map.current) return; // initialize map only once
//         map.current = new mapboxgl.Map({
//             container: mapContainer.current,
//             style: 'mapbox://actstyles/mapbox/streets-v12',
//             // style: 'mapbox://styles/mapbox/dark-v11how to create g',
//             center: [lng, lat],
//             zoom: zoom
//         });
//         map.current.on('move', () => {
//             setLng(map.current.getCenter().lng.toFixed(4));
//             setLat(map.current.getCenter().lat.toFixed(4));
//             setZoom(map.current.getZoom().toFixed(2));
//         });
//     });

//     return (
//         <div>
//             <NavbarMain></NavbarMain>
//             <div className={css.background}>
//                 <div className={css.wrapper}>
//                     <div className={css.leftDash}>
//                         <div className={css.leftDashBody}>
//                             <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
//                                 <div className={css.destListContainer}>
//                                     <SortableContext items={destinationIds} strategy={verticalListSortingStrategy}>
//                                         {destinations.map((location) => (
//                                             <DestinationCard key={location.id} id={location.trip_name}/>
//                                         ))}
//                                     </SortableContext>
//                                 </div>
//                             </DndContext>
//                         </div>
//                     </div>
//                     <div className={css.rightDash}>
//                         <div className={css.rightDashBody}>
//                             <div className={css.mapBar}>
//                                 Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
//                             </div>
//                             <div ref={mapContainer} className={css.mapContainer}/>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// };

// export default EditTrip;