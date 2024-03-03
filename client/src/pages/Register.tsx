import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import './Register.css';
import Navbar from '../components/Navbar';
import conf from '../conf';

function Register() {
const navigate = useNavigate();
const [formData, setFormData] = useState({
username: '',
email: '',
password: ''
});

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = event.target;
  setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault();

    try {
    const response = await axios.post(`${conf.apiPrefix}/api/auth/local/register`, formData);
    Swal.fire({
    icon: 'success',
    title: 'ลงทะเบียนสำเร็จ',
    text: 'กรุณาเข้าสู่ระบบเพื่อใช้งาน',
    });
    navigate('/login');
    } catch (error) {
    console.error('Registration failed:', error);
    Swal.fire({
    icon: 'error',
    title: 'ลงทะเบียนล้มเหลว',
    text: 'กรุณาลองอีกครั้ง',
    });
    }
    };

    return (

    <body>
      <Navbar />
      <div className="register-body">
        <div className="register-container">
          <h2>สร้างบัญชีผู้ใช้</h2>
          <form onSubmit={handleRegister}>
            <div className="register-form-group">
              <label className="register-label" htmlFor="username">ชื่อผู้ใช้:</label>
              <input className="register-input" type="text" id="username" name="username" onChange={handleChange} />
            </div>
            <div className="register-form-group">
              <label className="register-label" htmlFor="email">อีเมล:</label>
              <input className="register-input" type="email" id="email" name="email" onChange={handleChange} />
            </div>
            <div className="register-form-group">
              <label className="register-label" htmlFor="password">รหัสผ่าน:</label>
              <input className="register-input" type="password" id="password" name="password" onChange={handleChange} />
            </div>
            <button className="register-button" type="submit">ลงทะเบียน</button>
          </form>
          <a href="/login">เข้าสู่ระบบ</a>
        </div>
      </div>
    </body>
    );
    }

    export default Register;