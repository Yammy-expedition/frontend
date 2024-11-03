import React, { useEffect, useRef, useState } from 'react';
import { ReactComponent as WorldSVG } from '../../assets/icon/world.svg';
import { countries } from 'constants/countries';
import { majors } from 'constants/majors';
import styled from 'styled-components';

export default function MapBox() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [transform, setTransform] = useState<string>(
    'scale(1) translate(0, 0)'
  );
  const svgRef = useRef<SVGSVGElement>(null);
  const mapBoxRef = useRef<HTMLDivElement>(null);
  const [selectedCountry, setSelectedCountry] = useState<SVGPathElement | null>(
    null
  );
  const [selectedCountryName, setSelectedCountryName] = useState<string | null>(
    null
  );

  const handleMouseEnter: EventListener = (event) => {
    const target = event.currentTarget as SVGPathElement;
    const countryName = target.getAttribute('title');
    if (countryName) {
      setHoveredCountry(countryName);
    }
  };

  const handleMouseMove: EventListener = (event) => {
    const mouseEvent = event as MouseEvent;
    if (mapBoxRef.current) {
      const mapBoxRect = mapBoxRef.current.getBoundingClientRect();
      setTooltipPosition({
        x: mouseEvent.clientX - mapBoxRect.left,
        y: mouseEvent.clientY - mapBoxRect.top
      });
    }
  };

  const handleMouseLeave: EventListener = () => {
    setHoveredCountry(null);
    setTooltipPosition(null);
  };

  const onClickCountry: EventListener = (event) => {
    event.stopPropagation();
    const target = event.currentTarget as SVGPathElement;
    const countryName = target.getAttribute('title');

    if (countryName) {
      setSelectedCountryName(countryName);
    }

    target.style.fill = 'orange';
    setSelectedCountry(target);

    const mouseEvent = event as MouseEvent;
    if (mapBoxRef.current && svgRef.current) {
      const mapBoxRect = mapBoxRef.current.getBoundingClientRect();
      const svgRect = svgRef.current.getBoundingClientRect();

      const scale = 1;

      const clickX = mouseEvent.clientX / scale - svgRect.left;
      const clickY = mouseEvent.clientY / scale - svgRect.top;

      const translateX = (mapBoxRect.width / 2 - clickX - 200) / scale;
      const translateY = (mapBoxRect.height / 2 - clickY - 100) / scale;

      setTransform(
        `scale(${scale}) translate(${translateX}px, ${translateY}px)`
      );
    }
  };

  useEffect(() => {
    if (selectedCountry) {
      return () => {
        selectedCountry.style.fill = '';
      };
    }
  }, [selectedCountry]);

  const resetTransform = () => {
    setTransform('scale(1) translate(0, 0)');
    if (selectedCountry) {
      selectedCountry.style.fill = '';
      setSelectedCountry(null);
    }
  };

  const handleMapBoxClick: React.MouseEventHandler<HTMLDivElement> = (
    event
  ) => {
    const target = event.target as HTMLElement;

    if (!target.classList.contains('country')) {
      resetTransform();
    }
  };

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll('.country');
    paths?.forEach((path) => {
      path.addEventListener('mouseenter', handleMouseEnter);
      path.addEventListener('mousemove', handleMouseMove);
      path.addEventListener('mouseleave', handleMouseLeave);
      path.addEventListener('click', onClickCountry);
    });

    return () => {
      paths?.forEach((path) => {
        path.removeEventListener('mouseenter', handleMouseEnter);
        path.removeEventListener('mousemove', handleMouseMove);
        path.removeEventListener('mouseleave', handleMouseLeave);
        path.removeEventListener('click', onClickCountry);
      });
    };
  }, []);

  return (
    <MapContainer ref={mapBoxRef} onClick={handleMapBoxClick}>
      <StyledWorldSVG ref={svgRef} style={{ transform }} />
      {hoveredCountry && tooltipPosition && (
        <Tooltip
          style={{ top: tooltipPosition.y - 1, left: tooltipPosition.x }}
        >
          {hoveredCountry}
        </Tooltip>
      )}

      <SearchContainer>
        {"Let's looking for friends in Sogang!"}
        <div>
          <select
            name="countries"
            id=""
            value={selectedCountryName || ''}
            onChange={(e) => setSelectedCountryName(e.target.value)}
          >
            <option disabled hidden value="">
              Select Country
            </option>
            {countries.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select name="major" id="">
            <option disabled hidden selected>
              Select Major
            </option>
            {majors.map((item, index) => (
              <option key={index}>{item}</option>
            ))}
          </select>
          <SearchButton>Search</SearchButton>
        </div>
      </SearchContainer>
    </MapContainer>
  );
}

const MapContainer = styled.div`
  background: #f3f3f3;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const StyledWorldSVG = styled(WorldSVG)`
  padding: 3rem;
  width: auto;
  height: auto;
  transform-origin: center;
  transition: transform 0.3s ease;

  .country {
    stroke: #ffffff;
    stroke-width: 0.5;

    &:hover {
      fill: #b2d8b2;
      cursor: pointer;
    }
  }
`;

const Tooltip = styled.div`
  position: absolute;
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  border-radius: 0.25rem;
  pointer-events: none;
  white-space: nowrap;
  font-size: 0.75rem;
  transform: translate(-50%, -100%);
`;

const SearchContainer = styled.div`
  position: absolute;
  top: 5rem;
  right: 10rem;
  font-size: 2.4rem;
  font-weight: 600;

  > div {
    margin-top: 1rem;
    > * {
      margin-left: 0.5rem;
    }

    > select {
      width: 16rem;
      height: 4.2rem;
      padding: 0.5rem;
      border-radius: 0.5rem;
    }
  }
`;

const SearchButton = styled.button`
  padding:0.75rem;
  width: 7rem;
  height: 4.2rem;
  color: white;
  font-style: italic;
  cursor:pointer;
  background-image: linear-gradient(to top, #000000, green);
  border:none;
  border-radius: 0.5rem;
};
`;
