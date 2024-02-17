import { useEffect, useState } from 'react';
import Game from '../models/Game';
import "./Card.css";

interface CardProps {
    game: Game;
  }
  
  const Card: React.FC<CardProps> = ({ game }) => {
    return (
      <div className="card">
        <div className="img">
          <img
            className="img"
            src={"http://localhost:1337"+game.attributes.cover_image.data.attributes.url}
            alt={game.attributes.name}
          />
        </div>
        <div className="text">
          <p className="h3">{game.attributes.name}</p>
          <p className="p">{game.attributes.description}</p>
          <div className="icon-box">
            <p className="span">กดเพื่อซื้อ</p>
          </div>
        </div>
      </div>
    );
  }
  
  export default Card;
