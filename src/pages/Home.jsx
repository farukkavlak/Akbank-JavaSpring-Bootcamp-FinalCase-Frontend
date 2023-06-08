import { RightOutlined, } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import LoginComponent from '../components/LoginComponent/LoginComponent';
import RegisterComponent from '../components/RegisterComponent/RegisterComponent';
import WeatherSearchComponent from '../components/WeatherSearchComponent/WeatherSearchComponent';
import { useAuth } from '../contexts/AuthContext';
import styles from './Home.module.css'

const Home = () => {
    const { currentUser,logout } = useAuth();
    const [menuOptions, setMenuOptions] = useState(null);

    useEffect(() => {
        if (currentUser.username && currentUser.token){
            setMenuOptions([
                {
                    id: 1,
                    title: 'Search Weather',
                    active: true
                },
                {
                    id: 4,
                    title: 'Logout',
                    active: false
                },
            ])
        } else {
            setMenuOptions([
                {
                    id: 1,
                    title: 'Search Weather',
                    active: true
                },
                {
                    id: 2,
                    title: 'Register',
                    active: false
                },
                {
                    id: 3,
                    title: 'Login',
                    active: false
                },
            ])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);

    const handleComponentNavigation = (id) => {
        const newMenu = menuOptions.map((option, index) => {
            if (option.id === id) {
                return {
                    ...option,
                    active: true
                }
            } else {
                return {
                    ...option,
                    active: false
                }
            }
        });
        setMenuOptions(newMenu);
    };

    return (
        <>
            {
                menuOptions && (
                    <Row className={styles.appContainer} justify='center'>
                        <Col xxl={5} xl={5} lg={5} md={22} sm={22} xs={22} justify='start' align='start'>
                            {
                                currentUser.username && (<Col className={styles.usernameContainer}>

                                    <div className={styles.usernameDiv} >
                                        {currentUser.username}
                                    </div>

                                </Col>)
                            }
                            <Col className={styles.menuContainer}>
                                {
                                    //Map first 3 items of menu options
                                    menuOptions.length > 0 && menuOptions.map((item, index) => {
                                        return (
                                            <Row
                                                className={item?.active ? styles.menuTitleActiveRow : styles.menuTitleRow}
                                                span={24}
                                                justify='space-between'
                                                align='middle'
                                                onClick={() => {
                                                    if (item.id === 4) {
                                                        logout().then(() => {
                                                            window.location.reload();
                                                        });
                                                    }else {
                                                        const newMenu = menuOptions.map((option, index) => {
                                                            if (option.id === item.id) {
                                                                return {
                                                                    ...option,
                                                                    active: true
                                                                }
                                                            } else {
                                                                return {
                                                                    ...option,
                                                                    active: false
                                                                }
                                                            }
                                                        });
                                                        setMenuOptions(newMenu);
                                                    }
                                                }}
                                                wrap={false}
                                                key={item.id}
                                            >
                                                <Row align='middle' className={styles.iconContainer} wrap={false}>
                                                    <p className={styles.menuTitlePassive}>{item.title}</p>

                                                </Row>
                                                <RightOutlined className={styles.arrow} />
                                            </Row>

                                        )
                                    })
                                }
                            </Col>
                        </Col>
                        <Col xxl={16} xl={16} lg={16} md={22} sm={22} xs={22} className={styles.sideComponents}>
                            {
                                //eslint-disable-next-line array-callback-return
                                menuOptions && menuOptions.length > 0 && menuOptions.map((item, index) => {
                                    if (item.active && item.id === 1) {
                                        return( <WeatherSearchComponent />)
                                    }
                                    if (item.active && item.id === 2) {
                                        return (<RegisterComponent handleComponentNavigation={handleComponentNavigation} />)
                                    }
                                    if (item.active && item.id === 3) {
                                        return (<LoginComponent handleComponentNavigation={handleComponentNavigation} />)
                                    }
                                    if (item.active && item.id === 4) {
                                    }
                                })
                            }

                        </Col>

                    </Row>
                )
            }
        </>
    )
}

export default Home