import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import WorldMap from './WorldMap';
import * as d3 from 'd3-geo';
import { countries } from 'constants/countries';
import Search from './Search';
import { User } from 'types/user';

export default function MapBox() {
  const [showUserList, setShowUserList] = useState<boolean>(false);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [transform, setTransform] = useState<string>(
    'scale(1) translate(0, 0)'
  );
  const [selectedCountry, setSelectedCountry] = useState<SVGPathElement | null>(
    null
  );
  const beforeSelectedCountryRef = useRef<SVGPathElement | null>(null);

  const [selectedCountryName, setSelectedCountryName] = useState<string | null>(
    null
  );
  const [userList, setUserList] = useState<User[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

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

  const onSelectedCountry: EventListener = (event) => {
    console.log(window.innerWidth, window.innerHeight);
    const target = event.currentTarget as SVGPathElement;
    const countryName = target.getAttribute('title');

    if (countryName) {
      setSelectedCountryName(countryName);
    }
    setSelectedCountry((prev) => {
      beforeSelectedCountryRef.current = prev;
      return target;
    });
    setShowUserList(false);
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
      setSelectedCountry((prev) => {
        beforeSelectedCountryRef.current = prev;
        return null;
      });
    }
  };

  useEffect(() => {
    console.log(userList);
  }, [userList]);

  const handleMapBoxClick: React.MouseEventHandler<HTMLDivElement> = (
    event
  ) => {
    const target = event.target as HTMLElement;

    // mapBoxRef가 현재 MapContainer를 가리키고 있는지 확인
    if (
      (mapBoxRef.current && target === mapBoxRef.current) ||
      (svgRef.current && target instanceof SVGSVGElement)
    ) {
      resetTransform();
      setShowUserList(false);
    }
  };

  useEffect(() => {
    if (selectedCountry) {
      if (mapBoxRef.current && svgRef.current) {
        const mapBoxRect = mapBoxRef.current.getBoundingClientRect();
        const svgRect = svgRef.current.getBoundingClientRect();

        const countryData = countries.find(
          (country) => country.name === selectedCountryName
        );

        const countryPath = svgRef.current.querySelector(
          `.country[title="${selectedCountryName}"]`
        ) as SVGPathElement;

        if (countryPath) {
          countryPath.style.fill = 'var(--secondary-color)';
          setSelectedCountry(countryPath);
        }

        const projection = d3
          .geoMercator()
          .scale(window.innerWidth / 11)
          .translate([svgRect.width / 2, svgRect.height / 2]);
        // 이 위에 150이랑 200 svgRect 비율로 따져서 바꾸기
        console.log(svgRect.width, svgRect.height);

        const projectionScaled = d3
          .geoMercator()
          .scale(window.innerWidth / 11)
          .translate([svgRect.width / 3, svgRect.height / 3]);

        if (countryData) {
          const projectedCoordinates =
            beforeSelectedCountryRef.current === null
              ? projection([countryData.longitude, countryData.latitude])
              : projectionScaled([countryData.longitude, countryData.latitude]);

          const offsetX = window.innerWidth * 0.08;
          const offsetY = window.innerHeight * 0.01;

          const desiredX = mapBoxRect.width / 2 + offsetX;
          const desiredY = mapBoxRect.height / 2 + offsetY;

          if (projectedCoordinates) {
            const [x, y] = projectedCoordinates;
            const translateX = (desiredX - x * 1.5) / 1.5;
            const translateY = (desiredY - y * 1.5) / 1.5;
            setTransform(
              `scale(1.5) translate(${translateX}px, ${translateY}px)`
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

      <Search
        beforeSelectedCountryRef={beforeSelectedCountryRef}
        svgRef={svgRef}
        mapBoxRef={mapBoxRef}
        selectedCountryName={selectedCountryName}
        setSelectedCountryName={setSelectedCountryName}
        showUserList={showUserList}
        setSelectedCountry={setSelectedCountry}
        setShowUserList={setShowUserList}
        userList={userList}
        setUserList={setUserList}
        loading={loading}
        setLoading={setLoading}
      ></Search>
    </MapContainer>
  );
}

const MapContainer = styled.div`
  width: 100%;
  position: relative;
  height: 100%;
  padding-top: calc(200 / 400 * 100%);
  > span {
    pointer-events: none;
    opacity: 0.3;

    @media screen and (min-width: 768px) {
      display: inline-block;
      pointer-events: auto;
      opacity: 1;
    }
  }
`;
