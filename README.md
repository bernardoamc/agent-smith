# agent-smith

Monitors the following:

* earth humidity
* air temperature and humidity


## Setup

In this section we will detail how to develop or publish this application to
production.

The `front-end` folder is a React application

### Development

To install dependencies run:

```bash
yarn install-dependencies
```

To run this project type:

```bash
yarn dev
```

This command will executed both the `node` server and the `react server`, which
will only proxy the requests to the `node server` through the `proxy`
configuration in `package.json`.

See [this
documentation](https://create-react-app.dev/docs/proxying-api-requests-in-development/)
for more information.

The React server is running on port `3000`.
The Node server is running on port `3001`.

### Production

Run `yarn build` in order to compile the assets in the build folder and you are
done!

## Technical Details

**Code:**

* NodeJS
* React
* Typescript
* Yarn to execute scripts (see package.json for options)

**Sensors:**

* Soil Moisture Detection Module in digital mode
* DHT11–Temperature and Humidity Module using serialized data

