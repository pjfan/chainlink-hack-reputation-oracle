Web3 Reputation Oracle built for Chainlink Spring 2022 Hackathon. Aggregates and synthesizes on-chain data using Moralis SDK and calculates a "reputation score" using it. Also allows users to connect wallet and edit/manage Decentralized Identity Data via CyberConnect / Ceramic.

Forked from CyberConnect API.

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

After installing the dependencies and setting config variables, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To build the project the project and run in production.

```bash
yarn build
yarn start
```

## Getting started with the backend API

Navigate to the /chainlink-hack-api directory and follow instructions in README.md.

## Getting started with the Chainlink adapter smart contract

Navigate to the /chainlink-hack-oracle-contracts directory and follow instructions in README.md.


## Links

* Deployed ReputationOracle: https://chainlink-hack-web3-rep-oracle.herokuapp.com/

* Deployed ReputationOracle API (for integration with Chainlink adapter): https://chainlink-hack-api.herokuapp.com/

* Address of Chainlink Adapter Smart Contract (on Kovan): 
