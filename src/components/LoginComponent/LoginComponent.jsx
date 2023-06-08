
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Col, Form, Input, Row } from 'antd'
import { useState } from 'react';
import styles from './LoginComponent.module.css'
import useNotification from '../../hooks/UseNotification';
import { useAuth } from '../../contexts/AuthContext';

const LoginComponent = ({handleComponentNavigation}) => {
    const { alertSuccess, alertError } = useNotification();
    const { login} = useAuth();
    // states
    const [user, setUser] = useState();

    const handleSubmit = async () => {
        try {
            let res = await login(user.username, user.password);
            if (res.status === 200) {
                alertSuccess("Login success");
            }
        } catch (error) {
            console.log(error)
            alertError(error.response.data.messages);
        }
    };
    return (
        <>
            <Row className={styles.loginContainer} justify='center' align='middle'>
                <Col className={styles.loginColumn} xxl={6} xl={6} lg={8} md={10} sm={14} xs={20} align='middle'>
                    <h1 className={styles.header}>Login</h1>
                    <Form
                        className={styles.formContainer}
                        name='loginForm'
                        onFinish={handleSubmit}
                    >
                        <Form.Item
                            className={styles.inputContainer}
                            name='Username'
                            rules={
                                [
                                    {
                                        required: true,
                                        message: "Username is required"
                                    },

                                ]
                            }>
                            <Input
                                className={styles.loginInput}
                                size='large'
                                type="text"
                                name="Username"
                                id="Username"
                                placeholder="Username"
                                prefix={<UserOutlined />}
                                onChange={(e) => {
                                    setUser({ ...user, username: e.target.value.trim() });
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            className={styles.inputContainer}
                            name='password'
                            rules={
                                [
                                    {
                                        required: true,
                                        message: "Password is required"
                                    },

                                ]
                            }>
                            <Input.Password
                                className={styles.loginInput}
                                size='large'
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Password"
                                prefix={<LockOutlined />}
                                onChange={(e) => {
                                    setUser({ ...user, password: e.target.value.trim() });
                                }}
                            />
                        </Form.Item>
                        <button type="submit" className={styles.loginButton}>
                            Login
                        </button>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default LoginComponent