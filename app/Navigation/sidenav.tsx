'use client';
import React, { useState } from 'react';
import './Sidenav.css';
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import ExploreIcon from "@mui/icons-material/Explore";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ChatIcon from "@mui/icons-material/Chat";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import MenuIcon from "@mui/icons-material/Menu";
// import { useRouter } from 'next/router';
import { useRouter } from 'next/navigation'
import ModalWrapper from '../Timeline/Posts/AddPost/modalWrapper';
import { Tooltip, Button } from '@mui/material';

const Sidenav = () => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className='sidenav'>
      <div className='sidenav__logo'></div>
      
      <div className='sidenav__buttons'>
        <button className='sidenav__button' onClick={() => router.push('/')}>
          <HomeIcon />
          <span>Home</span>
        </button>
        <button className='sidenav__button' onClick={() => router.push('/search')}>
          <SearchIcon />
          <span>Search</span>
        </button>
        <button className='sidenav__button' onClick={() => router.push('/explore')}>
          <ExploreIcon />
          <span>Explore</span>
        </button>
        <button className='sidenav__button' onClick={() => router.push('/reels')}>
          <SlideshowIcon />
          <span>Reels</span>
        </button>
        <button className='sidenav__button' onClick={() => router.push('/messages')}>
          <ChatIcon />
          <span>Messages</span>
        </button>
        <button className='sidenav__button' onClick={() => router.push('/notifications')}>
          <FavoriteBorderIcon />
          <span>Notifications</span>
        </button>
        <button className='sidenav__button' onClick={() => setShowModal(true)}>
          <AddCircleOutlineIcon />
          <span>Create</span>
        </button>
      </div>
      <div className='sidenav__more'>
        <button className='sidenav__button'>
          <MenuIcon />
          <span>More</span>
        </button>
      </div>
      {/* Render ModalWrapper component */}
      <ModalWrapper showModal={showModal} handleCloseModal={handleCloseModal} />
    </div>
  );
}

export default Sidenav;
