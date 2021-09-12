const Koa = require("koa");
const BodyParser = require("koa-bodyparser");
const Router = require("koa-router");
const Logger = require("koa-logger");
const serve = require("koa-static");
const mount = require("koa-mount");
const cors = require("koa-cors");
const HttpStatus = require("http-status");
const { watchWaterSensor, watchAirSensor } = require("./external");

const app = new Koa();

const PORT = process.env.PORT || 3001;

const staticPages = new Koa();
staticPages.use(serve(__dirname + "/front-end/build"));
app.use(mount("/", staticPages));

app.use(BodyParser());
app.use(Logger());
app.use(cors());

const router = new Router();

let needsWater = false;
let temperature = 0,
  humidity = 0;

watchWaterSensor((sensorData) => {
  needsWater = sensorData;
});

watchAirSensor((sensorData) => {
  temperature = sensorData.temperature;
  humidity = sensorData.humidity;
});

router.get("/api/needsWater", async (ctx) => {
  ctx.body = {
    needsWater,
  };
});

router.get("/api/dht", async (ctx) => {
  ctx.body = { temperature, humidity };
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, function () {
  console.log("==> 🌎  API server on port %s. Visit http://localhost:%s/", PORT, PORT);
});
