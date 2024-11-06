import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import SearchBar from './SearchBar';
import WorldMap from './WorldMap';
import * as d3 from 'd3-geo';
import { countries } from 'constants/countries';

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

  // 나라 클릭했을 때, 색 변하게 하기 위한 변수
  const [selectedCountry, setSelectedCountry] = useState<SVGPathElement | null>(
    null
  );

  // 검색바에서 사용하는 변수
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

  const onSelectedCountry: EventListener = (event) => {
    //event.stopPropagation();
    const target = event.currentTarget as SVGPathElement;
    const countryName = target.getAttribute('title');

    if (countryName) {
      setSelectedCountryName(countryName);
    }

    target.style.fill = 'orange';
    setSelectedCountry(target);
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
    console.log('here i am');
    console.log(target);

    // mapBoxRef가 현재 MapContainer를 가리키고 있는지 확인
    if (
      (mapBoxRef.current && target === mapBoxRef.current) ||
      (svgRef.current && target instanceof SVGSVGElement)
    ) {
      resetTransform();
    }
  };

  useEffect(() => {
    if (selectedCountry) {
      if (mapBoxRef.current && svgRef.current) {
        const mapBoxRect = mapBoxRef.current.getBoundingClientRect();
        const svgRect = svgRef.current.getBoundingClientRect();
        const projection = d3
          .geoMercator()
          .scale(100)
          .translate([svgRect.width / 2 + 200, svgRect.height / 2 + 200]);

        const countryData = countries.find(
          (country) => country.name === selectedCountryName
        );

        if (countryData) {
          const projectedCoordinates = projection([
            countryData.longitude,
            countryData.latitude
          ]);

          if (projectedCoordinates) {
            const [x, y] = projectedCoordinates;
            const translateX = mapBoxRect.width / 2 - x;
            const translateY = mapBoxRect.height / 2 - y;
            setTransform(
              `scale(1) translate(${translateX}px, ${translateY}px)`
            );
          }
        }
      }
    }
  }, [selectedCountry]);

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll('.country');
    paths?.forEach((path) => {
      path.addEventListener('mouseenter', handleMouseEnter);
      path.addEventListener('mousemove', handleMouseMove);
      path.addEventListener('mouseleave', handleMouseLeave);
      path.addEventListener('click', onSelectedCountry);
    });

    return () => {
      paths?.forEach((path) => {
        path.removeEventListener('mouseenter', handleMouseEnter);
        path.removeEventListener('mousemove', handleMouseMove);
        path.removeEventListener('mouseleave', handleMouseLeave);
        path.removeEventListener('click', onSelectedCountry);
      });
    };
  }, []);

  return (
    <MapContainer ref={mapBoxRef} onClick={handleMapBoxClick}>
      <WorldMap
        svgRef={svgRef}
        transform={transform}
        hoveredCountry={hoveredCountry}
        tooltipPosition={tooltipPosition}
      ></WorldMap>

      <SearchBar
        svgRef={svgRef}
        mapBoxRef={mapBoxRef}
        selectedCountryName={selectedCountryName}
        setSelectedCountryName={setSelectedCountryName}
        setTransform={setTransform}
        setSelectedCountry={setSelectedCountry}
      ></SearchBar>
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