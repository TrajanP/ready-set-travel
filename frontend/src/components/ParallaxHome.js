//This component is used to create the Parallax effect found on the homepage
//Library Imports
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
//Styling Imports
import css from '../pages/pagesCSS/homepage.module.css';

export const ParallaxHome = () => {

    const ref = useRef();

    const { scrollYProgress } = useScroll({
        target: ref, //Container I want to track
        //Intersection 1: Start of tracking Intersection 2: End of tracking
        offset: ["start start", //Start of Container, Start of the Window
         "end start"], //Start of the Container, End of the window
      });

      const sunsetY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
      const settingY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
      const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);

    return (
        <div ref={ref} className={css.backgroundImageContainer}>
            <motion.div style={{y:sunsetY}} className={css.backgroundSunset}/>
            <motion.div style={{y:settingY}} className={css.backgroundSetting1}/>
            <motion.div style={{y:titleY}} className={css.backgroundTitle}/>
        </div>

    )
};

export default ParallaxHome;