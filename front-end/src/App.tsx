import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [needsWater, setNeedsWater] = useState(false);
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("/api/needsWater")
        .then((res) => res.json())
        .then((data) => setNeedsWater(data.needsWater));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("/api/dht")
        .then((res) => res.json())
        .then(({ temperature, humidity }) => {
          setTemperature(temperature);
          setHumidity(humidity);
        });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("/api/needsWater")
        .then((res) => res.json())
        .then((data) => setNeedsWater(data.needsWater));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App h-full flex justify-center align-center items-center">
      <header className="App-header">
        <div className="flex justify-center">
          <img src="/pot.png" />
        </div>

        {needsWater && <h1 className="text-4xl text-center mt-10 text-pink-700 font-bold">I need water!</h1>}
        {!needsWater && <h1 className="text-4xl text-center mt-10 font-bold">I'm good!</h1>}
        {temperature && (
          <h1 className="text-4xl text-center mt-10 font-bold">
            Temp: {temperature}°C, humidity: {humidity}%
          </h1>
        )}
      </header>
    </div>
  );
};

export default App;
