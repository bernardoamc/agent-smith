const Koa = require("koa");
const BodyParser = require("koa-bodyparser");
const Router = require("koa-router");
const Logger = require("koa-logger");
const serve = require("koa-static");
const mount = require("koa-mount");
const cors = require("koa-cors");
const HttpStatus = require("http-status");
const { watchWaterSensor } = require("./external");

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

watchWaterSensor((sensorData) => {
  needsWater = sensorData;
});

router.get("/api/needsWater", async (ctx) => {
  ctx.body = {
    needsWater,
  };
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(PORT, function () {
  console.log("==> 🌎  API server on port %s. Visit http://localhost:%s/", PORT, PORT);
});
