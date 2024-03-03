import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { storeUser } from "../helper";
import Swal from 'sweetalert2';
import './Login.css';
import Navbar from '../components/Navbar';
import conf from '../conf';

function Login() {
const navigate = useNavigate();

async function loginUser(credentials: { identifier: string, password: string }) {
try {
const response = await axios.post(`${conf.apiPrefix}/api/auth/local`, credentials);
return response.data;
} catch (error) {
console.error('Error logging in:', error);
throw error;
}
}

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;

  // ตรวจสอบว่ามีข้อมูลทั้ง username และ password หรือไม่
  if (!username || !password) {
  Swal.fire({
  icon: 'error',
  title: 'ข้อมูลไม่ครบถ้วน',
  text: 'กรุณากรอกชื่อบัญชีผู้ใช้และรหัสผ่าน',
  });
  return; // ออกจากฟังก์ชันเพื่อไม่ทำการเรียก API
  }

  try {
  const userData = await loginUser({ identifier: username, password });
  storeUser(userData);
  navigate('/home');
  // แสดง SweetAlert เมื่อเข้าสู่ระบบสำเร็จ
  Swal.fire({
  icon: 'success',
  title: 'เข้าสู่ระบบสำเร็จ',
  text: 'ยินดีต้อนรับกลับสู่ระบบ',
  });
  } catch (error) {
  console.error('Login failed:', error);
  // เพิ่ม SweetAlert เมื่อเกิดข้อผิดพลาดในการเข้าสู่ระบบ
  Swal.fire({
  icon: 'error',
  title: 'เข้าสู่ระบบล้มเหลว',
  text: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง',
  });
  }
  };

  return (

  <body>
    <Navbar />
    <div className="login-body">
      <div className="login-container">
        <h2>เข้าสู่ระบบ</h2>
        <form onSubmit={handleSubmit}>
          <div className="login-form-group">
            <label className="login-label" htmlFor="username">ชื่อบัญชีผู้ใช้:</label>
            <input className="login-input" type="text" id="username" name="username" />
          </div>
          <div className="login-form-group">
            <label className="login-label" htmlFor="password">รหัสผ่าน:</label>
            <input className="login-input" type="password" id="password" name="password" />
          </div>
          <button className="login-button" type="submit">ยืนยัน</button>
        </form>
        <a href="/register">สมัครสมาชิก</a>
      </div>
    </div>
  </body>
  );
  }

  export default Login;