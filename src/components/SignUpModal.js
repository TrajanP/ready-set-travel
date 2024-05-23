//This modal allows the user to create an account by providing, Email, First Name, Last Name and password. The password is hashed and stored.
//User input is validated before being sent to database. 
//React Imports
import React, {useContext, useState, useRef, useEffect} from 'react';
//Middleware Imports
import { UserContext } from '../context/UserContext';
//React-Bootstrap Imports
import Modal from 'react-bootstrap/Modal';
//CSS Import
import css from '../components/componentsCSS/modalBig.module.css';
//React-Icons Import
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
//React-Router Imports
import { useParams } from 'react-router-dom';
import AuthorizationFinder from '../apis/AuthorizationFinder';

export const SignUpModal = (props) => {

    const closeHandler = () => {
        props.passSetDropDown(false);
        props.passSetModalSignUpShow(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(validFirstName && validLastName && validPassword && validMatch)
          postUser();
        else
            return;
    };

    //Create new User in database if their input is valid input
    const postUser = async () => {
        try {
            const response = await AuthorizationFinder.post("/", {
                "username": email,
                "firstName": firstName,
                "lastName": lastName,
                "password": password,
            });
            loginUser();
            // props.passSetDropDown(false);
            // props.passSetModalSignUpShow(false);
        } catch (err) {
            console.log(err.message);
        }
    };

    const loginUser = async () => {
        try {
            const response = await AuthorizationFinder.post('/login/', {
                "username": email,
                "password": password,
            });
            const accessToken = response?.data?.accessToken;
            //Set global User Context with account profile
            setUser({
                username: email, 
                accessToken: accessToken,
                isAuth: true,
                firstName: response.data.name,
                userID: response.data.userID,
            });
            props.passSetDropDown(false);
            props.passSetModalSignUpShow(false);
        } catch (err) {
            console.log("Error signing in new ")
        }
    };


    //User Context
    const { user, setUser } = useContext(UserContext);
    //Accepted cases for user input
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const NAME_REGEX = /^(?=.{2,24}$)[a-zA-Z]+$/;

    const emailRef = useRef();
    const errRef = useRef();

    //User's Email
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    //User's First Name
    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    //User's Last Name
    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    //User's Password
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    //Confirm User's Password
    const [match, setMatch] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    //Set initial focus on render
    useEffect(() => {
        emailRef.current.focus();
    }, []);

    //Does User's Password pass and match?
    useEffect(() => {
        const result = PASSWORD_REGEX.test(password);
        setValidPassword(result);
        const matchPWD = password === match;
        setValidMatch(matchPWD);
    }, [password, match]);

    //Does User's first name pass?
    useEffect(() => {
        const result = NAME_REGEX.test(firstName);
        setValidFirstName(result);
    }, [firstName]);

    //Does User's last name pass?
    useEffect(() => {
        const result = NAME_REGEX.test(lastName);
        setValidLastName(result);
    }, [lastName]);

    //If any input changes, reset error message
    useEffect(() => {
        setErrMsg('');
    }, [email, firstName, lastName, password, match]);
    
    return (

        <div className={css.modalContainers}>
            <Modal show={true} size="lg" aria-labelledby="contained-modal-title-vcenter" centered fullscreen={true} >
              <div className={css.modalContainer} >
                <Modal.Body className={css.modalBody} >
                <div className={css.formContainer}>
                    <div className={css.formHeader}>
                        <div style={{display:"flex"}}> <h2>Sign Up</h2> <ImCross className={css.exitIcon} onClick={() => closeHandler()}/></div>
                        <p>Your adventure awaits! Create your account now!</p>
                        <p ref={errRef} className={errMsg ? css.errMsgOn : css.errMsgOff} aria-live="assertive">{errMsg}</p>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className={css.inputGroupRow}>   
                            <div className={css.inputGroupCol}>   
                                <label htmlFor="userNameID"> Email: </label> 
                                <input required ref={emailRef} id="userNameID" type="email" name="UserName" title="Enter your email." placeholder="JohnDoe@gmail.com" onFocus={() => setEmailFocus(true)} onBlur={() => setEmailFocus(false)} onChange={(e) => setEmail(e.target.value)}/>
                            </div>   
                        </div>   
                        <div className={css.inputGroupRow}>   
                            <div className={css.inputGroupColHalf}>   
                                <label htmlFor="firstNameID"> First Name: {!validFirstName && firstName ? <ImCross style={{color:"#B25E4C"}}/> : ""}</label> 
                                <input required id="firstNameID" type="text" name="firstName" title="Enter your first name." placeholder="John" onFocus={() => setFirstNameFocus(true)} onBlur={() => setFirstNameFocus(false)} onChange={(e) => setFirstName(e.target.value)}/>
                            </div>   
                            <div className={css.inputGroupColHalf}>   
                                <label htmlFor="lastNameID"> Last Name: {!validLastName && lastName ? <ImCross style={{color:"#B25E4C"}}/> : ""}</label> 
                                <input required id="lastNameID" type="text" name="lastName" title="Enter your last name." placeholder="Doe" onFocus={() => setLastNameFocus(true)} onBlur={() => setLastNameFocus(false)} onChange={(e) => setLastName(e.target.value)}/>
                            </div>   
                        </div>   

                        <p className={firstNameFocus && firstName && !validFirstName ? css.errMsgOn : css.errMsgOff}> First Name must be 2-24 characters long and not contain numbers or special characters. </p>
                        <p className={lastNameFocus && lastName && !validLastName ? css.errMsgOn : css.errMsgOff}> Last Name must be 2-24 characters long and not contain numbers or special characters. </p>

                        <div className={css.inputGroupRow}>  
                            <div className={css.inputGroupCol}>   
                                <label htmlFor="passwordID"> Password: {!validPassword && password ? <ImCross style={{color:"#B25E4C"}}/> : ""}</label> 
                                <input required id="passwordID" type="password" name="Password" title="Enter your password." onFocus={() => setPasswordFocus(true)} onBlur={() => setPasswordFocus(false)} onChange={(e) => setPassword(e.target.value)}/>
                                <p className={passwordFocus && password && !validPassword ? css.errMsgOn : css.errMsgOff}> Password must be 8-24 characters long and contain a minimum of one number and one special character. </p>
                            </div>    
                        </div>
                        <div className={css.inputGroupRow}>  
                            <div className={css.inputGroupCol}>   
                                <label htmlFor="confirmID"> Confirm Password: {!validMatch && match ? <ImCross style={{color:"#B25E4C"}}/> : ""} </label> 
                                <input required id="confirmID" type="password" name="Confirm" title="Confirm your password." onFocus={() => setMatchFocus(true)} onBlur={() => setMatchFocus(false)} onChange={(e) => setMatch(e.target.value)}/>
                                <p className={matchFocus && match && !validMatch ? css.errMsgOn : css.errMsgOff}> Passwords must match. </p>
                            </div>    
                        </div>
                        <div className={css.formFooter}>
                            <button>
                                Create Account
                            </button>
                        </div>
                    </form>
                </div>
                </Modal.Body>
            </div>
            </Modal>
        </div>
    )
}

export default SignUpModal;