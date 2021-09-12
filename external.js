const Gpio = require("onoff").Gpio;

const watchWaterSensor = (callback) => {
  const sensor = new Gpio(26, "in", "both");
  sensor.watch((err, value) => {
    if (err) {
      throw err;
    }
    console.log("sensor value changed", value);
    callback(value);
  });

  process.on("SIGINT", (_) => {
    sensor.unexport();
  });
};

module.exports = {
  watchWaterSensor,
};
