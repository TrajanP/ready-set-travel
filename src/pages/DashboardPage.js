//Dashboard page allows user to view and delete their Trip Itineraries.

//Component Imports
import NavbarMain from '../components/NavbarMain';
import TripTile from '../components/TripTile';
import DefaultTile from '../components/DefaultTile';
import TileOverview from '../components/TileOverview';
import Filter from '../components/Filter';
import Sort from '../components/Sort';
//Library Imports
import React, { useRef, useEffect, useState } from 'react';
import { FaSearch, FaChevronCircleDown} from 'react-icons/fa';
//CSS Imports
import css from './pagesCSS/dashboard.module.css';
//API Imports
import TripFinder from '../apis/TripFinder';

    const tile_data = [
        {
            "name": "Europe Trip",
            "start_date" :"5/14/2023",
            "end_date" :"6/12/2023",
            "trip_id" : 1,
            "origin" : "Interlaken, Switzerland",
            "return" : "Amsterdam, Netherlands",
        },
        {
            "name":"Southern France", 
            "start_date" :"5/14/2023",
            "end_date" :"6/12/2023",
            "trip_id" : 2,
            "origin" : "London, England",
            "return" : "Cannes, France",
        },
        {
            "name": "NYC Roadtrip",
            "start_date" :"5/14/2023",
            "end_date" :"6/12/2023",
            "trip_id" : 3,
            "origin" : "Nashville, TN",
            "return" : "New York City, NY",
        },
        {
            "name": "Florida Beach Trip",
            "start_date" :"5/14/2023",
            "end_date" :"6/12/2023",
            "trip_id" : 4,
            "origin" : "Nashville, TN",
            "return" : "Orlando, FL",
        },
        {
            "name": "Rocky Mountain's Roadtrip",
            "start_date" :"5/14/2023",
            "end_date" :"6/12/2023",
            "trip_id" : 5,
            "origin" : "Nashville, TN",
            "return" : "Boulder, Colorado",
        },
        {
            "name": "Sweden & Norway",
            "start_date" :"5/14/2023",
            "end_date" :"6/12/2023",
            "trip_id" : 6,
            "origin" : "Oslo, Sweden",
            "return" : "Balto, Norway",
        }
    ];

    const filter_options = [
        {
            "label": "International",
            "option": "1"
        },
        {
            "label": "Domestic",
            "option": "2"
        },
        {
            "label": "Roadtrip",
            "option": "3"
        },
        {
            "label": "Backpacking",
            "option": "4"
        },
        {
            "label": "Business",
            "option": "5"
        },
        {
            "label": "Pleasure",
            "option": "6"
        }
    ]

    const sort_options = [
        {
            "label": "Soonest",
            "option": "1",
        },
        {
            "label": "Furthest",
            "option": "2",
        }
    ]

export const DashboardPage = () => {

    const [showInfo, setShowInfo] = useState(false);
    const [tileID, setTileID] = useState(0);
    const [currObject, setCurrObject] = useState({});
    const [show, setShow] = useState(false);
    const [listTrips, setListTrips] = useState([]);

    const handleClose = () => {
        setShow(!show);
    }

    const getTrips = async () => {
        try {
            const response = await TripFinder.get("/");
            setListTrips(response.data);
        } catch (err) {
            console.error(err.message);
        }
    }

    const deleteTrip = async (tripID) => {
        try {
            const response = await TripFinder.delete(`/${tripID}`)
            setListTrips(listTrips.filter(trip => {
                return trip.trip_id !== tripID;
            }));
            alert(`Trip ${tripID} has been deleted.`)
        } catch (err) {
            console.error(err.message);
        }
    }

    useEffect(() => {
        getTrips();
    }, []);

    return (
        <div>
            <NavbarMain ></NavbarMain>
            <div className={css.background}>
                <div className={css.wrapper}>
                    <div className={css.leftDash}>
                        <div className={css.leftDashBody}> 
                        <div className={css.filterHeader}>
                            <div style={{fontSize:"45px"}}>
                                <h2>My Trips</h2>
                            </div>
                            <Filter filterLabel="Filter By" options={filter_options}></Filter>
                            <Sort sortLabel="Sort By" options={sort_options} passSortByData={setListTrips} passedData={listTrips}></Sort>
                           <div className={css.searchBar}>
                               <FaSearch size="25px" style={{marginRight: "5px", marginLeft:"5px", marginTop: "15px", marginBottom: "0px"}}/>
                               <form> 
                                   <input placeholder="Search Trips" type="search" id="searchID" />
                               </form>
                           </div>
                        </div>
                            <div>
                                {listTrips.map((tile) => ( 
                                        <TripTile key={tile.trip_id} tile={tile} className={css.image} passShowInfo={setShowInfo} passTileID={setTileID} passTile={setCurrObject}/>
                                    ))}
                            </div>        
                        </div>
                    </div>
                    <div className={css.rightDash}>
                        <div className={css.rightDashBody}>
                            
                            {showInfo ? <TileOverview passDeleteHandler={deleteTrip} value={currObject}/> : <DefaultTile/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;