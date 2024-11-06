import React from 'react';

const locationList = [
  'All',
  'In Sogang',
  'Main Gate',
  'Back Gate',
  'West Gate',
  'Sinchon'
];

export default function TipsForSogangPage() {
  return (
    <main>
      <header>
        <div>Tips for Sogang Life</div>
        <p>
          Tips for Sogang Life is what Unicon managements collected directly!
        </p>
      </header>
      <nav>
        <div>Restaurants</div>
        <div>Sogang Map</div>
      </nav>
      <section>
        <ul>
          {locationList.map((el, key) => (
            <li key={key}>{el}</li>
          ))}
        </ul>
        <ul>
          <li>
            <figure>
              <img src="" alt="" />
            </figure>
            <caption>
              <div>
                <h1></h1>
                <h3></h3>
              </div>
              <div>
                <img src="" alt="" />
                <img src="" alt="" />
              </div>
            </caption>
          </li>
        </ul>
      </section>
    </main>
  );
}
