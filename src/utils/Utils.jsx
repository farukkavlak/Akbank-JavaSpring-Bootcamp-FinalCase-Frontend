
//Input is array, there is some objects in array, i want to update these objects dateTimestamp property
//İnput parameter is timestamp, i want to get day of the week and day and month, For example result is "Monday" and "12 April"
//Input is object array
export function getDayAndMonth(forecastResultList) {
    let result = [];
    forecastResultList.forEach((element) => {
        let temperature = element.temperature;
        let weatherCondition = element.weatherCondition;
        let dateTimestamp = element.dateTimestamp;
        let date = new Date(dateTimestamp * 1000);
        //Start date is hour like a 3am, 6am, 9am, 12pm, 3pm, 6pm, 9pm
        let startDate = getTimePeriod(date.getHours());
        //End date is hour like a 6am, 9am, 12pm, 3pm, 6pm, 9pm, 12am, startDate + 3 hour
        let endDate = getTimePeriod(date.getHours() + 3);
        let day = date.toLocaleString('en-US', { weekday: 'long' });
        let month = date.toLocaleString('en-US', { month: 'long' });
        let dayOfMonth = date.toLocaleString('en-US', { day: 'numeric' });
        result.push({
            temperature: temperature,
            weatherCondition: weatherCondition,
            day: day,
            date: month + " " + dayOfMonth,
            startDate: startDate,
            endDate: endDate
        });
    });
    return result;
}

export function getTimePeriod(hour){
    let timePeriod = "";
    if(hour === 0){
        timePeriod = "12am";
    }else if(hour === 12){
        timePeriod = "12pm";
    }else if(hour < 12){
        timePeriod = hour + "am";
    }else{
        timePeriod = (hour - 12) + "pm";
    }
    return timePeriod;
}

export const isTimeDayOrNight = (hour) => {
    //Hour can be 12am, 3am, 6am, 9am, 12pm, 3pm, 6pm, 9pm // If hour is 6am, 9am, 12pm, 3pm is day, if hour is 6pm, 9pm, 12am, 3am is night
    let dayStatus = "day";
    if(hour === "12am" || hour === "3am" || hour === "6am" || hour === "9am" || hour === "12pm" || hour === "3pm"){
        dayStatus = "day";
    }else {
        dayStatus = "night";
    }
    return dayStatus;
};