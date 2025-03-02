import './Slider.css';
import './cuserlink.css';
import './buttoncolor.css';

import { useRouter } from 'next/navigation';
import React from 'react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';

import { fetchIcons } from '@/features/IconReducer';
import type { AppDispatch, RootState } from '@/store/store';

const ReactCardSlider = () => {
  const [isAtStart, setIsAtStart] = React.useState(true);
  const [isAtEnd, setIsAtEnd] = React.useState(false);
  const [activeIndex, setActiveIndex] = React.useState<number | null>(null);

  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const { data: icons, status } = useSelector(
    (state: RootState) => state.icons,
  );

  const checkScrollPosition = () => {
    const slider = document.getElementById('slider');
    const sliderContainer = document.querySelector('.sliecolor');

    if (slider && sliderContainer) {
      const isEnd =
        slider.scrollLeft + slider.clientWidth >= slider.scrollWidth;
      setIsAtEnd(isEnd);
      setIsAtStart(slider.scrollLeft === 0);

      sliderContainer.classList.toggle('hidden-right', isEnd);
      sliderContainer.classList.toggle('hidden-left', slider.scrollLeft === 0);
    }
  };

  React.useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchIcons());
    }
  }, [dispatch, status]);

  React.useEffect(() => {
    if (status === 'succeeded' && icons.length > 0) {
      checkScrollPosition();
      const path = window.location.pathname;
      const tag = path.split('/tag/')[1];
      const index = icons.findIndex((icon) => icon.text_eng === tag);
      if (index !== -1) {
        setActiveIndex(index);
      }
    }
  }, [status, icons]);

  const slideLeft = () => {
    const slider = document.getElementById('slider');
    if (slider) {
      slider.scrollLeft -= 500;
      setTimeout(checkScrollPosition, 300);
    }
  };

  const slideRight = () => {
    const slider = document.getElementById('slider');
    if (slider) {
      slider.scrollLeft += 500;
      setTimeout(checkScrollPosition, 300);
    }
  };

  React.useEffect(() => {
    const slider = document.getElementById('slider');
    if (slider) {
      slider.addEventListener('scroll', checkScrollPosition);
      checkScrollPosition(); // Initial check

      return () => {
        slider.removeEventListener('scroll', checkScrollPosition);
      };
    }

    return undefined;
  }, []);

  const handleClick = (index: number) => {
    setActiveIndex(index);
    const textEng = icons[index]?.text_eng;
    if (textEng) {
      const url = `/tag/${encodeURIComponent(textEng)}`;
      router.push(url);
    }
  };

  return (
    <div id="main-slider-container">
      {!isAtStart && (
        <div>
          <MdChevronLeft
            size={40}
            className="slider-icon left"
            onClick={slideLeft}
          />
        </div>
      )}

      <div className="sliecolor" id="slider">
        {status === 'succeeded' && icons.length > 0 ? (
          icons.map((icon, index) => (
            <button
              type="button"
              key={icon.id}
              className={`slider-card ${index === activeIndex ? 'active' : ''}`}
              onClick={() => handleClick(index)}
            >
              <div
                className="slider-card-image"
                style={{
                  backgroundImage: `url(${icon.background_image_url})`,
                  backgroundSize: 'cover',
                }}
              />
              <p className="slider-card-title">{icon.text_eng}</p>
            </button>
          ))
        ) : (
          <p>No icons available</p>
        )}
      </div>

      {!isAtEnd && (
        <div>
          <MdChevronRight
            size={40}
            className="slider-icon right"
            onClick={slideRight}
          />
        </div>
      )}
    </div>
  );
};

export default ReactCardSlider;
