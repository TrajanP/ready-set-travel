//The Account Button componenent is the User state navigation to Sign Up, Log In, View Account, Log Out
//Library Imports
import React, { useState, useContext } from 'react';
//CSS Import
import css from '../components/componentsCSS/accountButton.module.css';
//React Icons Imports
import { RxHamburgerMenu } from "react-icons/rx";
import { MdAccountCircle, MdNoAccounts, MdOutlineAssignmentInd } from "react-icons/md";
import { LuClipboardSignature } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { FaDoorOpen } from "react-icons/fa";
import { ImExit } from "react-icons/im";
//Component Imports
import LoginModal from '../components/LoginModal.js';
import SignUpModal from '../components/SignUpModal.js';
//Middleware Imports
import { UserContext } from '../context/UserContext';
//API Imports
import logoutFinder from '../apis/LogoutFinder';

export const AccountButton = () => {

    const [showDropDown, setShowDropDown] = useState(false);
    const [modalSignUpShow, setModalSignUpShow] = useState(false);
    const [modalLoginShow, setModalLoginShow] = useState(false);
    const {user, setUser} = useContext(UserContext);

    const logoutHandler = () => {
        logoutUser();
        setUser({username: "No User", accessToken: "No Token", isAuth: false, name: ""});
        setShowDropDown(false);
    };

    const logoutUser = async () => {
        const user = await logoutFinder.get(`/`, {});
    };

    return (
        <div>
            <div className={css.container} onClick={() => setShowDropDown(!showDropDown)}>
                {showDropDown ? <IoIosArrowDown className={css.logo}/> : <RxHamburgerMenu className={css.logo}/>}
                {user.isAuth ? <MdAccountCircle className={css.logo}/> : <MdNoAccounts className={css.logo}/>}
            </div>
            {user.isAuth ? 
                <li className={`${css.options} ${showDropDown ? css.show: ""}`}>
                    <label>
                        <ul className={css.option} onClick={() => setModalLoginShow(true)}>
                            <div> <MdOutlineAssignmentInd/> My Account </div>
                        </ul>
                    </label>
                    <label>
                        <ul className={css.option} onClick={() => logoutHandler()}>
                            <div> <ImExit/> Logout </div>
                        </ul>
                    </label>
                </li>
                :
                <li className={`${css.options} ${showDropDown ? css.show: ""}`}>
                    <label>
                        <ul className={css.option} onClick={() => setModalLoginShow(true)}>
                            <div> <MdOutlineAssignmentInd/> Login </div>
                        </ul>
                    </label>
                    <label>
                        <ul className={css.option} onClick={() => setModalSignUpShow(true)}>
                            <div> <LuClipboardSignature/> Sign Up </div>
                        </ul>
                    </label>
                </li> 
            }

            {modalLoginShow ? <LoginModal passSetModalLoginShow={setModalLoginShow} passSetDropDown={setShowDropDown}/> : ""}
            {modalSignUpShow ? <SignUpModal passSetModalSignUpShow={setModalSignUpShow} passSetDropDown={setShowDropDown}/> : ""}

        </div>
    )
};
export default AccountButton;