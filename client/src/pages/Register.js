import React, { useState, useEffect } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import { FaRupeeSign } from 'react-icons/fa';
import Spinner from '../components/Spinner';
import axios from 'axios';
import '../styles/RegisterPage.css';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Form Submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      await axios.post('/users/register', values);
      message.success('Registration Successful');
      setLoading(false);
      navigate('/login');
    } catch (error) {
      setLoading(false);
      message.error('Invalid Username or Password');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <div className="register-page">
        {loading && <Spinner />}
        <Form className="register-form" layout="vertical" onFinish={submitHandler}>
          <h1>Register Form</h1>
          <Form.Item label="Name" name="name" className="form-item">
            <Input prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item label="Email" name="email" className="form-item">
            <Input type="email" prefix={<MailOutlined />} />
          </Form.Item>
          <Form.Item label="Password" name="password" className="form-item">
            <Input type="password" prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item label="Initial Balance" name="initialBalance" className="form-item">
            <Input type="number" prefix={<FaRupeeSign />} />
          </Form.Item>
          <div className="d-flex">
            <Link to="/login" className="link">Already Register? Click Here To Login</Link>
            <button type="submit" className="btn btn-primary">Register</button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;
