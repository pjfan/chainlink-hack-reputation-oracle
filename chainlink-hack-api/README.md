# chainlink-hack-api

API created for Web3 ReputationOracle (project for Chainlink Hackathon Spring 2022.)

Ported functionality from our React app to a backend API for integration with Chainlink Adapter.

Built using Express, Node, Typescript, and Moralis SDK.

## Getting Started
Install the dependencies:

```bash
yarn
```

Create a .env file and add Moralis server URL and app ID variables to the .env file. (See .env.example).

```bash
MORALIS_SERVER_URL=""
MORALIS_APP_ID=""
```

After installing the dependencies, run the development server:
```bash
yarn dev
```

To compile the Typescript into Javascript:

```bash
yarn build
```

To run the production server (using compiled Javascript):
```bash
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Testing API endpoints

After starting your server, you can navigate to the following URLs to test the API endpoints. Note you will have to swap <chain> and <address> with an actual supported blockchain (eth, avalanche, polygon, or fantom) and an actual address.

* http://localhost:3000/api/reputation/<chain>/<address>
* http://localhost:3000/api/erc20//<chain>/<address>
* http://localhost:3000/api/nft/<chain>/<address>
* http://localhost:3000/api/poap/<chain>/<address>
* http://localhost:3000/api/address_history/<chain>/<address>

## Links

Deployed API on heroku: https://chainlink-hack-api.herokuapp.com/

