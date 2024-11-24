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
      { name: 'Restaurants', link: '/tips-for-sogang?category=restaurants' },
      { name: 'Sogang Map', link: '/tips-for-sogang?category=sogang-map' }
    ],
    ownLink: '/tips-for-sogang'
  },
  {
    parent: 'Menu',
    child: [
      { name: 'Restaurants', link: '/menu/restaurants' },
      { name: 'Markets', link: '/menu/markets' },
      { name: 'Generel Discussion', link: '/menu/general-discussion' }
    ],
    ownLink: ''
  }
];
