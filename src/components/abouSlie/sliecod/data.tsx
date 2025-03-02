'use client';

import React from 'react';

import Slidersecod from './Slidersecod';

const SecodSlie = () => {
  const datasli = [
    {
      id: 1,
      image:
        'https://ptcdn.info/home_highlight/2024-08/66ab0f05caac0a8b331e8faa_bw046w5xka_400.png',
      name: '[Pantip Point] ชวนแชร์เรื่องราวประทับใจของสัตว์เลี้ยงแสนรัก 🐶🐱❤️ ',
      link: 'https://pantip.com/s/tkQmv',
    },
    {
      id: 2,
      image:
        'https://ptcdn.info/home_highlight/2022-10/633b8e4a00d01f12500f33e6_hvzb60o1p0_400.jpg',
      name: 'ก้นครัว',
      link: '/room/',
    },
    {
      id: 3,
      image:
        'https://ptcdn.info/home_highlight/2024-07/668646c5caac0af78631fad8_1osl902uzv_400.png',
      name: 'ก้นครัว ',
      link: '#',
    },
    {
      id: 4,
      image: 'https://f.ptcdn.info/770/084/000/lyekkvfciohloZSbA1b-s.jpg',
      name: 'ก้นครัว',
      link: '#',
    },
    {
      id: 5,
      image:
        'https://ptcdn.info/home_highlight/2022-10/633b8e4a00d01f12500f33e6_hvzb60o1p0_400.jpg',
      name: 'wd',
      link: '/room/',
    },
  ];

  return (
    <div
      style={{ flexDirection: 'column', display: 'flex', alignItems: 'center' }}
    >
      <div
        className="mt-3"
        style={{
          background: '#7f99ff',
          display: 'flex',
          minHeight: '43px',
          padding: '12px 16px',
          position: 'relative',
          whiteSpace: 'normal',
          width: '1078px',
        }}
      >
        <h3>Highlight</h3>
      </div>
      <Slidersecod slides={datasli} />
    </div>
  );
};

export default SecodSlie;
