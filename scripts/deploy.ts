import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();

  const NFT = await ethers.getContractFactory("FaithNFT");
  const nft = await NFT.deploy("FITAMA", "FTM");
  await nft.deployed();

  console.log(`Your Nft has been deployed to this Address: ${nft.address}`);

  const balance = await nft.balanceOf(owner.address);

  console.log(`Your balance is: ${balance}`);

  const name = await nft.name();

  const symbol = await nft.symbol();

  const owner1 = await nft.owner();

  const ownerOf = await nft.ownerOf(0);

  const tokenURI = await nft.tokenURI(0);

  console.log(`Details of your nft are as follows: name = ${name}, symbol = ${symbol}, owner is = ${owner1}, the owner of tokenId 1 = ${ownerOf}, with a url of ${tokenURI} thank you.`);
  




  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
