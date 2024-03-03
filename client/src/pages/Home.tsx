// ในไฟล์ Home.tsx
import React, { useEffect, useState } from 'react';
import Game from '../models/Game';
import Navbar from '../components/Navbar';
import Card from '../components/Card';
import "./Home.css"
import conf from '../conf';


function Home() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch(`${conf.apiPrefix}/api/games?populate=cover_image`)
      .then(response => response.json())
      .then(data => setGames(data.data))
      .catch(error => console.error('Error fetching games:', error));
  }, []);

  return (
    <header>
      <Navbar />
      <div className="home-container">
        {games.map(game => (
          <Card key={game.id} game={game} />
        ))}
      </div>
    </header>
  );
}

export default Home;
