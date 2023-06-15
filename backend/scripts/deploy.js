const hre = require("hardhat");

//* How to change this file
/*
- Fill in the `ContractName` with your contract name.
- Uncomment the verification process if you want to verify your contract but make sure to uncomment the same in the `hardhat.config.js` and change the values as required.

You can pass in values into your contract like doing the following :
ex : Asssume you have a string and a number to pass
` const lock = await Lock.deploy("hello", 5);`
*/

//* Sample Deployment
/*
  const Lock = await hre.ethers.getContractFactory("ContractName");
  const lock = await Lock.deploy();

  await lock.deployed();

  console.log("Contract Deployed to : ", lock.address);

  console.log("Sleeping...");
  await sleep(50000);
  await hre.run("verify:verify", {
    address: lock.address,
    constructorArguments: [],
  });
*/

async function main() {
  const CRYPTO_DEVS_NFT_CONTRACT_ADDRESS = "0x5843d514562F0ebccd00f9F284BC1720d9d14F1e";

  const fakeNftMarketPlace = await hre.ethers.getContractFactory("FakeNFTMarketplace");
  const deployedFakeNftMarketPlace = await fakeNftMarketPlace.deploy();
  await deployedFakeNftMarketPlace.deployed();

  console.log('Deployed fake nft marketplace to', deployedFakeNftMarketPlace.address);

  const cryptoDevsDAO = await hre.ethers.getContractFactory("CryptoDevsDAO");
  const deployedCryptoDevsDAO = await cryptoDevsDAO.deploy(
    deployedFakeNftMarketPlace.address,
    CRYPTO_DEVS_NFT_CONTRACT_ADDRESS,
    { value: hre.ethers.utils.parseEther("1") }
  );
  await deployedCryptoDevsDAO.deployed();

  console.log('Deployed DAO contract to', deployedCryptoDevsDAO.address);
}

// Async Sleep function
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
