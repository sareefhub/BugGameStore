import React from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import Game from '../models/Game';
import { getUsername, getUserData } from '../helper';
import "./Card.css";

interface CardProps {
  game: Game;
}

const generateToken = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const tokenLength = 13;
  let token = '';
  for (let i = 0; i < tokenLength; i++) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return token;
};

const deductPointsAndUpdateUser = (pointsToDeduct: number, username: string) => {
  fetch('http://localhost:1337/api/users', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(users => {
    const userToUpdate = users.find((user: { username: string; }) => user.username === username);
    if (userToUpdate) {
      const updatedPoints = userToUpdate.point - pointsToDeduct;
      if (updatedPoints >= 0) {
        userToUpdate.point = updatedPoints;
        fetch(`http://localhost:1337/api/users/${userToUpdate.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userToUpdate),
        })
        .then(response => {
          if (response.ok) {
            console.log(`Points deducted and user ${username} updated successfully`);
          } else {
            throw new Error('Failed to update user');
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
      } else {
        console.error('Insufficient points');
      }
    } else {
      console.error('User not found');
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
};

const Card: React.FC<CardProps> = ({ game }) => {
  const navigate = useNavigate();

  const handleBuyClick = () => {
    const userData = getUserData();
    if (userData) {
      const { point } = userData; 
      if (point >= game.attributes.price) {
        Swal.fire({
          title: 'คุณต้องการซื้อสินค้านี้หรือไม่?',
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'ซื้อ',
          cancelButtonText: 'ยกเลิก',
        }).then((result) => {
          if (result.isConfirmed) {
            const purchaseData = {
              token: generateToken(),
              price: game.attributes.price,
              name: game.attributes.name,
              username: getUsername(), 
              timestamp: new Date().toISOString()
            };

            fetch('http://localhost:1337/api/histories', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ data: purchaseData }),
              credentials: 'include', 
            })
            .then(response => {
              if (response.ok) {
                Swal.fire('ซื้อสินค้าสำเร็จ!', '', 'success');
                deductPointsAndUpdateUser(game.attributes.price, getUsername());
              } else {
                throw new Error('Failed to store purchase history');
              }
            })
            .catch(error => {
              console.error('Error:', error);
            });
          }
        });
      } else {
        Swal.fire('จำนวนพอยท์ของคุณไม่เพียงพอ', 'กรุณาเติมพอยท์', 'warning');
      }
    } else {
      navigate("/login"); 
    }
  };

  return (
    <div className="card">
      <div className="img">
        <img className="img" src={"http://localhost:1337" + game.attributes.cover_image.data.attributes.url}
          alt={game.attributes.name} />
      </div>
      <div className="text">
        <p className="h3">{game.attributes.name}</p>
        <p className="p">{game.attributes.description}</p>
        <p className="price">ราคา: {game.attributes.price} บาท</p>
        <div className="icon-box" onClick={handleBuyClick}>
          <span className="span">กดเพื่อซื้อ</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
