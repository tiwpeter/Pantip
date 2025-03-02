'use client';

import React from 'react';

const DetailAnuo = () => {
  const data = [
    {
      id: 1,
      url: 'https://ptcdn.info/doodle/2024/66668549caac0a7c9b16ead7_8t0jwfcpbp.png',
      name: '[Pantip Point] น้องเพี้ยนชวนแชร์ภาพไอเทมรับหน้าฝน ที่ต้องพกติดกระเป๋า! 🌧️💧☂️',
    },
    {
      id: 2,
      url: 'https://ptcdn.info/home_highlight/2022-10/633b8e4a00d01f12500f33e6_hvzb60o1p0_400.jpg',
      name: 'ต้อนรับฟุตบอลยูโร 2024 ด้วย “เกมบอล”',
    },
    {
      id: 3,
      url: 'https://ptcdn.info/home_highlight/2024-07/668646c5caac0af78631fad8_1osl902uzv_400.png',
      name: '🎧 PANTIP PODCAST 🎧 3 อันดับกระทู้ฮิตบนพันทิปประจำวัน 📊',
    },
    {
      id: 4,
      url: 'https://f.ptcdn.info/770/084/000/lyekkvfciohloZSbA1b-s.jpg',
      name: 'ชวนโชว์พื้นที่นั่งเล่นในบ้าน ลุ้นรับ pantip point 50 คะแนน 🌿🪑',
    },
    { id: 5, url: 'https://example.com/image5.jpg', name: 'Image 5' },
    { id: 6, url: 'https://example.com/image6.jpg', name: 'Image 6' },
    { id: 7, url: 'https://example.com/image7.jpg', name: 'Image 7' },
    { id: 8, url: 'https://example.com/image8.jpg', name: 'Image 8' },
    { id: 9, url: 'https://example.com/image9.jpg', name: 'Image 9' },
  ];

  return (
    <section
      className="dw container mx-auto"
      style={{ background: 'aliceblue', overflow: 'hidden', width: '1112px' }}
    >
      <table className="w-full table-auto border-collapse border border-black">
        <tbody>
          <tr style={{ display: 'grid' }}>
            {data.map((item) => (
              <td
                key={item.id}
                className="boxslie border p-2"
                style={{
                  height: '45px',
                }}
              >
                <div className="flex">
                  <span>{item.name}</span>
                </div>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default DetailAnuo;
