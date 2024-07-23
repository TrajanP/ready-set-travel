//Component is used to display website wide Nav bar.

//Library Imports
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
//CSS Import
import css from '../components/componentsCSS/navBarMain.module.css';
//Component Imports
import AccountButton from '../components/AccountButton.js';
//Middleware Imports
import { UserContext } from '../context/UserContext';

export const MainNavbar = (props) => {

  const {user, setUser} = useContext(UserContext);

    return ( 
      <div  className = {props.transparent ? css.transparent : css.navContainer}>
        <div className={css.navBody}>
        <div className={css.logoContainer}>
              <img alt="Ready Set Travel logo" className={css.logo} src={require('../media/misc/logo.png')} />
        </div>
        <Link to="/" className={css.link}> Home </Link>
        {user.isAuth ? <div style={{paddingTop:"30px"}}> 
          <Link to="/pages/DashboardPage" className={css.link}> My Trips </Link> 
          <Link to="/pages/NewTrip" className={css.link}> New Trip </Link> </div> : <div></div>}
        </div>
        <div className={css.navAccount}>
          {!user.isAuth ? 
            <span style={{display:"flex", marginRight:"10px"}}>
              <span style={{fontWeight:"bold", marginTop:"10px"}}> Welcome! </span> 
              <lottie-player src="https://lottie.host/cced1e2e-32bc-4ec8-a7ea-51ff62264850/XtD44XYvIz.json"  style={{width:"40px", height:"40px"}} background="##FFFFFF" speed="1" loop autoplay direction="1" mode="normal"></lottie-player> 
            </span> 
          :
            <span style={{fontWeight:"bold", marginTop:"10px", marginRight:"10px"}}> Hi {user.firstName}! </span>
          }
          <AccountButton/> 
        </div>
      </div>
    )};

export default MainNavbar; 