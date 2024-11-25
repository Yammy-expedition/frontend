import { useEffect } from 'react';
import styled from 'styled-components';
import MapModal from './MapModal';

const buildings = [
  { name: '정하상관', lat: 37.550452, lon: 126.94295 },
  { name: '로욜라 도서관', lat: 37.551666, lon: 126.94174 },
  { name: '김대건관', lat: 37.550119, lon: 126.939886 }
];

export default function KakaoMap() {
  useEffect(() => {
    const mapLoad = () => {
      if (window.kakao && window.kakao.maps) {
        const mapContainer = document.getElementById('map');
        const mapOption = {
          center: new window.kakao.maps.LatLng(37.551086, 126.940983),
          level: 3,
          mapTypeId: window.kakao.maps.MapTypeId.HYBRID
        };

        const map = new window.kakao.maps.Map(mapContainer, mapOption);
        const markerImageUrl = 'https://i.imgur.com/JfBB7fC.png',
          markerImageSize = new window.kakao.maps.Size(45, 60), // 마커 이미지의 크기
          markerImageOptions = {
            offset: new window.kakao.maps.Point(13, 35) // 마커 좌표에 일치시킬 이미지 안의 좌표
          };

        // 마커 이미지를 생성한다
        const markerImage = new window.kakao.maps.MarkerImage(
          markerImageUrl,
          markerImageSize,
          markerImageOptions
        );
        // 마커 생성 및 표시
        buildings.forEach(({ name, lat, lon }) => {
          const marker = new window.kakao.maps.Marker({
            position: new window.kakao.maps.LatLng(lat, lon),
            map,
            image: markerImage
          });

          const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div style="padding:5px;">${name}</div>`
          });

          // 마커 클릭 이벤트 추가
          window.kakao.maps.event.addListener(marker, 'click', () => {
            infowindow.open(map, marker);
          });
        });
      }
    };

    if (typeof window !== 'undefined' && window.kakao) {
      mapLoad();
    }
  }, []);

  return (
    <MapSection>
      <MapDiv id="map"></MapDiv>
    </MapSection>
  );
}

const MapSection = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
`;

const MapDiv = styled.div`
  width: 100%;
  height: 90%;
`;
