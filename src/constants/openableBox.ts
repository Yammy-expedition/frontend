export const openableBoxList = [
  {
    parent: 'Home',
    child: [],
    ownLink: '/'
  },
  {
    parent: 'What is Unicon',
    child: [],
    ownLink: ''
  },
  {
    parent: 'Tips for Sogang Life',
    child: [
      { name: 'Restaurants', link: '/tips-for-sogang/restaurants' },
      { name: 'Sogang Map', link: '/tips-for-sogang/sogang-map' }
    ],
    ownLink: '/tips-for-sogang'
  },
  {
    parent: 'Menu',
    child: [
      { name: 'Restaurants', link: '/menu/restaurant' },
      { name: 'Markets', link: '/menu/market' },
      { name: 'Generel Discussion', link: '/menu/general' }
    ],
    ownLink: ''
  }
];
