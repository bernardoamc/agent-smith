import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [needsWater, setNeedsWater] = useState(false);

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
        <img src="/pot.png" />
        {needsWater && <h1 className="text-4xl text-center mt-10 text-pink-700 font-bold">I need water!</h1>}
        {!needsWater && <h1 className="text-4xl text-center mt-10">I am good brah!</h1>}
      </header>
    </div>
  );
};

export default App;
