//The Homepage will be the base of the application, it is not built out yet.

import React, { useContext } from 'react';
import NavbarMain from '../components/NavbarMain';
import Button from 'react-bootstrap/Button';
import { UserContext } from '../context/UserContext';
import css from './pagesCSS/homepage.module.css';

export const HomePage = () => {

    const { user, setUser } = useContext(UserContext);

    return (
        <div>
            <NavbarMain/>
            <div className={css.body}>
            <div className={css.background}></div>
                <div> User Logged in: {user.username} </div>
                <div>
                    <div className={css.title}>
                        Ready Set Travel
                        <div className={css.description}>
                            <p>
                                Are your bags packed? Welcome to Ready Set Travel. An Innovative and Visually focused tool to help you plan your next Amazing travel plans. 
                            </p>
                        </div>
                    </div>
                </div>
            </div>         
        </div>
    );


}

export default HomePage;