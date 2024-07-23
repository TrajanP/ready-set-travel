//This component renders the modal to Update a user's Username in a user's account settings.
//React Imports
import React, { useState, useContext, useRef, useEffect } from 'react';
//React-Bootstrap Imports
import Modal from 'react-bootstrap/Modal';
//CSS Import
import css from '../components/componentsCSS/modalStop.module.css';
//React-Icons Import
import { ImCross } from "react-icons/im";
//React-Router Imports
import { useParams } from 'react-router-dom';
//API Imports 
import UsersFinder from '../apis/UsersFinder.js';
//Middlware Imports
import { UserContext } from '../context/UserContext';

export const UpdateUserModal = (props) => {

    const { user, setUser } = useContext(UserContext);
    const [errMsg, setErrMsg] = useState("");
    const [validUsername, setValidUsername] = useState(false);
    const [username, setUsername] = useState("");

    const userRef = useRef();
    const errorRef = useRef();

    const USERNAME_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const functionHandler = (newUsername) => {
        if(validUsername)
            UpdateUsername(newUsername);
    };

    const UpdateUsername = async (newUsername) => {
        try {
            const response = await UsersFinder.patch("/update/username", {
                "user_username": user.username,
                "user_new_username": newUsername,
            }, {
                headers: {
                    "Authorization": `Bearer ${user.accessToken}`
                }
            });
            setUser({...user, username: newUsername});
            props.passSetShowUserModal(false);
        } catch (err) {
            if (!err.response)
                setErrMsg("No Server Response");
            else if (err.response.status === 400)
                setErrMsg("This Username Already Exists.");
            else if (err.response.status === 401)
                setErrMsg("Unauthorized User");
            else if (err.response.status === 403)
                setErrMsg("Acccess Expired");
            else
                setErrMsg("Request Failed");
        }
    };

     //Set Input focus on render
     useEffect(() => {
        userRef.current.focus();
    }, []);

    //Is User's input valid?
    useEffect(() => {
        const result = USERNAME_REGEX.test(username);
        setValidUsername(result);
    }, [username]);

    //If user changes input, reset error message
    useEffect(() => {
        setErrMsg('');
    }, [username]);

    return (    
        <div className={css.modalContainers}>
        <Modal show={true} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <div className={css.modalContainer} >
            <Modal.Header className={css.modalHeader}>
                <Modal.Title> New Username </Modal.Title>
                <ImCross className={css.exitIcon} onClick={() => props.passSetShowUserModal(false)}/>
            </Modal.Header >
            <Modal.Body className={css.modalBody} >
                <form>
                    <div className={css.inputGroupRow}>   
                        <div className={css.inputGroupCol}>   
                            <label> Username: {!validUsername && username ? <ImCross style={{color:"#B25E4C"}}/> : ""}</label> 
                            <input required id="usernameID" type="email" name="Username" title="Change your Username." ref={userRef} placeholder="michael@gmail.com" onChange={(e) => setUsername(e.target.value)}/>
                        </div>   
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer className={css.modalFooter}>
                <p className={username && !validUsername ? css.errMsgOn : css.errMsgOff}> Username must be a valid email. </p>
                <p ref={errorRef} className={errMsg ? css.errMsgOn : css.errMsgOff}> {errMsg} </p>
                <button onClick={() => functionHandler(document.getElementById("usernameID").value)}>
                    Change
                </button>
            </Modal.Footer>
        </div>
        </Modal>
</div>
    )   
}

export default UpdateUserModal;