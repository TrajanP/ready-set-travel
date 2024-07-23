//The Account Page allows a user to view their accounts and make changes.
//React Imports
import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
//CSS Import
import css from './pagesCSS/accountPage.module.css';
import AccountIcon from '../media/misc/AccountIcon.png';
//Component Imports
import NavBarMain from '../components/NavbarMain';
import UpdateUserModal from '../components/UpdateUserModal';
import UpdatePassModal from '../components/UpdatePassModal';
import UpdateFirstModal from '../components/UpdateFirstModal';
import UpdateLastModal from '../components/UpdateLastModal';
//React Icons Imports
import { FaEdit } from "react-icons/fa";
import UsersFinder from '../apis/UsersFinder';

export const AccountPage = () => {

    const [showUserModal, setShowUserModal] = useState(false);
    const [showPassModal, setShowPassModal] = useState(false);
    const [showFirstModal, setShowFirstModal] = useState(false);
    const [showLastModal, setShowLastModal] = useState(false);
    const [dateSince, setDateSince] = useState(""); //Need to retrieve member since date

    const { user, setUser } = useContext(UserContext); //Locally Stored

    //Get user's info to display in Account page
    useEffect(() => {
        const getUser = async () => {
            try {
                const currUser = await UsersFinder.get(`/${user.username}`, {
                    headers: { 
                        Authorization: `Bearer ${user.accessToken}` 
                    }
                });
                const rawDate = currUser.data.user_member_since;
                setDateSince(new Date(rawDate).toDateString().toLocaleString());
            } catch (err) {
                console.log(err.message);
            }
        };    
        getUser();
    }, []);

    return(
        <div>
            <NavBarMain></NavBarMain>
            <div className={css.container}>
                <div className={css.body}>
                    <div className={css.infoContainer}>
                        <div className={css.leftInfoContainer}>
                            <h3>
                                <div style={{textAlign:"center", fontWeight:"bold", padding:"5px"}}> My Account </div> 
                                <span className={css.row}> <span className={css.rowLeft}> User Name: </span> <span className={css.rowMiddle} className={css.spanOverflow}> {user.username} </span> <span className={css.rowRight}> <FaEdit className={css.editIcon} onClick={() => setShowUserModal(true)}/> </span></span>
                                <span className={css.row}> <span className={css.rowLeft}> Password: </span> <span className={css.rowMiddle}> ***** </span> <span className={css.rowRight}> <FaEdit className={css.editIcon} onClick={() => setShowPassModal(true)}/> </span></span>
                                <span className={css.row}> <span className={css.rowLeft}> First Name: </span> <span className={css.rowMiddle}> {user.firstName} </span> <span className={css.rowRight}> <FaEdit className={css.editIcon} onClick={() => setShowFirstModal(true)}/> </span></span>
                                <span className={css.row}> <span className={css.rowLeft}> Last Name: </span> <span className={css.rowMiddle}> Parkes </span> <span className={css.rowRight}> <FaEdit className={css.editIcon} onClick={() => setShowLastModal(true)}/> </span></span>
                            </h3>
                        </div>
                        <div className={css.rightInfoContainer}>
                            <div>
                                <lottie-player src="https://lottie.host/1ee436cc-9a82-415b-bb6f-9cf74422d74f/a0yb0swvZ8.json"  className={css.sparksIcon} background="#212529" speed="1" loop  autoplay direction="1" mode="normal"></lottie-player>
                                < img alt="Account Icon" src={AccountIcon} className={css.logo}></img>
                                <div className={css.infoName}> Member since {dateSince} </div>
                            </div>
                        </div>

                        {showUserModal ? <UpdateUserModal passSetShowUserModal={setShowUserModal}/> : ""}
                        {showPassModal ? <UpdatePassModal passSetShowPassModal={setShowPassModal}/> : ""}
                        {showFirstModal ? <UpdateFirstModal passSetShowFirstModal={setShowFirstModal}/> : ""}
                        {showLastModal ? <UpdateLastModal passSetShowLastModal={setShowLastModal}/> : ""}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountPage;