import { ethers } from "hardhat"

const grantRole = async () => {
    const nftContract = await ethers.getContractAt("NFT", "0xA871f915Dc331797d12625277Cd7Ae1cbad9f05d")
    const minter = await nftContract.MINTER()
    await nftContract.grantRole(minter, "0xf040893fd18D116E373CD0feA259EcC0194831B1")
}

grantRole()
//npx hardhat run --network fuji scripts/grant-roles.ts
