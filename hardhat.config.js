/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");

const ALCHEMY_API_KEY = "2NutxW5s38ibtgH7MnQ2OJJ98hFOB-uW";
const ROPSTEN_PRIVATE_KEY =
  "97704492cf1782ea10d482c3916b996674f7016a7d914de6daa9a09a2662a45d";
module.exports = {
  solidity: "0.8.12",
  networks: {
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${ROPSTEN_PRIVATE_KEY}`],
    },
  },
};

// deployed token address = 0xf841d0ad54F50E3b8984A54C615da16D02bb3585
