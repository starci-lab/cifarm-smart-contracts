import { HardhatUserConfig } from "hardhat/config"
import "@nomicfoundation/hardhat-toolbox"
import { readFileSync } from "fs"
import { join } from "path"

const config: HardhatUserConfig = {
    solidity: "0.8.24",
    networks: {
        fuji: {
            url: "https://avalanche-fuji-c-chain-rpc.publicnode.com",
            chainId: 43113,
            accounts: {
                mnemonic: readFileSync(join(process.cwd(), "mnemonic.key"), "utf-8"),
            },
        },
    },
    gasReporter: {
        currency: "ETH",
        enabled: true,
        gasPrice: 25,
    },
    mocha: {
        parallel: true
    },
    sourcify: {
        enabled: true
    }
}
//npx hardhat verify --network fuji 0xD47362B39B5265F83EC9059FD7a8B963140A5CeD
export default config
