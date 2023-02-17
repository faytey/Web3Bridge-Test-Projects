import { ethers } from "hardhat";

async function main() {
  //uniswap router address
  const ROUTER = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";
  //dai token address
  const DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  //uni token address
  const UNI = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
  //dai holder
  const DAIHolder = "0x748dE14197922c4Ae258c7939C7739f3ff1db573";

  const paths = [DAI, "0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0", UNI];
  const path2 = ["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", DAI];
  const path3 = [DAI, "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"];
  let time = 1686588399;

  const Uniswap = await ethers.getContractAt("IUniswapV2Router01", ROUTER);

  const helpers = require("@nomicfoundation/hardhat-network-helpers");
  await helpers.impersonateAccount(DAIHolder);
  const impersonatedSigner = await ethers.getSigner(DAIHolder);

  const DaiContract = await ethers.getContractAt("Itokens", DAI);

  const UniContract = await ethers.getContractAt("Itokens", UNI);

  const holderBalance = await DaiContract.balanceOf(DAIHolder);
  console.log(`Dai balance before ${holderBalance}`);

  const uniBalance = await UniContract.balanceOf(DAIHolder);
  console.log(`uniBalance ${uniBalance}`);

  const amount = await ethers.utils.parseEther("100");
  const amount1 = await ethers.utils.parseEther("2000");

// QUESTION 1: ADDING LIQUIDITY
  await DaiContract.connect(impersonatedSigner).approve(ROUTER,amount1);

  await UniContract.connect(impersonatedSigner).approve(ROUTER,amount);

  await Uniswap.connect(impersonatedSigner).addLiquidity(DAI,UNI,amount,amount,0,0,impersonatedSigner.address,time);

  const holderBalance1 = await DaiContract.balanceOf(DAIHolder);
  console.log(`Dai balance after ${holderBalance1}`);

  const uniBalance1 = await UniContract.balanceOf(DAIHolder);
  console.log(`uniBalance after ${uniBalance1}`);
  
// QUESTION 2: ADD LIQUIDITY ETH
console.log(`your ethereum balance is ${ethers.provider.getBalance(impersonatedSigner.address)}`);

await Uniswap.connect(impersonatedSigner).addLiquidityETH(DAI,amount1,0,0,impersonatedSigner.address,time, {value: 10});

const holderBalance2 = await DaiContract.balanceOf(DAIHolder);
console.log(`Dai balance after ethereum ${holderBalance2}`);
console.log(`your ethereum balance is ${ethers.provider.getBalance(impersonatedSigner.address)}`);

// QUESTION 3: REMOVE LIQUIDITY
await Uniswap.connect(impersonatedSigner).removeLiquidity(DAI,UNI,10,0,0,impersonatedSigner.address,time);

const holderBalance3 = await DaiContract.balanceOf(DAIHolder);
console.log(`Dai balance after ${holderBalance3}`);

const uniBalance2 = await UniContract.balanceOf(DAIHolder);
console.log(`uniBalance after ${uniBalance2}`);

  }


// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
