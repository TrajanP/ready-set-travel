//Component is used to display the second page of the new trip form.
//As this is the last page, it also sends the form data to the database with a Post. 

//Library Imports
import {React, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
//Middleware Imports
import { UserContext } from '../context/UserContext';
//API Imports
import TripFinder from '../apis/TripFinder.js'
//CSS Import
import css from './componentsCSS/newTripForm.module.css';

export const NewTrip2 = ({ trip }) => {
    
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    // const [listTrips, setListTrips] = useState([]);

    //Enter User's new Trip in database
    const postTrip = async () => {
        const dateCreated = new Date();
        try {
            const response = await TripFinder.post("/", {
                "trip_name": trip.name,
                "trip_user_id": user.userID,
                "trip_description": trip.description,
                "trip_type": document.getElementById("purposeID").value, 
                "trip_start_date": document.getElementById("startDateID").value,
                "trip_end_date": document.getElementById("endDateID").value,
                "trip_created_date": dateCreated
            }, {
                headers: { 
                    "Authorization": `Bearer ${user.accessToken}`
                }
            });
            getUserTrips();
        } catch (err) {
            console.error(err.message);
        }
    };

    //Get Trips is called right after our new Trip is created to cause a rerender
    //Then when user is automatically navigated to the Dashboard, they have an updated list of their trips
    const getUserTrips = async () => {
        try {
            // console.log("new trip getting trips")
            const response = await TripFinder.get(`/mytrips/${user.userID}`, { 
                headers: { 
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            // setListTrips(response.data);
        } catch (err) {
            console.error(err.message);
        }
    };

    const submit = () => {
        postTrip();
        navigate("/pages/DashboardPage");
    }

    return (
        <div>
            <div>
                <div className={css.title}>
                    Start with the Basics!
                </div>
                <div className={css.description}>
                    <p> Your trip may be simple, or it may end up being a life changing experience! Regardless, lets start with the basics. </p>
                </div>
                <div>
                    <form>
                        {/* <div style={{display:"flex",justifyContent:"flex-between"}}>
                            <div className={css.smallInput}>   
                                <label> Start Location </label> 
                                <input id="startID" type="text" name="Start" title="Where does our trip begin?" placeholder="London"/>
                            </div>  
                            <div className={css.smallInput}>
                                <label> End Location </label>
                                <input id="endID" type="text" name="End" title="Where does out trip end?" placeholder="Vienna"/>
                            </div>
                        </div> */}

                        <div style={{display:"flex", justifyContent:"flex-between"}}>
                            <div className={css.smallInput}>
                                <label> Start Date </label>
                                <input id="startDateID" type="date" name="DateStart"></input>
                            </div>
                            <div className={css.smallInput}>
                                <label> End Date </label>
                                <input id="endDateID" type="date" name="DateEnd"></input>
                            </div>
                        </div>
                        <div className={css.smallInput}>
                            <label> Purpose of Travel </label>
                            <select id="purposeID" name="Purpose">
                                <option value="Personal"> Personal </option>
                                <option value="Work"> Work </option>
                            </select>
                        </div>
                        <div className={css.rowButton}>
                            <button type="button" className={css.buttonBack} onClick={() => module(0)}> Back </button>
                            <button type="button" className={css.buttonNext} onClick={() => submit()}> Done </button>
                        </div>
                    </form>
                </div>
        </div>
        </div>
    )
};

export default NewTrip2;