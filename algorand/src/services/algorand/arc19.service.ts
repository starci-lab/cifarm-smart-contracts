import { Algodv2, waitForConfirmation } from "algosdk"
import { PinataService } from "../common"
import { Atomic, Network } from "@/utils"
import algosdk, { mnemonicToSecretKey, Account } from "algosdk"
import logger from "pino"

export interface ARC19Collection {
    id: string,
    name: string,
}

export interface ARC19Metadata {
    name: string;
    collection: ARC19Collection
    description: string;
    //image, for better display on the marketplace
    image: string;
    image_integrity: string; 
    image_mimetype: string;
    //data, for the actual content of the NFT
    properties: Record<string, Atomic>
  }

export interface MintParams {
    metadata: Omit<ARC19Metadata, "collection">
    index: number
    unitName: string
}

export class ARC19Service {
    //services
    private pinataService: PinataService
    
    //base
    private client: Algodv2
    private account: Account

    constructor(
        //network
        private readonly network: Network,
        //private key
        //algorand use 25-words mnemonic phrase like private key
        private readonly mnemonic25: string,
        //collection
        private readonly collection: ARC19Collection
    ) {
        const TESTNET_ALGOD_SERVER_URL = "https://testnet-api.algonode.cloud"
        const MAINNET_ALGOD_SERVER_URL = "https://mainnet-api.algonode.cloud"  
        const networkMap: Record<Network, string> = {
            [Network.Mainnet]: MAINNET_ALGOD_SERVER_URL,
            [Network.Testnet]: TESTNET_ALGOD_SERVER_URL
        }  
        this.client = new Algodv2("", networkMap[network])
        this.pinataService = new PinataService()
        this.account = mnemonicToSecretKey(mnemonic25)
    }

    public async mint({ metadata, index, unitName }: MintParams) {
        const _metadata: ARC19Metadata = {
            ...metadata,
            collection: this.collection
        }

        const { IpfsHash } = await this.pinataService.pinJSON(_metadata)
        logger().info(`Metadata pinned to IPFS with hash: ${IpfsHash}`)

        const { reserveAddress, url } = this.pinataService.cidToReserveURL(IpfsHash)
        logger().info(`Reserve address: ${reserveAddress}`)

        const params = await this.client.getTransactionParams().do()

        const enc = new TextEncoder()
        const encNote: Uint8Array = enc.encode(JSON.stringify(_metadata))

        const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
            sender: this.account.addr,
            total: 1,
            decimals: 0,
            assetName: this.collection.name + index.toString(),
            unitName: unitName + index.toString(),
            assetURL: url,
            defaultFrozen: false,
            freeze: this.account.addr,
            manager: this.account.addr,
            clawback: this.account.addr,
            reserve: reserveAddress,
            note: encNote,
            suggestedParams: params,
        })

        const signedTxn = txn.signTxn(this.account.sk)

        // Submit the transaction
        const { txid } = await this.client.sendRawTransaction(signedTxn).do()
        logger().info(`Transaction ${txid} created. Minting NFT...`)
    
        // Wait for confirmation
        const confirmedTxn = await waitForConfirmation(
            this.client,
            txid,
            4
        )
        // Get the completed Transaction
        logger().info(`Transaction ${txid} confirmed. Nft minted with id: ${confirmedTxn.assetIndex}`)
    }
}