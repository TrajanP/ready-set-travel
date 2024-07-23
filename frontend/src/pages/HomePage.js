//The Homepage will be the base of the application
//React Library Imports
import React, { useRef } from 'react';
//Component Imports
import ParallaxHome from '../components/ParallaxHome';
import NavbarMain from '../components/NavbarMain';
import InfoList from '../components/InfoList'
//Styling Imports
import css from './pagesCSS/homepage.module.css';

import { motion, useScroll } from 'framer-motion';

export const HomePage = () => {

    const ref = useRef();
    const { scrollYProgress } = useScroll();

    return (
        <div ref={ref}>
            <motion.div className={css.scrollBar} style={{scaleX: scrollYProgress}}></motion.div>
            <NavbarMain transparent={true} />
            <div className={css.homePageContainerBuffer}>
                <ParallaxHome/>
                <InfoList/>
                <h2 className={css.nextScrollHome} onClick={() => document.getElementById('page1ID').scrollIntoView()}> Learn More </h2>
            </div>
        </div>
    );
}

export default HomePage;