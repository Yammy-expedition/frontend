export const buildings = [
  {
    id: 1,
    kor_name: '금호아시아나바오로 경영관',
    eng_name: 'PA',
    lat: 37.55221,
    lon: 126.938886,
    entrance: '1F, 2F',
    departments: 'Business Administration',
    studying_spots: [
      {
        id: 1,
        name: 'PA Study Room',
        location: '2F',
        open_hours: '6:00-22:00',
        tags: [
          { id: 1, name: 'quiet place' },
          { id: 2, name: 'natural light' }
        ],
        photo: 'https://i.imgur.com/wZF8dru.png',
        building: 1
      },
      {
        id: 2,
        name: 'PA lounge',
        location: '2F',
        open_hours: '6:00-22:00',
        tags: [
          { id: 1, name: 'quiet place' },
          { id: 2, name: 'natural light' }
        ],
        photo: 'https://i.imgur.com/wZF8dru.png',
        building: 1
      }
    ],
    cafeterias: []
  },
  {
    id: 2,
    kor_name: '마테오관',
    eng_name: 'MA',
    lat: 37.552673,
    lon: 126.939254,
    entrance: 'B1F, 1F',
    departments: 'Humanities',
    studying_spots: [
      {
        id: 2,
        name: 'MA Lounge',
        location: '1F',
        open_hours: '7:00-22:00',
        tags: [
          { id: 3, name: 'cozy' },
          { id: 4, name: 'group study' }
        ],
        photo: 'https://i.imgur.com/wZF8dru.png',
        building: 2
      }
    ],
    cafeterias: [
      {
        id: 1,
        name: 'MA Cafe',
        location: '1F',
        open_hours: '7:00-21:00',
        tags: [
          { id: 1, name: 'quiet place' },
          { id: 2, name: 'coffee' }
        ],
        photo: 'https://i.imgur.com/wZF8dru.png',
        building: 2
      }
    ]
  },
  {
    id: 3,
    kor_name: '가브리엘관',
    eng_name: 'GA',
    lat: 37.551995,
    lon: 126.939122,
    entrance: '1F, 3F',
    departments: 'Science and Technology',
    studying_spots: [],
    cafeterias: []
  },
  {
    id: 4,
    kor_name: '베르크만스 우정원',
    eng_name: 'BW',
    lat: 37.550591,
    lon: 126.939074,
    entrance: 'Outdoor',
    departments: 'None',
    studying_spots: [],
    cafeterias: []
  },
  {
    id: 5,
    kor_name: '게페르트 남덕우경제관',
    eng_name: 'GN',
    lat: 37.550435,
    lon: 126.939964,
    entrance: '1F, 2F',
    departments: 'Economics',
    studying_spots: [],
    cafeterias: []
  },
  {
    id: 6,
    kor_name: '김대건관',
    eng_name: 'K',
    lat: 37.5501065,
    lon: 126.940254,
    entrance: 'B1F, 2F, 3F',
    departments: 'All departments',
    studying_spots: [
      {
        id: 3,
        name: 'K Library',
        location: 'B1',
        open_hours: '6:00-23:00',
        tags: [
          { id: 1, name: 'quiet place' },
          { id: 2, name: 'fun place' }
        ],
        photo: 'https://i.imgur.com/wZF8dru.png',
        building: 6
      }
    ],
    cafeterias: [
      {
        id: 2,
        name: 'K Cafe',
        location: '2F',
        open_hours: '24h',
        tags: [
          { id: 1, name: 'quiet place' },
          { id: 2, name: 'fun place' }
        ],
        photo: 'https://i.imgur.com/wZF8dru.png',
        building: 6
      }
    ]
  },
  {
    id: 7,
    kor_name: '정하상관',
    eng_name: 'J',
    lat: 37.550252,
    lon: 126.94306,
    entrance: '1F, 2F',
    departments: 'Social Sciences',
    studying_spots: [
      {
        id: 4,
        name: 'J Study Room',
        location: '2F',
        open_hours: '8:00-22:00',
        tags: [
          { id: 1, name: 'quiet place' },
          { id: 5, name: 'collaborative' }
        ],
        photo: 'https://i.imgur.com/wZF8dru.png',
        building: 7
      }
    ],
    cafeterias: []
  },
  {
    id: 8,
    kor_name: '다산관',
    eng_name: 'D',
    lat: 37.552045,
    lon: 126.943364,
    entrance: '1F',
    departments: 'Engineering',
    studying_spots: [
      {
        id: 5,
        name: 'D Lounge',
        location: '1F',
        open_hours: '9:00-21:00',
        tags: [
          { id: 6, name: 'tech friendly' },
          { id: 7, name: 'modern' }
        ],
        photo: 'https://i.imgur.com/wZF8dru.png',
        building: 8
      }
    ],
    cafeterias: [
      {
        id: 3,
        name: 'D Cafe',
        location: '1F',
        open_hours: '8:00-20:00',
        tags: [
          { id: 8, name: 'coffee' },
          { id: 9, name: 'snacks' }
        ],
        photo: 'https://i.imgur.com/wZF8dru.png',
        building: 8
      }
    ]
  },
  {
    id: 9,
    kor_name: '로욜라 도서관',
    eng_name: 'Loyola',
    lat: 37.551571,
    lon: 126.94182,
    entrance: 'B1F, 1F, 2F',
    departments: 'Library',
    studying_spots: [
      {
        id: 6,
        name: 'Main Library',
        location: '1F',
        open_hours: '6:00-24:00',
        tags: [
          { id: 1, name: 'quiet place' },
          { id: 10, name: 'books available' }
        ],
        photo: 'https://i.imgur.com/wZF8dru.png',
        building: 9
      }
    ],
    cafeterias: []
  },
  {
    id: 10,
    kor_name: '엠마오관',
    eng_name: 'E',
    lat: 37.551273,
    lon: 126.940972,
    entrance: '1F',
    departments: 'Theology',
    studying_spots: [],
    cafeterias: []
  },
  {
    id: 11,
    kor_name: '곤자가 플라자',
    eng_name: 'Gonzaga',
    lat: 37.551031,
    lon: 126.94332,
    entrance: '1F, 2F',
    departments: 'All departments',
    studying_spots: [],
    cafeterias: [
      {
        id: 4,
        name: 'Gonzaga Cafe',
        location: '2F',
        open_hours: '7:00-23:00',
        tags: [
          { id: 1, name: 'quiet place' },
          { id: 11, name: 'plaza view' }
        ],
        photo: 'https://i.imgur.com/wZF8dru.png',
        building: 11
      }
    ]
  },
  {
    id: 12,
    kor_name: '아루페관',
    eng_name: 'AR',
    lat: 37.54993,
    lon: 126.938755,
    entrance: 'B1F, 1F',
    departments: 'Psychology',
    studying_spots: [],
    cafeterias: []
  }
];
