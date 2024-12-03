import { useEffect, useState } from 'react';
import styled from 'styled-components';
import MapModal from './MapModal';
import { buildings } from 'constants/buildings';
import { instance } from 'api/instance';
import { useSearchParams } from 'react-router-dom';

export type BuildsDataType = {
  id: number;
  kor_name: string;
  eng_name: string;
  lat: number;
  lon: number;
  entrance: string;
  departments: string;
  studying_spots: {
    id: number;
    name: string;
    location: string;
    open_hours: string;
    tags: { id: number; name: string }[];
    photo: string | null;
    building: number;
  }[];
  cafeterias: {
    id: number;
    name: string;
    location: string;
    open_hours: string;
    tags: { id: number; name: string }[];
    photo: string;
    building: number;
  }[];
};

interface KakaoMapProps {
  modalOpen: boolean;
  setModalOpen: (value: boolean) => void;
}

export default function KakaoMap({ modalOpen, setModalOpen }: KakaoMapProps) {
  const [initLatLon, setInitLatLon] = useState({
    lat: 37.551086,
    lon: 126.940983
  });
  const [mapLevel, setMapLevel] = useState(3);
  const [buildingsData, setBuildingsData] = useState<BuildsDataType[]>([]);
  const [selectedBuildingData, setSelectedBuildingData] =
    useState<BuildsDataType | null>(null);
  const [studyList, setStudyList] = useState<BuildsDataType[]>([]);
  const [cafeList, setCafeList] = useState<BuildsDataType[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    // 건물 데이터 가져오기
    const getBuildings = async () => {
      const response = await instance.get('tips/map-building');
      setBuildingsData(buildings);
      setStudyList(
        buildings.filter((building) => building.studying_spots.length > 0)
      );
      setCafeList(
        buildings.filter((building) => building.cafeterias.length > 0)
      );
    };
    getBuildings();

    const handleSelectBuildingData = (id: number) => {
      const selectedData = buildingsData.find((data) => data.id === id);
      if (selectedData) {
        setSelectedBuildingData(selectedData);
      }
    };

    const mapLoad = () => {
      if (window.kakao && window.kakao.maps) {
        const mapContainer = document.getElementById('map');
        const mapOption = {
          //맵의 첫 화면을 설정
          center: new window.kakao.maps.LatLng(initLatLon.lat, initLatLon.lon),
          level: mapLevel
          // mapTypeId: window.kakao.maps.MapTypeId.HYBRID
        };

        // 마커 이미지 관련 설정
        const map = new window.kakao.maps.Map(mapContainer, mapOption);
        map.jump(mapOption.center, 3, { animate: true });
        const control = new window.kakao.maps.ZoomControl();
        map.addControl(control, window.kakao.maps.ControlPosition.BOTTOMLEFT);
        const markerImageUrl = 'https://i.imgur.com/MSdL2Dv.png',
          studyMarkerImageUrl = 'https://i.imgur.com/GRFcolW.png',
          cafeMarkerImageUrl = 'https://i.imgur.com/rSLbVUW.png';

        // 마커 생성 함수
        const handleMarker = (url: string, datas: BuildsDataType[]) => {
          const markerImageUrl = url,
            markerImageSize = new window.kakao.maps.Size(30, 30), // 마커 이미지의 크기
            markerImageOptions = {
              offset: new window.kakao.maps.Point(15, 15) // 마커 좌표에 일치시킬 이미지 안의 좌표
            };

          // 마커 이미지를 생성한다
          const markerImage = new window.kakao.maps.MarkerImage(
            markerImageUrl,
            markerImageSize,
            markerImageOptions
          );

          // 마커 생성 및 표시
          datas.forEach(({ id, eng_name, lat, lon }) => {
            // 마커 생성
            const marker = new window.kakao.maps.Marker({
              position: new window.kakao.maps.LatLng(lat, lon),
              map,
              image: markerImage,
              title: eng_name
            });

            // 마커 클릭 이벤트 추가
            window.kakao.maps.event.addListener(marker, 'click', () => {
              const moveLatLng = new window.kakao.maps.LatLng(lat, lon);
              map.jump(moveLatLng, 1, { animate: true });
              setModalOpen(true);
              handleSelectBuildingData(id);
            });
          });
        };

        if (searchParams.has('spot')) {
          if (searchParams.get('spot') === 'study') {
            handleMarker(studyMarkerImageUrl, studyList);
          } else if (searchParams.get('spot') === 'cafe') {
            handleMarker(cafeMarkerImageUrl, cafeList);
          } else if (searchParams.get('spot') === 'all') {
            handleMarker(markerImageUrl, buildingsData);
          }
        } else {
          handleMarker(markerImageUrl, buildingsData);
        }
      }
    };

    if (typeof window !== 'undefined' && window.kakao) {
      mapLoad();
    }
  }, [buildingsData, initLatLon, mapLevel, searchParams]);

  return (
    <MapSection>
      <MapDiv id="map"></MapDiv>
      <MapModal
        selectedBuildingData={selectedBuildingData}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
      />
    </MapSection>
  );
}

const MapSection = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;

const MapDiv = styled.div`
  width: 100%;
  height: 100%;
`;
