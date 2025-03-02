'use client';

import './css/hover.css';
import './css/teepuk.css';
import './css/dropmenu.css';
import './css/border.css';
import './css/boxing.css';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Function to toggle the "open-menu" class on subMenu
  const togglemenu = () => {
    const subMenu = document.getElementById('subMenu');
    if (subMenu) {
      subMenu.classList.toggle('open-menu');
    }
  };

  const moveBoxes = () => {
    const teepuk = document.getElementById('teepuk');
    if (teepuk) {
      teepuk.style.top = '1000px'; // Example style change
    } else {
      console.error("Element with id 'teepuk' not found.");
    }
  };

  const resetBoxes = () => {
    const teepuk = document.getElementById('teepuk');
    if (teepuk) {
      teepuk.style.top = ''; // Reset style
    } else {
      console.error("Element with id 'teepuk' not found.");
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
      setIsScrolled(scrollPosition > 0);
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isScrolled) {
      moveBoxes();
    } else {
      resetBoxes();
    }
  }, [isScrolled]);

  return (
    <nav
      className="flex h-20 items-center justify-between"
      style={{ padding: '10px 15%' }}
    >
      {/* Scroll */}
      <div className="w-[503px]">
        <Image
          src="/icon/PantipLogo.png"
          alt="Pantip Logo"
          width={100}
          height={52}
          className="logo"
        />
      </div>
      <div className="flex h-12 w-full items-center justify-center">
        <div className="teepuk flex gap-4" id="teepuk">
          <div className="flex h-11 w-16 items-center justify-center gap-2.5">
            <Image
              src="https://pantip.com/static/images/pantip_icon/ic-pt_communities-outline-512px.png"
              alt=""
              width={24}
              height={24}
              style={{
                filter:
                  'brightness(0) saturate(100%) invert(0%) sepia(2%) saturate(7454%) hue-rotate(60deg) brightness(109%) contrast(95%)',
              }}
            />
            <span className="hover-color-change">ตั้งกระทู้</span>
          </div>
          <div className="w-30 flex h-11 items-center justify-center gap-2.5">
            <Image
              src="https://pantip.com/static/images/pantip_icon/ic-pt_communities-outline-512px.png"
              alt="Community Icon"
              width={24}
              height={24}
              style={{
                filter:
                  'brightness(0) saturate(100%) invert(0%) sepia(2%) saturate(7454%) hue-rotate(60deg) brightness(109%) contrast(95%)',
              }}
            />
            <span>คอมมูนิตี้</span>
          </div>
        </div>
      </div>
      <div className="flex w-[503px] items-center justify-end">
        <div className="w-38 flex h-10 items-center justify-center">
          {/* Iconmessege */}
          <Image
            src="/icon/messeage/comment.png"
            alt="Comments"
            width={16}
            height={16}
            className="world-icon"
          />
        </div>
        <div className="flex size-10 items-center justify-center">
          <div>
            {/* Icon Bell */}
            <Image
              src="/icon/messeage/bell.png"
              alt="Notification Bell"
              width={16}
              height={16}
              className="world-icon"
            />
          </div>
        </div>

        <div className="boxing">
          <div>
            <Image
              src="/line/menu.png"
              alt="Menu"
              width={16} // Set width
              height={16} // Set height
              className="user-pic"
              onClick={togglemenu} // Attach togglemenu function to onClick event
            />
          </div>

          <div>
            <Image
              src="/icon/profile-user.png"
              className="user-pic"
              onClick={togglemenu} // Attach togglemenu function to onClick event
              alt=""
              width={16} // Set width
              height={16} // Set height
            />
          </div>
        </div>
      </div>
      <div className="sub-menu-wrap " id="subMenu">
        <div className="sub-menu">
          <div className="bordercuser">
            <div>
              <p>ลงทะเบียน</p>
            </div>
          </div>

          <div className="bordercuser">
            <div>
              <p>เข้าสู่ระบบ</p>
            </div>
          </div>

          <hr />

          <div className="bordercuser">
            <Image
              src="/icon/messeage/comment.png"
              alt="Comments"
              width={16}
              height={16}
              className="world-icon"
            />
            <div style={{ marginLeft: '8px' }}>
              <p>แลกพอยต์</p>
            </div>
          </div>

          <div className="bordercuser">
            <Image
              src="/icon/patip/ic-stars-black-outline_512px.png"
              alt="Star Icon"
              width={20}
              height={20}
              className="coloricon"
            />
            <div style={{ marginLeft: '8px' }}>
              <p>กิจกรรมพันธิป</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
