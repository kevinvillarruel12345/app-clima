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
      <button
        className="bg-teal-600 rounded-xl text-white px-8 py-2 font-semibold mb-9"
        onClick={moveTemperature}
      >
        {temperature ? 'Toggle to C°' : 'Toggle to F°'}
      </button>
      <div className="bg-teal-600 w-60  flex  flex-col items-center rounded-t-lg rounded-b-lg">
        <p className="pl-2 text-5xl pb-6 ">
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
          <p className="bg-teal-600 absolute bottom-1 text-right rounded-t-lg rounded-b-lg p-2 left-60 h-10 w-20">
            {users.weather?.[0].description}
          </p>
        </div>
        <div className="flex justify-center mt-11"></div>
      </div>
    </div>
  );
};

export default App;
