require("@nomiclabs/hardhat-waffle");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    ropsten: {
      url: "https://ropsten.infura.io/v3/0161b01382d9401082691936666bcc3c",
      accounts: [`0xfb339eeedbca2ffefd3ef9a9a0a9d45a35f86b7e841b79eacd593ae5d66335ba`]
    },
    kovan: {
      url: "https://kovan.infura.io/v3/0161b01382d9401082691936666bcc3c",
      accounts: [`0x10c3c64aefc61871deff7cec18d1102fe859f45214da030155af6f5c9d11c075`]
    }
  }
};
