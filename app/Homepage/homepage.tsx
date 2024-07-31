'use client'
import React, { useState } from 'react';
import "./Homepage.css";
import Sidenav from '../Navigation/sidenav';
// import Timeline from "../timeline/Timeline"
// import Comments from '../components/Comments';
const Homepage = () => {

    return (
        <div className='homepage'>
            <div className="homepage__navWraper">
                <Sidenav />
            </div>
            <div className="homepage__timeline">
                {/* <Timeline /> */}
            </div>
                {/* <Comments /> */}
        </div>
    );
}

export default Homepage;