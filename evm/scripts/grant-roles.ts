import { ethers } from "hardhat"

const grantRole = async () => {
    const nftContract = await ethers.getContractAt("NFT", "0x08AB6dF254B47C6107C89d6155fCbec6Bc9CD13a")
    const minter = await nftContract.MINTER()
    await nftContract.grantRole(minter, "0xf040893fd18D116E373CD0feA259EcC0194831B1")
}

grantRole()
//npx hardhat run --network fuji scripts/grant-roles.ts
