import React from 'react';
import { useState, useEffect } from 'react';


const App = () => {
  const [users, setUsers] = useState([]);
  const [temperature, setmoveTemperature] = useState(false);
  let longitud;
  let latitud;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      longitud = position.coords.longitude;
      latitud = position.coords.latitude;
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=c2f093589d8a1edff669b918f14909c0`;

      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setUsers(data);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);
  const fahrenheit = (temperature) => (temperature * 9) / 5 + 32;
  const moveTemperature = () => {
    setmoveTemperature((temperature) => !temperature);
  };

  return (
    <div className=" flex flex-col justify-center items-center p-10">
      <div className="">
        <img
          className=""
          src={`https://openweathermap.org/img/wn/${users.weather?.[0].icon}@4x.png`}
          alt=""
        />
      </div>

      <p className="pl-2 text-5xl pb-6 pt-10">
        {temperature
          ? Math.round(fahrenheit(users.main?.temp - 273.15)) + '°F'
          : Math.round(users.main?.temp - 273.15) + '°C'}
      </p>
      <div className="pl-3 text-xs flex flex-col gap-2">
        <p>WIND: {users.wind?.speed} m/s</p>
        <p>CLOUDS: {users.clouds?.all} %</p>
        <p>PRESSURE: {users.main?.pressure} hPa</p>
      </div>

      <div className="relative">
        <p className="text-xl font-semibold">
          {users.name}, {users.sys?.country}
        </p>
        <p className="absolute left-60 bottom-1 text-right">
          {users.weather?.[0].description}
        </p>
      </div>
      <div className="flex justify-center mt-11">
        <button
          className="bg-purple-700 rounded-xl text-white px-8 py-2 font-semibold"
          onClick={moveTemperature}
        >
          {temperature ? 'Toggle to C°' : 'Toggle to F°'}
        </button>
      </div>
    </div>
  );
};

export default App;
