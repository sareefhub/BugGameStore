import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { getUserData } from '../helper';
import './History.css';
import conf from '../conf';

const History: React.FC = () => {
  const [purchases, setPurchases] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const userData = getUserData(); // Get user data within useEffect
        if (!userData) {
          navigate('/login');
          return;
        }

        const response = await fetch(`${conf.apiPrefix}/api/histories`, {
          headers: {
            Authorization: `Bearer ${userData.jwt}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch purchase history');
        }
        const data = await response.json();

        // Filter purchases by username from user data
        const filteredPurchases = data.data.filter((purchase: any) => purchase.attributes.username === userData.username);

        setPurchases(filteredPurchases);
      } catch (error) {
        console.error('Error fetching purchase history:', error);
      }
    };

    fetchPurchaseHistory();
  }, [navigate]); // Add navigate to dependencies array

  return (
    <div>
      <Navbar />
      <div className="history-container">
        <h1>ประวัติการซื้อ</h1>
        {purchases.length === 0 ? (
          <p className="no-history">ท่านไม่มีประวัติการสั่งซื้อ</p>
        ) : (
          <ul>
            {purchases.map((purchase: any) => (
              <li key={purchase.id}>
                <div className="purchase-info">
                  <span className="game-name">{purchase.attributes.name}</span>
                  <span className="price">{purchase.attributes.price} บาท</span>
                  <span className="timestamp">
                    {new Date(purchase.attributes.timestamp).toLocaleString('en-GB', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </span>
                  <span className="token">Token : {purchase.attributes.token}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default History;
