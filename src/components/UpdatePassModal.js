//This component renders the modal to Update a user's Password in a user's account settings.
//React Imports
import React, { useState, useContext, useRef, useEffect } from 'react';
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
export const UpdatePassModal = (props) => {

    const { user, setUser } = useContext(UserContext);
    const [pass, setPass] = useState("");
    const [confirm, setConfirm] = useState("");
    const [passValid, setPassValid] = useState(false);
    const [confirmValid, setConfirmValid] = useState(false);
    const [match, setMatch] = useState(true);
    const [errMsg, setErrMsg] = useState("");
    const passRef = useRef();
    const errRef = useRef();

    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    const UpdatePass = async (newPass) => {
        try {
            const response = await UsersFinder.patch("/update/pass", {
                "user_username": user.username,
                "user_password": newPass
            }, {
                headers: {
                    "Authorization": `Bearer ${user.accessToken}`
                }
            });
            props.passSetShowPassModal(false);
            setPass("");
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
        passRef.current.focus();
    }, []);

    //Is User's Password valid?
    useEffect(() => {
        var valid = PASSWORD_REGEX.test(pass);
        setPassValid(valid);
        if(pass.localeCompare(confirm) === 0)
            setMatch(true);
        else
            setMatch(false);
        setErrMsg("");
    }, [pass, confirm]);

    const functionHandler = (newPass) => {
        if(passValid && match)
            UpdatePass(newPass);
    };

    return (    
        <div className={css.modalContainers}>
            <Modal show={true} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <div className={css.modalContainer} >
                <Modal.Header className={css.modalHeader}>
                    <Modal.Title> New Password </Modal.Title>
                    <ImCross className={css.exitIcon} onClick={() => props.passSetShowPassModal(false)}/>
                </Modal.Header >
                <Modal.Body className={css.modalBody} >
                    <form>
                        <div className={css.inputGroupRow}>   
                            <div className={css.inputGroupCol}>   
                            <label htmlFor="passID"> Password: {pass && !passValid ? <ImCross style={{color:"#B25E4C"}}/> : ""}</label>
                                <input id="passID" type="password" name="Password" title="Change your Password." placeholder="*****" ref={passRef} onChange={(e) => setPass(e.target.value)}/>
                            </div>   
                        </div>
                        <div className={css.inputGroupRow}>   
                            <div className={css.inputGroupCol}>   
                                 <label htmlFor="passConfirmID"> Confirm Password: {pass && passValid && confirm && !match  ? <ImCross style={{color:"#B25E4C"}}/> : ""}</label>
                                <input id="passConfirmID" type="password" name="PasswordConfirm" title="Confirm your Password." placeholder="*****" onChange={(e) => setConfirm(e.target.value)}/>
                            </div>   
                        </div>
                    </form>
                </Modal.Body>
                    <Modal.Footer className={css.modalFooter}>
                    <p className={pass && !passValid ? css.errMsgOn : css.errMsgOff}> Password must be 8-24 characters long and contain a minimum of one number and one special character. </p>
                    <p className={pass && passValid && confirm && !match ? css.errMsgOn : css.errMsgOff}> Passwords must match. </p>
                    <p ref={errRef} className={errMsg ? css.errMsgOn : css.errMsgOff}> {errMsg} </p>
                    <button onClick={() => functionHandler(document.getElementById("passConfirmID").value)}>
                        Change
                    </button>
                </Modal.Footer>
            </div>
            </Modal>
    </div>
    )   
}

export default UpdatePassModal;