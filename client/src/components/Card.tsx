import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import Game from '../models/Game';
import { getUsername, getUserData, updateLocalUserPoint } from '../helper';
import conf from '../conf';
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

const deductPointsAndUpdateUser = async (pointsToDeduct: number, username: string, setUserData: React.Dispatch<React.SetStateAction<any>>) => {
    try {
        const response = await fetch(`${conf.apiPrefix}/api/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch users data');
        }
        const users = await response.json();
        const userToUpdate = users.find((user: any) => user.username === username);
        if (!userToUpdate) {
            throw new Error('User not found');
        }
        const updatedPoints = userToUpdate.point - pointsToDeduct;
        if (updatedPoints < 0) {
            throw new Error('Insufficient points');
        }
        userToUpdate.point = updatedPoints;
        const updateUserResponse = await fetch(`${conf.apiPrefix}/api/users/${userToUpdate.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userToUpdate),
        });
        if (!updateUserResponse.ok) {
            throw new Error('Failed to update user points');
        }
        console.log(`Points deducted and user ${username} updated successfully`);
        // Update user state
        setUserData(userToUpdate);
        // Update points in localStorage
        updateLocalUserPoint(updatedPoints);
    } catch (error) {
        console.error('Error:', error);
    }
};

const Card: React.FC<CardProps> = ({ game }) => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState<any>(null);

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

                        fetch(`${conf.apiPrefix}/api/histories`, {
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
                                    deductPointsAndUpdateUser(game.attributes.price, getUsername(), setUserData);
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
                <img className="img" src={game.attributes.cover_image.data.attributes.url} alt={game.attributes.name} />
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
