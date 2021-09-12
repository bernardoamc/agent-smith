const Gpio = require("onoff").Gpio;
const dht = require("node-dht-sensor");

const watchWaterSensor = (callback) => {
  const sensor = new Gpio(26, "in", "both");
  sensor.watch((err, value) => {
    if (err) {
      throw err;
    }
    callback(value);
  });

  process.on("SIGINT", (_) => {
    sensor.unexport();
  });
};

const readDHT = (callback) => {
  dht.read(11, 17, (err, temperature, humidity) => {
    if (!err) {
      callback({ temperature, humidity });
    }
  });
};

const watchAirSensor = (callback) => {
  setInterval(() => {
    readDHT(callback);
  }, 1000);
};

module.exports = {
  watchWaterSensor,
  watchAirSensor,
};
