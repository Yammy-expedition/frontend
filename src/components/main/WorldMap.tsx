import React from 'react';
import { ReactComponent as WorldSVG } from '../../assets/icon/world.svg';
import styled from 'styled-components';

interface WorldMapProps {
  svgRef: React.RefObject<SVGSVGElement>;
  transform: string;
  hoveredCountry: string | null;
  tooltipPosition: {
    x: number;
    y: number;
  } | null;
}

export default function WorldMap({
  svgRef,
  transform,
  hoveredCountry,
  tooltipPosition
}: WorldMapProps) {
  return (
    <>
      <StyledWorldSVG ref={svgRef} style={{ transform }} />
      {hoveredCountry && tooltipPosition && (
        <Tooltip
          style={{ top: tooltipPosition.y - 1, left: tooltipPosition.x }}
        >
          {hoveredCountry}
        </Tooltip>
      )}
    </>
  );
}

const StyledWorldSVG = styled(WorldSVG)`
  padding: 3rem;
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