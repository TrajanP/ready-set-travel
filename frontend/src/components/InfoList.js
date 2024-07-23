//This component provides the Vertical List of Info on the Homepage
//Library Imports
import React from 'react';
//Styling Imports
import css from '../pages/pagesCSS/homepage.module.css';
//Media Imports
import imgMap from '../media/homepageImgs/WorldMap.png';
import SignUpVideo from '../media/videos/SignUpVideo.mp4';
import NewTripVideo from '../media/videos/NewTripVideo.mp4';

export const InfoList= () => {

    return (
        <div className={css.textblock}>
          <section className={css.textblockContainer} id="page1ID">
            <div className={css.leftContainer}>
            <h1 className={css.textblockTitle}><span style={{backgroundColor:"#758A7F", padding:"5px"}}> What is Ready Set Travel? </span></h1>
              <p className={css.textblockContent}>
                It's time to pack your bags.<br/><br/>
                <span style={{fontWeight:"bolder"}}> Ready Set Travel </span> is a simple and intuitive way to make your next Adventure easier and more enjoyable. Focusing on a visual way to represent your Trip with a Stop by Stop itinerary represented on dynamic world map.<br/><br/>
                With the goal of avoiding spending even more time with Itinerary planning, the visual experience is simple and light weight. A few clicks, and you are already on your way to planning your trip.<br/><br/>
                Our visual planner allows you to spend more time sipping Pena Coladas or finding new adventures rather than being overwhelmed with trip planning. <br/> <br/>So start clicking, that Beach Hammock is closer than you think!
                
              </p>
            </div>
            <div className={css.rightContainer}>
              <img alt="The World Map" src={imgMap} className={css.imgContainer}/>
            </div>
            <h2 className={css.nextScrollSecondary} onClick={() => document.getElementById('page2ID').scrollIntoView()}> How to Start </h2>
          </section>
           
          <section className={css.textblockContainer} id="page2ID">
            <div className={css.leftContainer}>
              <div className={css.videoContainer}><video className={css.video} muted={true} loop={true} autoPlay={true}> <source src={SignUpVideo} type="video/mp4"/></video></div>
            </div>
            <div className={css.rightContainer}>
              <h1 className={css.textblockTitle}><span style={{backgroundColor:"#758A7F", padding:"5px"}}> Welcome to the Club </span></h1>
              <p className={css.textblockContent}>
                All are welcome.<br/><br/>
                You're getting to know what we're all about, now it's your turn! <br/> <br/>
                Go ahead and create an account with our <span style={{fontWeight:"bolder"}}> Account </span> tab in the top right. We'll ask you a couple of questions and you'll be in!
                ...No secret handshake required.
              </p>
            </div>
            <h2 className={css.nextScrollSecondary} onClick={() => document.getElementById('page3ID').scrollIntoView()}> Creating your Trip </h2>
          </section>

          <section className={css.textblockContainer} id="page3ID">
            <div className={css.leftContainer}>
              <h1 className={css.textblockTitle}><span style={{backgroundColor:"#758A7F", padding:"5px"}}> Where to First? </span></h1>
              <p className={css.textblockContent}>
                Every great story needs a beginning.<br/><br/>
                Go ahead and get started by clicking the <span style={{fontWeight:"bolder"}}> New Trip </span> tab. <br/> You'll need to think of a Name for this new adventure...no pressure!<br/><br/>
                Next we want to know what this trip is all about! Fill in a little description to best summarize the adventure. <br/><br/>
                A few more questions and <span style={{fontWeight:"bolder"}}> Boom! </span> Now we have our trip. 
              </p>
            </div>
            <div className={css.rightContainer}>
              <div className={css.videoContainer}><video className={css.video} muted={true} loop={true} autoPlay={true}> <source src={NewTripVideo} type="video/mp4"/></video></div>
            </div>
            <h2 className={css.nextScrollSecondary} onClick={() => document.getElementById('page4ID').scrollIntoView()}> Make it Yours </h2>
          </section>

          <section className={css.textblockContainer} id="page4ID">
            <div className={css.leftContainer}>
            <div className={css.videoContainer}><video className={css.video} muted={true} loop={true}autoPlay={true}> <source src={SignUpVideo} type="video/mp4"/></video></div>
            </div>
            <div className={css.rightContainer}>
              <h1 className={css.textblockTitle}><span style={{backgroundColor:"#758A7F", padding:"5px"}}> All aboard! Let's add a stop </span></h1>
              <p className={css.textblockContent}>
                You know what they say... it's a big world?<br/><br/>
                We've found ourselves in the <span style={{fontWeight:"bolder"}}> My Trips </span> dashboard. Here you can see all of your trips. Past present and future! Go ahead and select <span style={{fontWeight:"bolder"}}> Edit Trip </span> for your newly created trip. We want to start planning! <br/> <br/>
                You may be having a relaxing escape to the beach with only a few stops, or maybe you're exploring all of Europe, it's up to you! With every stop added, you'll see a marker added to the map. Here you'll be able to start seeing your adventure take form. <br/> <br/>
                When you're all done, make sure to save! <br/> <br/>
                That's a wrap! Now you've got an idea of how we do things around here...so start planning!
              </p>
            </div>
            <h2 className={css.nextScrollSecondary} onClick={() => window.scrollTo({ top: 0, left: 0, behavior: "smooth" })}> Back to Top </h2>
          </section>
        </div>
    );
}

export default InfoList;