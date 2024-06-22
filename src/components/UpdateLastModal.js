//This component renders the modal to Update a user's Last Name in a user's account settings.
//React Imports
import React, { useState, useContext, useEffect, useRef } from 'react';
//React-Bootstrap Imports
import Modal from 'react-bootstrap/Modal';
//CSS Import
import css from '../components/componentsCSS/modalStop.module.css';
//React-Icons Import
import { ImCross } from "react-icons/im";
//API Imports 
import UsersFinder from '../apis/UsersFinder.js';
//Middlware Imports
import { UserContext } from '../context/UserContext';

export const UpdateLastModal = (props) => {

    const { user, setUser } = useContext(UserContext);
    const [errMsg, setErrMsg] = useState(false);
    const [name, setName] = useState("");
    const [validName, setValidName] = useState(false);

    const userRef = useRef();
    const errorRef = useRef();

    const NAME_REGEX = /^(?=.{1,24}$)[a-zA-Z]+$/;

    const UpdateLastName = async (lName) => {
        try {
            const response = await UsersFinder.patch("/update/lName", {
                "user_username": user.username,
                "user_last_name": lName,
            }, {
                headers: {
                    "Authorization": `Bearer ${user.accessToken}`
                }
            });
            props.passSetShowLastModal(false);
            // setUser({ ...user, firstName: fName});
            // console.log(JSON.stringify(response.data));
        } catch (err) {
            if (!err.response)
                setErrMsg("No Server Response");
            else if (err.response.status === 400)
                setErrMsg("Invalid Data");
            else if (err.response.status === 401)
                setErrMsg("Unauthorized User");
            else if (err.response.status === 403)
                setErrMsg("Acccess Expired");
            else
                setErrMsg("Request Failed");
        }
    };

    const functionHandler = (lName) => {
        if(validName)
            UpdateLastName(lName);
    };

     //Set Input focus on render
     useEffect(() => {
        userRef.current.focus();
    }, []);

    //Is User's input valid?
    useEffect(() => {
        const result = NAME_REGEX.test(name);
        setValidName(result);
    }, [name]);

    //If user changes input, reset error message
    useEffect(() => {
        setErrMsg('');
    }, [name]);


    return (    
        <div className={css.modalContainers}>
            <Modal show={true} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <div className={css.modalContainer} >
                <Modal.Header className={css.modalHeader}>
                    <Modal.Title> New Last Name </Modal.Title>
                    <ImCross className={css.exitIcon} onClick={() => props.passSetShowLastModal(false)}/>
                </Modal.Header >
                <Modal.Body className={css.modalBody} >
                    <form>
                        <div className={css.inputGroupRow}>   
                            <div className={css.inputGroupCol}>   
                                <label> Last Name: {!validName && name ? <ImCross style={{color:"#B25E4C"}}/> : ""}</label> 
                                <input id="lastID" type="text" name="LastName" title="Change your Last Name." placeholder="Scott" ref={userRef} onChange={(e) => setName(e.target.value)}/>
                            </div>   
                        </div>
                    </form>
                </Modal.Body>
                    <Modal.Footer className={css.modalFooter}>
                    <p className={name && !validName ? css.errMsgOn : css.errMsgOff}> Name must not contain special characters or numbers. </p>
                    <p ref={errorRef} className={errMsg ? css.errMsgOn : css.errMsgOff}> {errMsg} </p>
                    <button onClick={() => functionHandler(document.getElementById("lastID").value)}>
                        Change
                    </button>
                </Modal.Footer>
            </div>
            </Modal>
    </div>
    )   
}

export default UpdateLastModal;