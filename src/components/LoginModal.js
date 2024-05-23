//The logout Modal is used to allow user to login to their account and sets the Global User Context
//React Imports
import React, {useState, useRef, useEffect, useContext} from 'react';
//React-Bootstrap Imports
import Modal from 'react-bootstrap/Modal';
//CSS Import
import css from '../components/componentsCSS/modalBig.module.css';
//React-Icons Import
import { ImCross } from 'react-icons/im';
//React-Router Imports
import { useParams } from 'react-router-dom';
//Middleware Imports
import { UserContext } from '../context/UserContext';
//API Imports
import AuthorizationFinder from '../apis/AuthorizationFinder';

export const LoginModal = (props) => {

    const submitHandler = async (e) => {
        e.preventDefault();
        functionHandler();
    };

    const closeHandler = () => {
        props.passSetDropDown(false);
        props.passSetModalLoginShow(false);
    };

    const functionHandler = async () => {
        try {
            const response = await AuthorizationFinder.post('/login/', {
                "username": username,
                "password": password,
            });
            console.log(JSON.stringify(response.data));
            const accessToken = response?.data?.accessToken;
            //Set global User Context with account profile
            setUser({
                username: username, 
                accessToken: accessToken,
                isAuth: true,
                firstName: response.data.name,
                userID: response.data.userID,
            });
            setUsername('');
            setPassword('');
            props.passSetModalLoginShow(false);
            props.passSetDropDown(false);
        } catch (err) {
            if (!err.response)
                setErrMsg("No Server Response");
            else if (err.response.status === 400)
                setErrMsg("Missing Username or Password");
            else if (err.response.status === 401)
                setErrMsg("Unauthorized User");
            else
                setErrMsg("Login Failed");
            errorRef.current.focus();
        }
    };

    const { user, setUser } = useContext(UserContext);
    const userRef = useRef();
    const errorRef = useRef();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, []);

    //Reset Error Message based on user input
    useEffect(() => {
        setErrMsg('');
    }, [username, password]);

    return (
        <div className={css.modalContainers}>
        <Modal show={true} size="lg" aria-labelledby="contained-modal-title-vcenter" centered fullscreen={true} >
          <div className={css.modalContainer} >
            <Modal.Body className={css.modalBody} >
            <div className={css.formContainer}>
                <div className={css.formHeader}>
                    <div style={{display:"flex"}}> <h2>Login</h2> <ImCross className={css.exitIcon} onClick={() => closeHandler()}/></div>
                    <p>Welcome Back! The world is a click away!</p>
                    <p ref={errorRef} className={errMsg ? css.errMsgOn : css.errMsgOff}> {errMsg} </p>
                </div>
                <form onSubmit={submitHandler}>
                    <div className={css.inputGroupRow}>   
                        <div className={css.inputGroupCol}>   
                            <label htmlFor="userNameID"> Username: </label> 
                            <input id="userNameID" type="text" name="UserName" title="Enter your username." ref={userRef} autoComplete="off" value={username} required placeholder="JohnDoe@gmail.com" onChange={(e) => setUsername(e.target.value)}/>
                        </div>   
                    </div>   
                    <div className={css.inputGroupRow}>  
                        <div className={css.inputGroupCol}>   
                            <label htmlFor="passwordID"> Password: </label> 
                            <input id="passwordID" type="password" name="Password" title="Enter your password." placeholder="*********" value={password} required onChange={(e) => setPassword(e.target.value)}/>
                        </div>    
                    </div>
                </form>
                <div className={css.formFooter}>
                    <button onClick={() => functionHandler()}>
                        Login
                    </button>
                </div>
            </div>
            </Modal.Body>
        </div>
        </Modal>
    </div>
)
}

export default LoginModal;