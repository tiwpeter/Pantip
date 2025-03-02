'use client';

import './styles.css';
import './borderclick.css';
import './sr.css';
import './visible.css';

import React, { useEffect, useState } from 'react';

const Nab = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const moveBoxes = () => {
    // Get elements by their IDs
    const cop1 = document.getElementById('cop1');
    const copcentered = document.getElementById('copcentered');
    const cop2 = document.getElementById('cop2');
    const teepuk = document.getElementById('teepuk');

    if (copcentered && cop1 && cop2 && teepuk) {
      copcentered.style.zIndex = '12';
      copcentered.style.position = 'fixed';
      cop1.style.width = '284px';
      cop1.style.position = 'absolute';
      cop1.style.right = '189px';
      cop2.style.position = 'absolute';
      cop2.style.top = '-92px';
      cop2.style.right = '146px';

      if (cop1.classList.contains('visible')) {
        cop1.classList.remove('visible');
        cop1.classList.add('hidden');
        cop2.classList.remove('hidden');
        cop2.classList.add('visible');
      }
      teepuk.style.top = '1000px';
    } else {
      console.error("Element with id 'copcentered' or 'cop1' not found.");
    }
  };

  const resetBoxes = () => {
    const copcentered = document.getElementById('copcentered');
    const cop1 = document.getElementById('cop1');
    const cop2 = document.getElementById('cop2');
    const teepuk = document.getElementById('teepuk');

    // Check if copcentered is not null before resetting styles
    if (copcentered && cop1 && cop2 && teepuk) {
      copcentered.style.zIndex = '';
      copcentered.style.position = '';
      cop1.style.width = '';
      cop1.style.position = '';
      cop1.style.right = '';
      cop2.style.position = '';
      cop2.style.top = '';
      cop2.style.right = '100px';

      cop1.classList.add('visible');
      cop1.classList.remove('hidden');
      cop2.classList.add('hidden');
      cop2.classList.remove('visible');

      // teepuk
      teepuk.style.top = '';
    } else {
      console.error("Element with id 'copcentered' not found.");
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
    <div
      className="IMGdisplay"
      style={{ width: '100%', height: '96px', background: 'aliceblue' }}
    >
      <div className="copcentered" id="copcentered">
        <div className="centered" id="centered">
          <div
            className="cop1 visible"
            id="cop1"
            style={{ background: '#fff' }}
          >
            <div className="borderkick">
              <div className="grid">
                <h5>Myfeed</h5>
                <h5 style={{ color: '#808080' }}>
                  รวบรวมเรื่องราวที่คุณต้องการ
                </h5>
              </div>
            </div>
            <div className="borderkick">
              <div className="grid">
                <h5>Pantip Pick</h5>
                <h5 style={{ color: '#808080' }}>กระทู้คุณภาพโดยทีมงาน</h5>
              </div>
            </div>
            <div className="borderkick">
              <div className="grid">
                <h5>Pantip Hitz</h5>
                <h5 style={{ color: '#808080' }}>
                  กระทู้ฮิตติดเทรนด์ทุก 10 นาที
                </h5>
              </div>
            </div>
            <div className="borderkick">
              <div className="grid">
                <h5>Explore</h5>
                <h5 style={{ color: '#808080' }}>สำรวจ</h5>
              </div>
            </div>
          </div>
        </div>
        <div className="centered1">
          <div className="cop hidden" id="cop2">
            <div className="borderkick">
              <h5>เรื่องราว</h5>
            </div>
            <div className="borderkick">
              <h5>กระทู้</h5>
            </div>
            <div className="borderkick">
              <h5>ฮิตติดเทรนด์</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nab;
