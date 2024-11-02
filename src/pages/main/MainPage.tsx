import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

import TitleBox from 'components/main/TitleBox';
import MenuGroup from 'components/main/MenuGroup';
import Footer from 'components/main/Footer';
import { ReactComponent as WorldSVG } from '../../assets/icon/world.svg';

export default function MainPage() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const mapBoxRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll('.country');
    paths?.forEach((path) => {
      path.addEventListener('mouseenter', handleMouseEnter);
      path.addEventListener('mousemove', handleMouseMove);
      path.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      paths?.forEach((path) => {
        path.removeEventListener('mouseenter', handleMouseEnter);
        path.removeEventListener('mousemove', handleMouseMove);
        path.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <MainPageComponent>
      <SideBar>
        <div>
          <TitleBox />
          <MenuGroup />
        </div>
        <Footer />
      </SideBar>
      <MapBox ref={mapBoxRef}>
        <StyledWorldSVG ref={svgRef} />
        {hoveredCountry && tooltipPosition && (
          <Tooltip
            style={{ top: tooltipPosition.y - 1, left: tooltipPosition.x }}
          >
            {hoveredCountry}
          </Tooltip>
        )}
      </MapBox>
    </MainPageComponent>
  );
}

const MainPageComponent = styled.div`
  display: flex;
  height: 100%;
`;

const SideBar = styled.div`
  z-index: 10;
  min-width: 38.4rem;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0.5rem 0 1rem rgba(0, 0, 0, 0.1);
`;

const MapBox = styled.div`
  background: #f3f3f3;
  width: 72.5%;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const StyledWorldSVG = styled(WorldSVG)`
  padding: 3rem;
  width: 100%;
  height: auto;

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
