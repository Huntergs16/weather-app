import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherDay from './WeatherDay';
import HourlyView from './HourlyView';

const API_KEY = '937fd797dfcd49c397112742230704';

async function getData(zipcode) {
  const response = await axios.get(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${zipcode}&days=7`,
  );
  return response.data.forecast;
}

function DayList({zip}) {
  const [selectedDay, setSelectedDay] = useState('0');
  const [weeklyForecast, setWeeklyForecast] = useState([]);
  const [todayHourly, setTodayHourly] = useState();
  const [showHourly, setShowHourly] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const data = await getData(zip);
      console.log("HOURLY",data.forecastday);
      console.log("HOURLY",zip);
      setTodayHourly(data.forecastday[0].hour);

      const weeklyForecastData = data.forecastday.map((item) => {
        console.log(item)
        return {
          date: item.date,
          maxtemp_f: item.day.maxtemp_f,
          mintemp_f: item.day.mintemp_f,
          avgtemp_f: item.day.avgtemp_f,
          maxwind_mph: item.day.maxwind_mph,
          totalprecip_in: item.day.totalprecip_in,
          avgvis_miles: item.day.avgvis_miles,
          avghumidity: item.day.avghumidity,
          daily_will_it_rain: item.day.daily_will_it_rain,
          daily_chance_of_rain: item.day.daily_chance_of_rain,
          daily_will_it_snow: item.day.daily_will_it_snow,
          daily_chance_of_snow: item.day.daily_chance_of_snow,
          condition: item.day.condition,
          uv: item.day.uv,
        };
      });

      setWeeklyForecast(weeklyForecastData);
    }

    fetchData();
  });

  return (
    <div className="flex flex-col flex-wrap gap-10 items-center">
      {/* today */}
      <WeatherDay today={true} selected={selectedDay} setSelected={setSelectedDay} data={weeklyForecast[0]} />
      <button onClick={() => setShowHourly(!showHourly)} class="bg-blue-300 hover:shadow-lg active:shadow-2xl active: text-sm  py-2 px-4 rounded-md shadow-md shadow-cyan-500/50">
        Show Hourly Weather
      </button>
      <HourlyView showHourly={showHourly} data={todayHourly}/>
      <div className="flex flex-wrap gap-10 justify-center items-center">
        {/* Next 6 days */}
        <WeatherDay today={false} selected={selectedDay} setSelected={setSelectedDay} data={weeklyForecast[2]} />
        <WeatherDay today={false} selected={selectedDay} setSelected={setSelectedDay} data={weeklyForecast[1]} />
        <WeatherDay today={false} selected={selectedDay} setSelected={setSelectedDay} data={weeklyForecast[3]} />
        <WeatherDay today={false} selected={selectedDay} setSelected={setSelectedDay} data={weeklyForecast[4]} />
        <WeatherDay today={false} selected={selectedDay} setSelected={setSelectedDay} data={weeklyForecast[5]} />
        <WeatherDay today={false} selected={selectedDay} setSelected={setSelectedDay} data={weeklyForecast[6]} />
      </div>
    </div>
  );
}

export default DayList;