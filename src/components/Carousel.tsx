import { useState } from 'react';
import styled from 'styled-components';
import { images } from '@/lib/constants';

interface CarouselDotProps {
  $isActive: boolean;
}

const Carousel = () => {
  const [activeImage, setActiveImage] = useState(0);

  const PrevImage = () => {
    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const NextImage = () => {
    setActiveImage((prev) => (prev + 1) % images.length);
  };

  return (
    <>
      <CarouselContainer>
        <CarouselSlides>
          {images.map((image, index) => (
            <div key={index}>
              <StyledInput
                type="radio"
                name="radio-btn"
                id={`img-${index + 1}`}
                checked={activeImage === index}
                readOnly
              />
              <CarouselSlideItem>
                <CarouselSlideImage>
                  <img src={image} alt={`scenery ${index + 1}`} />
                </CarouselSlideImage>
                <CarouselControls>
                  <CarouselPrev onClick={PrevImage}>
                    <span>&lsaquo;</span>
                  </CarouselPrev>
                  <CarouselNext onClick={NextImage}>
                    <span>&rsaquo;</span>
                  </CarouselNext>
                </CarouselControls>
              </CarouselSlideItem>
            </div>
          ))}
          <CarouselDots>
            {images.map((_, index) => (
              <CarouselDot
                key={index}
                onClick={() => setActiveImage(index)}
                id={`img-dot-${index + 1}`}
                $isActive={activeImage === index}
              ></CarouselDot>
            ))}
          </CarouselDots>
        </CarouselSlides>
      </CarouselContainer>
    </>
  );
};

const CarouselContainer = styled.div`
  margin: 0 auto;
  max-width: 980px;
  margin-top: 36px;
`;

const CarouselSlides = styled.ul`
  display: block;
  position: relative;
  height: 400px;
  margin: 0;
  padding: 0;
  overflow: hidden;
  list-style: none;

  * {
    user-select: none;
    -ms-user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
  }

  input {
    display: none;
  }
`;

const CarouselSlideItem = styled.li`
  display: block;
`;

const CarouselSlideImage = styled.div`
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  opacity: 0;
  transition: all 0.7s ease-in-out;

  img {
    width: auto;
    min-width: 100%;
    height: 100%;
  }
`;

const CarouselControls = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  font-size: 100px;
  line-height: 400px;
  color: #fff;

  label {
    display: none;
    position: absolute;
    padding: 0 20px;
    opacity: 0;
    transition: opacity 0.2s;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }

  ${CarouselSlideImage}:hover + & label {
    opacity: 0.5;
  }
`;

const CarouselPrev = styled.label`
  width: 49%;
  text-align: left;
  left: 0;
`;

const CarouselNext = styled.label`
  width: 49%;
  text-align: right;
  right: 0;
`;

const CarouselDots = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 20px;
  z-index: 999;
  text-align: center;
`;

const CarouselDot = styled.label<CarouselDotProps>`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #fff;
  opacity: ${(props) => (props.$isActive ? 1 : 0.5)};
  margin: 10px;
`;

const StyledInput = styled.input`
  &:checked + ${CarouselSlideItem} ${CarouselSlideImage} {
    opacity: 1;
    transform: scale(1);
    transition: opacity 1s ease-in-out;
  }

  &:checked + ${CarouselSlideItem} ${CarouselControls} label {
    display: block;
  }
`;

export default Carousel;
