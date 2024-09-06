import { ethers } from "hardhat"
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers"
import { NFT, NFT__factory } from "../typechain-types"

export const initialize = async (): Promise<InitializeResult> => {
    //get the signers
    const signers = await ethers.getSigners()
    
    //nft contract deployments
    const nftFactory = new NFT__factory()
    const nftContract = await nftFactory
        .connect(signers[0])
        .deploy("CiFarm Premium Tile", "CPL")
        
    return {
        signers,
        contracts: {
            nftContract,
        },
    }
}

export interface InitializeResult {
  signers: Array<HardhatEthersSigner>;
  contracts: {
    nftContract: NFT;
  };
}