import React, { useState, useEffect } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons'; 
import axios from 'axios';
import Spinner from '../components/Spinner';
import "../styles/Loginpage.css";
import loginImg from './download.jpeg';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (values) => {
        try {
            setLoading(true);
            const { data } = await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/login`, values);
            setLoading(false);
            message.success('Login Success');
            localStorage.setItem('user', JSON.stringify({ ...data, password: '' }));
            navigate('/');
        } catch (error) {
            setLoading(false);
            if (error.response && error.response.status === 404) {
                message.error('Incorrect email');
            } else if (error.response && error.response.status === 401) {
                message.error('Invalid password');
            } 
            
            else {
                message.error('Something went wrong');
            }
        }
    };

    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <div className="login-page">
            {loading && <Spinner />}
            <div className="row container">
                <h1>Cash Caddy Online Expense Tracker For All</h1>
                <div className="col-md-6">
                    <img src={loginImg} alt="login-img" width={"100%"} height="100%" />
                </div>
                <div className="col-md-4 login-form">
                    <Form layout="vertical" onFinish={submitHandler}>
                        <h1>Login Form</h1>
                        <Form.Item label="Email" name="email">
                            <Input prefix={<UserOutlined />} type='email' size="large" />
                        </Form.Item>
                        <Form.Item label="Password" name="password">
                            <Input prefix={<LockOutlined />} type='password' size="large" />
                        </Form.Item>
                        <div className='d-flex justify-content-between'>
                            <Link to="/register" style={{ fontSize: '16px' }}>Not a User ? Click Here To Register</Link>
                            <button className='btn btn-primary' style={{ fontSize: '16px', padding: '10px 20px' }}>Login</button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default Login;
