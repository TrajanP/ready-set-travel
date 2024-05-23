//Dashboard page allows user to view and delete their trips.

//Component Imports
import NavbarMain from '../components/NavbarMain';
import TripTile from '../components/TripTile';
import DefaultTile from '../components/DefaultTile';
import TileOverview from '../components/TileOverview';
import Filter from '../components/Filter';
import Sort from '../components/Sort';
//Library Imports
import React, { useRef, useEffect, useState, useContext } from 'react';
import { FaSearch, FaChevronCircleDown} from 'react-icons/fa';
//CSS Imports
import css from './pagesCSS/dashboard.module.css';
//API Imports
import TripFinder from '../apis/TripFinder';
//Middleware Imports
import { UserContext } from '../context/UserContext';

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
    const { user, setUser } = useContext(UserContext);
    
    const handleClose = () => {
        setShow(!show);
    };

    const getUserTrips = async () => {
        try {
            // console.log("Dashboard getting trips")
            const response = await TripFinder.get(`/mytrips/${user.userID}`, { 
                headers: { 
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            setListTrips(response.data);
            // console.log(response.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    const deleteTrip = async (tripID) => {
        try {
            const response = await TripFinder.delete(`/${tripID}`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            setListTrips(listTrips.filter(trip => {
                return trip.trip_id !== tripID;
            }));
            setShowInfo(false);
            alert(`Trip ${tripID} has been deleted.`)
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getUserTrips();
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