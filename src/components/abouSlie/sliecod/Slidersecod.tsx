import './Slidersecod.css';
import './cuserlink.css';
import './buttoncolor.css';
import './fontSecod.css';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

// Define the type for each slide
interface Slide {
  id: number;
  image: string;
  name: string;
  link: string;
}

// Define the type for props
interface SlidersecodProps {
  slides: Slide[];
}

const Slidersecod: React.FC<SlidersecodProps> = (props) => {
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null); // State for active card
  const sliderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const slider = sliderRef.current;

    const checkScrollPosition = () => {
      if (slider) {
        setIsAtStart(slider.scrollLeft === 0);
        setIsAtEnd(
          slider.scrollLeft + slider.clientWidth >= slider.scrollWidth,
        );
      }
    };

    if (slider) {
      slider.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition(); // Initial check
      return () => slider.removeEventListener('scroll', checkScrollPosition);
    }

    // Return undefined if no cleanup is needed
    return undefined;
  }, []);

  const slideLeftsecod = () => {
    const slider = sliderRef.current;
    if (slider) {
      slider.scrollLeft -= 500;
    }
  };

  const slideRightsecod = () => {
    const slider = sliderRef.current;
    if (slider) {
      slider.scrollLeft += 500;
    }
  };

  const handleClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div
      className="CopSecod"
      style={{
        margin: '0 222px',
        overflow: 'hidden',
        width: 'calc(100% - 497px)',
        border: '1px solid #000', // กำหนดกรอบเป็นเส้นดำขนาด 1px
        background: 'aliceblue',
      }}
    >
      <div id="main-slider-Secod">
        {!isAtStart && (
          <div>
            <MdChevronLeft
              size={40}
              className="slider-icon-secod left"
              onClick={slideLeftsecod}
            />
          </div>
        )}
        <div className="sliecolor" id="slider-secod" ref={sliderRef}>
          {props.slides.map((slide, index) => (
            <Link href={slide.link} key={slide.id} legacyBehavior>
              <button
                type="button" // เพิ่ม type ที่นี่
                className={`slider-card-secod ${activeIndex === index ? 'active' : ''}`}
                onClick={() => handleClick(index)}
              >
                <div
                  className="slider-card-image-secod"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    backgroundSize: 'cover',
                  }}
                />
                <p className="fontSecod">{slide.name}</p>
              </button>
            </Link>
          ))}
        </div>
        {!isAtEnd && (
          <div>
            <MdChevronRight
              size={40}
              className="slider-icon-secod right"
              onClick={slideRightsecod}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Slidersecod;
