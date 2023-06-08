
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { Col, Form, Input, Row } from 'antd'
import { useState } from 'react';
import styles from './RegisterComponent.module.css'
import useNotification from '../../hooks/UseNotification';
import { useAuth } from '../../contexts/AuthContext';

const RegisterComponent = ({handleComponentNavigation}) => {
    const { alertSuccess, alertError } = useNotification();
    // states
    const [user, setUser] = useState();
    const {register} = useAuth();

    const handleSubmit = async () => {
        try {
            let res = await register(user.username, user.password);
            if (res.status === 200) {
                alertSuccess("Register success");
                setTimeout(() => {
                    handleComponentNavigation(3);
                }, 2000);
            }
        } catch (error) {
            alertError(error.message);
        }
    };
    // useEffect(() => {
    //     // when this page mount, it is controlled user login or not
    //     if (currentUser) {
    //         navigate("/");
    //     }
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, []);
    return (
        <>
            <Row className={styles.loginContainer} justify='center' align='middle'>
                <Col className={styles.loginColumn} xxl={6} xl={6} lg={8} md={10} sm={14} xs={20} align='middle'>
                    <h1 className={styles.header}>Register</h1>
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
                                name="username"
                                id="email"
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
                            Register
                        </button>
                    </Form>
                </Col>
            </Row>
        </>
    )
}

export default RegisterComponent