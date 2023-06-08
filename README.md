# 
<h1 align="center">Akbank Bootcamp Final Project Frontend/Client Side</h1>
<h1 align="center">Ömer Faruk Kavlak</h1><br>

 <p align="center">
  &#8505; <a href="#demo">Demo</a> 
  &#8505; <a href="#project-details">Project Details</a> 
  &#8505; <a href="#technologies">Technologies</a> 
  &#8505; <a href="#project-requirements">Project Requirements</a> 
  &#8505; <a href="#test">Test</a> 
  &#8505; <a href="#swagger-screenshots">Swagger Screenshots</a> 
</p>

## Backend Repo
https://github.com/farukkavlak/Akbank-JavaSpring-Bootcamp-FinalCase

## Demo
https://github.com/farukkavlak/Akbank-JavaSpring-Bootcamp-FinalCase/assets/79375232/a2e5218b-0452-4e40-b31a-1801136af34c

## Project Details

## Project Details
The main purpose of the application is to get the 5 day Weather Forecast according to the City Name by using https://openweathermap.org/api, save it in the database and display it to the user.

## Technologies
<ul>
  <li>Frontend = ReactJS</li>
  <li>Backend = Java Spring Boot - Maven</li>
  <li>Third Party API = https://openweathermap.org/forecast5 & https://openweathermap.org/api/geocoding-api </li>
  <li>Database = PostgreSQL</li>
</ul>

## Project Requirements
- Weather Forecast (https://openweathermap.org/forecast5) and Geocoding (https://openweathermap.org/api/geocoding-api) endpoints will be used.✔️
- With the City Name information and the Geocoding API, the coordinate(lat,lon) information of the relevant city will be obtained.✔️
- According to these results, 5-day, 3-hourly weather forecast data will be obtained.✔️
- Authentication structure will be established.✔️
- Users can create an account to save their city and view the weather forecast for the saved cities.✔️
- The cities searched by users and their predictions will be kept in the db.✔️
- Even if the requester is not registered, the estimates of the cities he called will be kept in the database.✔️
- Error Handling.✔️
- Logging Mechanism.✔️
- Feign(Open Feign) will be used for client.✔️
- Frontend with ReactJS.✔️

## Test
- Tests were partial due to time constraints, only control test were implemented.

## Swagger Screenshots
#### Controller
<img src="https://github.com/farukkavlak/Akbank-JavaSpring-Bootcamp-FinalCase/blob/main/Screenshots/Controllers.png"></img>
#### Schemas
<img src="https://github.com/farukkavlak/Akbank-JavaSpring-Bootcamp-FinalCase/blob/main/Screenshots/Schemas.png"></img>

#### Get Weather From Api And Response
<img src="https://github.com/farukkavlak/Akbank-JavaSpring-Bootcamp-FinalCase/blob/main/Screenshots/GetWeathers.png"></img>
<img src="https://github.com/farukkavlak/Akbank-JavaSpring-Bootcamp-FinalCase/blob/main/Screenshots/WeathersResponse.png"></img>

#### Register
<img src="https://github.com/farukkavlak/Akbank-JavaSpring-Bootcamp-FinalCase/blob/main/Screenshots/Register.png"></img>

#### Login
<img src="https://github.com/farukkavlak/Akbank-JavaSpring-Bootcamp-FinalCase/blob/main/Screenshots/Login.png"></img>
#### Login Error
<img src="https://github.com/farukkavlak/Akbank-JavaSpring-Bootcamp-FinalCase/blob/main/Screenshots/Error4.png"></img>

#### Save City
<img src="https://github.com/farukkavlak/Akbank-JavaSpring-Bootcamp-FinalCase/blob/main/Screenshots/SaveCity.png"></img>
#### Save City Error / City is already exists condition
<img src="https://github.com/farukkavlak/Akbank-JavaSpring-Bootcamp-FinalCase/blob/main/Screenshots/Error3.png"></img>

#### Delete City
<img src="https://github.com/farukkavlak/Akbank-JavaSpring-Bootcamp-FinalCase/blob/main/Screenshots/DeleteCity.png"></img>
#### Delete CityError / City Not Found Condition
<img src="https://github.com/farukkavlak/Akbank-JavaSpring-Bootcamp-FinalCase/blob/main/Screenshots/Error1.png"></img>

#### Get Cities
<img src="https://github.com/farukkavlak/Akbank-JavaSpring-Bootcamp-FinalCase/blob/main/Screenshots/GetCities.png"></img>

#### Log Examples
<img src="https://github.com/farukkavlak/Akbank-JavaSpring-Bootcamp-FinalCase/blob/main/Screenshots/Log.png"></img>

#### User Token and Provided Id are not same Error
<img src="https://github.com/farukkavlak/Akbank-JavaSpring-Bootcamp-FinalCase/blob/main/Screenshots/Error2.png"></img>








