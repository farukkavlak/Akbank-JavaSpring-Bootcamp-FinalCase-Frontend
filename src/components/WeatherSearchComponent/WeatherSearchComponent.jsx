import styles from './WeatherSearchComponent.module.css';
import { Button, Col, Input, Row } from 'antd';
import { CaretDownOutlined, CaretUpOutlined, DeleteOutlined, EnvironmentOutlined, HeartOutlined } from '@ant-design/icons';
import { Slider } from 'antd';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';
import { useState } from 'react';
import useNotification from '../../hooks/UseNotification';
import { getDayAndMonth, isTimeDayOrNight } from '../../utils/Utils';
import { useEffect } from 'react';

const WeatherSearchComponent = () => {
    const { currentUser } = useAuth();
    const [weatherData, setWeatherData] = useState(null);
    const [favoriteCities, setFavoriteCities] = useState([]); 
    const [uniqueDays, setUniqueDays] = useState([]);
    const [city, setCity] = useState(null);
    const [activeDay, setActiveDay] = useState(null);
    const [activeHour, setActiveHour] = useState(null);
    const [dayOrNight, setDayOrNight] = useState("day");
    const [sliderValues, setSliderValues] = useState(0);
    const [sliderCount, setSliderCount] = useState(0);
    const { alertError, alertSuccess } = useNotification();
    
    const handleSearch = async (cityInput) => {
        let url = process.env.REACT_APP_BASE_URL + "api/v1/weathers?city=" + cityInput;
        const headers = {
            Authorization: "Bearer " + localStorage.getItem("token"),
        };

        const requestBody = {
            userId: currentUser.id || null
        };
        try {
            let response = null;
            if (localStorage.getItem("token") === null) {
                response = await axios.get(url, {
                    params: requestBody,
                });
            }else {
                response = await axios.get(url, {
                    params: requestBody,
                    headers
                });
            }
            if (response.status === 200) {
                alertSuccess("Successfully searched for " + cityInput.charAt(0).toUpperCase() + cityInput.slice(1));
                
                setWeatherData(getDayAndMonth(response.data.data.forecastResultList));
                const uniqueDays = getDayAndMonth(response.data.data.forecastResultList).reduce((acc, item, index, array) => {
                    const currentIndex = getDayAndMonth(response.data.data.forecastResultList).findIndex((item2) => item2.day === item.day);
                  
                    if (currentIndex === index) {
                      acc.push({
                        day: item.day,
                        startIndex: index,
                        lastIndex: array.length - 1 - [...array].reverse().findIndex((item2) => item2.day === item.day)
                      });
                    }
                  
                    return acc;
                  }, []);                  
                setUniqueDays(uniqueDays);
                //First letter of city uppercase
                setCity(response.data.data.city.charAt(0).toUpperCase() + response.data.data.city.slice(1));
            } else {
                alertError("Something went wrong");
            }
        } catch (error) {
            alertError(error.response.data.messages);
        }
    }

    const getHighestTemp = (data) => {
        const highestTemp = Math.max(...data.map((item) => item.temperature));

        if (!highestTemp.toString().includes(".")) {
            return highestTemp + ".00";
        }else if (highestTemp.toString().split(".")[1].length === 1) {
            return highestTemp + "0";
        }else {
            return highestTemp;
        }
    }
    const getLowestTemp = (data) => {
        const lowestTemp = Math.min(...data.map((item) => item.temperature));

        if (!lowestTemp.toString().includes(".")) {
            return lowestTemp + ".00";
        }else if (lowestTemp.toString().split(".")[1].length === 1) {
            return lowestTemp + "0";
        }else {
            return lowestTemp;
        }
    }

    const handleFavorite = async () => {
        const url = process.env.REACT_APP_BASE_URL + "api/v1/users/" + currentUser.id + "/cities";
        const headers = {
            Authorization: "Bearer " + localStorage.getItem("token"),
        };

        const requestBody = {
            city: city
        };
        try {
            const response = await axios.post(url, requestBody, {
                headers
            });
            if (response.status === 200) {
                alertSuccess("Successfully added " + city + " to favorites");
                setFavoriteCities([...favoriteCities, city]);
            } else {
                alertError("Something went wrong");
            }
        } catch (error) {
            alertError(error.response.data.messages);
        };
    }

    const handleDelete = async (city) => {
        const url = process.env.REACT_APP_BASE_URL + "api/v1/users/" + currentUser.id + "/cities/" + city;

        const headers = {
            Authorization: "Bearer " + localStorage.getItem("token"),
        };

        try {
            const response = await axios.delete(url, {
                headers
            });
            if (response.status === 200) {
                alertSuccess("Successfully deleted " + city + " from favorites");
                setFavoriteCities(favoriteCities.filter((item) => item !== city));
            } else {
                alertError("Something went wrong");
            }
        }
        catch (error) {
            alertError(error.response.data.messages);
        }
    };

    const getFavoriteCities = async () => {
        const url = process.env.REACT_APP_BASE_URL + "api/v1/users/" + currentUser.id + "/cities";

        const headers = {
            Authorization: "Bearer " + localStorage.getItem("token"),
        };

        try {
            const response = await axios.get(url, {
                headers
            });;
            if (response.status === 200) {
                setFavoriteCities(response.data.data);
            } else {
                alertError("Something went wrong");
            }
        } catch (error) {
            alertError(error.response.data.messages);
        }
    };
    useEffect(() => {
        if (currentUser && currentUser.id) {
            getFavoriteCities();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser]);
    return (
        <Col className={styles.container} justify='center' align='middle'>
            {
                currentUser && currentUser.id && (
                    <Row className={styles.favoriteCitiesContainer} justify='center' align='middle'>
                        {
                            favoriteCities && favoriteCities.map((item, index) => {
                                return (
                                        <Row className={styles.favoriteCityNameContainer} justify='center' align='middle' key={index}>
                                            <div className={styles.favoriteCityName} onClick={() => handleSearch(item)}>{item}</div>
                                            <Button className={styles.deleteButton} type="text" icon={<DeleteOutlined />} onClick={() => handleDelete(item)} />
                                        </Row>
                                )
                            })
                        }
                    </Row>
                )
            }
            <Col className={styles.searchContainer} span={24}>
                <Input className={styles.searchInput} placeholder='Search' onPressEnter={(e) => handleSearch(e.target.value)} suffix={<EnvironmentOutlined className={styles.locationIcon} />} />
            </Col>
            <Row className={styles.cityNameContainer} span={24} align='middle' justify='center'>
                {
                    //Add favorite this city
                    weatherData && currentUser && currentUser.id && (
                        <Button className={styles.favoriteButton} type="text" icon={<HeartOutlined />} onClick={handleFavorite} />
                    )
                }
                <div className={styles.cityName}>{city}</div>
            </Row>
            <Col className={styles.weatherContainerByHourly} span={20}>
                { 
                    weatherData && activeDay !== null && activeHour !== null && (
                        <Row align='middle' justify='left' className={styles.weatherContainer}>
                            <img src={`images/${weatherData[uniqueDays[activeDay].startIndex + activeHour].weatherCondition}_${dayOrNight}.png`} alt="weather" className={styles.weatherIcon} />
                            <div>
                                <span className={styles.temperature}>{weatherData[uniqueDays[activeDay].startIndex + activeHour].temperature}°</span>
                            </div>
                        </Row>
                    )
                }
            </Col>
            {
                weatherData && (
                    <div>
                        <Slider marks={sliderValues} step={1} defaultValue={0} max={sliderCount} className={styles.slider} onChange={(value) => {
                            setActiveHour(value);
                            let res = isTimeDayOrNight(sliderValues[value]);
                            if (res) {
                                setDayOrNight(res);
                            }else {
                                setDayOrNight("day");
                            }
                        }}
                        />
                        <Row justify='center' align='middle' className={styles.sliderTimeContainer}>
                            {
                                uniqueDays && uniqueDays.map((item, index) => {
                                 return (
                                    <Col span={8} className={activeDay === index ? styles.cardContainerSelected : styles.cardContainer} key={index} id={index} onClick={() => {
                                    setActiveDay(index);
                                    setActiveHour(0);
                                    setSliderValues({});
                                    let sliderValues = {};
                                    for(let i = item.startIndex, j= 0; i <= item.lastIndex; i++, j++) {
                                        sliderValues[j] = weatherData[i].startDate;
                                    }
                                    setSliderValues(sliderValues);
                                    setSliderCount(item.lastIndex - item.startIndex);
                                  }} >
                                    <Col className={styles.card}>
                                        <div className={styles.cardTitle} span={24}>{item.day} - {weatherData[item.startIndex].date}</div>
                                        <div span={24} className={styles.cardTemp}>
                                            <CaretUpOutlined className={styles.maxTempIcon} /> {getHighestTemp(weatherData.slice(item.startIndex, item.lastIndex + 1))}°C
                                        </div>
                                        <div span={24} className={styles.cardTemp}>
                                            <CaretDownOutlined className={styles.minTempIcon} /> {getLowestTemp(weatherData.slice(item.startIndex, item.lastIndex + 1))}°C
                                        </div>
                                    </Col>
                                </Col>
                                 )
                                })
                            }
                        </Row>
                    </div>
                )
            }
        </Col>
    )
};

export default WeatherSearchComponent;