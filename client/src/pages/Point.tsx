import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './Point.css';
import PointData from '../models/PointData';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { getUserData } from '../helper';
import conf from '../conf';

function Point() {
  const [pointData, setPointData] = useState<PointData[] | null>(null);
  const [formData, setFormData] = useState({
    date: '',
    price: '',
    SlipImage: null as File | null,
  });
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const userData = getUserData(); // Assuming you have a function to get user data
        if (!userData) {
          navigate('/login');
        } else {
          fetchData();
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoggedIn();
  }, []);

  const fetchData = () => {
    fetch(`${conf.apiPrefix}/api/points?populate=QRImage`)
      .then(response => response.json())
      .then((data: { data: PointData[] }) => setPointData(data.data))
      .catch(error => console.error('Error fetching data:', error));
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (!formData.date || !formData.price || !formData.SlipImage) {
        throw new Error('กรุณากรอกข้อมูลให้ครบทุกช่อง');
      }

      // Check if user is authenticated before posting data
      const userData = getUserData(); // Assuming you have a function to get user data
      if (!userData) {
        navigate('/login');
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('data', JSON.stringify({
        Date: formData.date,
        price: formData.price,
        username: userData.username, // Add username field
      }));
      formDataToSend.append('files.SlipImage', formData.SlipImage);

      const response = await fetch('http://localhost:1337/api/points', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${userData.jwt}`, // Add Authorization header
        },
      });
      
      const data = await response.json();
      console.log('Data posted:', data);

      Swal.fire({
        icon: 'success',
        title: 'เติมสำเร็จ!',
        text: 'ข้อมูลของคุณถูกเพิ่มเข้าสู่ระบบแล้ว',
      });

      fetchData();
    } catch (error: any) {
      console.error('Error posting data:', error);
      Swal.fire({
        icon: 'error',
        title: 'ผิดพลาด!',
        text: error.message,
      });
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    setFormData({
      ...formData,
      SlipImage: file,
    });
  };

  return (
    <div>
      <Navbar />
      <div className="point-card">
        <div>
          <h2>TermPoint</h2>
          {pointData && pointData.map(point => (
            <div key={point.id}>
              {point.attributes.QRImage && point.attributes.QRImage.data && point.attributes.QRImage.data.map(qrImage => (
                <img
                  key={qrImage.id}
                  src={`http://localhost:1337${qrImage.attributes.url}`}
                  alt={qrImage.attributes.name}
                />
              ))}
            </div>
          ))}
        </div>
        <h4>กรอกข้อมูลของท่าน</h4>
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="datetime">วันและเวลาที่โอน:</label>
            <input
              type="datetime-local"
              id="datetime"
              name="date"
              value={formData.date ? new Date(formData.date).toISOString().slice(0, 16) : ''}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="price">ราคา:</label>
            <input
              type="text"
              id="price"
              name="price"
              placeholder="ราคา"
              value={formData.price}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="SlipImage">สลิปการโอน:</label>
            <input type="file" id="SlipImage" name="SlipImage" onChange={handleFileChange} />
          </div>
          <button type="submit">ยืนยัน</button>
        </form>
      </div>
    </div>
  );
}

export default Point;
