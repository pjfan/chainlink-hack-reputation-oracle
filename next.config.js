/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    MORALIS_SERVER_URL: process.env.MORALIS_SERVER_URL,
    MORALIS_APP_ID: process.env.MORALIS_APP_ID,
  },
};
