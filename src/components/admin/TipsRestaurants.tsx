import { useState } from 'react';
import { instance } from 'api/instance'; // Axios 인스턴스 import

export default function TipsRestaurants() {
  const [photo, setPhoto] = useState<File | null>(null);

  // 제출 함수
  const handleSubmit = () => {
    const formData = new FormData();

    // 텍스트 데이터 추가
    formData.append('name', 'Gonzaga Plaza');
    formData.append('short_intro', 'variety of food in buffet style');
    formData.append(
      'google_map_link',
      'https://www.google.com/maps/place/%EB%AF%B8%EB%B6%84%EB%8B%B9+%EC%8B%A0%EC%B4%8C%EB%B3%B8%EC%A0%90/data=!4m6!3m5!1s0x357c98945223bab5:0x3b573ef273d68b85!8m2!3d37.5566641!4d126.9352292!16s%2Fg%2F11bzscl43j?entry=ttu&g_ep=EgoyMDI0MTEyNC4xIKXMDSoASAFQAw%3D%3D'
    );
    formData.append(
      'naver_map_link',
      'https://map.naver.com/p/search/%EB%AF%B8%EB%B6%84%EB%8B%B9/place/38301992?c=15.00,0,0,0,dh'
    );
    formData.append('location', 'SINCHON');

    // 파일이 존재하면 photo 필드에 추가
    if (photo) {
      formData.append('photo', photo);
    }

    // 서버로 데이터 전송
    const postList = async () => {
      try {
        const response = await instance.post(
          '/tips/tips-restaurants',
          { formData },
          {
            headers: {
              'Content-Type': 'multipart/form-data' // axios는 자동으로 설정하지만, 명시적으로 설정할 수도 있음
            }
          }
        );
        console.log(response.data); // 응답 데이터 출력
      } catch (e) {
        console.error(e); // 오류 출력
      }
    };

    postList();
  };

  // 파일 선택 시 실행되는 함수
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();

    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      console.log(e.target.files[0]); // 파일이 제대로 선택되었는지 확인
      setPhoto(selectedFile);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
