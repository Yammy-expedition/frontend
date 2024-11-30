import { useRef, useState } from 'react';
import { instance } from 'api/instance'; // Axios 인스턴스 import

export default function TipsRestaurants() {
  const post = async () => {
    const dataToSend = {
      name: 'Gonzaga Plaza',
      short_intro: 'variety of food in buffet style',
      google_map_link: 'https://url.kr/rbsonr',
      naver_map_link:
        'https://map.naver.com/p/search/%EB%AF%B8%EB%B6%84%EB%8B%B9/place/38301992?c=15.00,0,0,0,dh',
      location: 'SINCHON'
    };

    try {
      const response = await instance.post(
        '/tips/tips-restaurants',
        dataToSend
      );

      if (response.status === 201) {
        console.log(response.data);
        return response.data;
      }
    } catch (err) {
      console.log('Error Occured');
      console.log(err);
    }
  };

  return (
    <div>
      <input
        accept="image/*"
        type="file"
        // onChange={handleFileChange}
      />
      <button onClick={() => post()}>Submit</button>
    </div>
  );
}
