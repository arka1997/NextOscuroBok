'use client';

import React, { useState } from 'react';
import "./sidenav.css";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import ModalWrapper from '../Timeline/Posts/AddPost/modalWrapper';
import { Tooltip } from '@mui/material';
import { Button } from '@mui/material';

const Sidenav = () => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className='sidenav'>
      <div className='sidenav__logo'>
        <img src='/assets/img/Logo.png' alt='Logo' className='sidenav__logo-image' />
      </div>
      
      <div className='sidenav__buttons'>
        <Link href="/" className='sidenav__button'>
          <HomeIcon />
          <span>Home</span>
        </Link>
        <Link href="/search" className='sidenav__button'>
          <SearchIcon />
          <span>Search</span>
        </Link>
        <Link href="/explore" className='sidenav__button'>
          <ExploreIcon />
          <span>Explore</span>
        </Link>
        <Link href="/reels" className='sidenav__button'>
          <SlideshowIcon />
          <span>Reels</span>
        </Link>
        <Link href="/messages" className='sidenav__button'>
          <ChatIcon />
          <span>Messages</span>
        </Link>
        <Link href="/notifications" className='sidenav__button'>
          <FavoriteBorderIcon />
          <span>Notifications</span>
        </Link>
        <button className='sidenav__button' onClick={() => setShowModal(true)}>
          <AddCircleOutlineIcon />
          <span>Create</span>
        </button>
        {/* Render ModalWrapper component */}
        <ModalWrapper showModal={showModal} handleCloseModal={handleCloseModal} />
      </div>
      
      <div className='sidenav__more'>
        <button className='sidenav__button'>
          <MenuIcon />
          <span>More</span>
        </button>
      </div>
    </div>
  );
}

export default Sidenav;
