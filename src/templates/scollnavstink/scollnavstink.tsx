'use client';

import './css/navtick.css';
import './warper/styls.css';

import React, { useEffect, useState } from 'react';

import Room from './room/room';

const StickyNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const moveBoxes = () => {
    const stickyTop = document.getElementById('sticky-top');
    if (stickyTop) {
      stickyTop.style.position = 'fixed';
      stickyTop.style.top = '80px';
      stickyTop.style.zIndex = '9'; // Use camel case for zIndex
    } else {
      console.error("Element with id 'sticky-top' not found.");
    }
  };

  const resetBoxes = () => {
    const stickyTop = document.getElementById('sticky-top');

    // Check if stickyTop is not null before resetting styles
    if (stickyTop) {
      stickyTop.style.position = '';
      stickyTop.style.top = '';
      stickyTop.style.zIndex = '';
    } else {
      console.error("Element with id 'sticky-top' not found.");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      if (scrollPosition > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array ensures the effect runs only once

  useEffect(() => {
    if (isScrolled) {
      moveBoxes();
    } else {
      resetBoxes();
    }
  }, [isScrolled]);

  return (
    <div className="sticky-top" id="sticky-top">
      <div className="wrappper">
        <Room />
      </div>
    </div>
  );
};

export default StickyNav;
