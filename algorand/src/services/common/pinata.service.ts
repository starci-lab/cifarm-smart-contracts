import "dotenv/config"
import logger from "pino"
import { CID } from "multiformats/cid"
import PinataSDK, { PinataPinOptions } from "@pinata/sdk"
import algosdk from "algosdk"
import PinataClient from "@pinata/sdk"
import fs from "fs"
import { v4 } from "uuid"

export class PinataService {
    private apiKey: string
    private apiSecret: string
    private client: PinataClient

    constructor() {
        this.apiKey = process.env.PINATA_API_KEY || ""
        this.apiSecret = process.env.PINATA_API_SECRET || ""
        this.client = new PinataSDK(this.apiKey, this.apiSecret)
        logger().info(`PinataService initialized with apiKey: ${this.apiKey}`)
    }

    cidToReserveURL(cid: string) {
        const decoded = CID.parse(cid)
        const { version } = decoded
        const url = `template-ipfs://{ipfscid:${version}:dag-pb:reserve:sha2-256}`
        const reserveAddress = algosdk.encodeAddress(
            Uint8Array.from(Buffer.from(decoded.multihash.digest))
        )
        return {
            url,
            reserveAddress,
        }
    }

    public async pinFile(filePath: string) {
        const file = fs.createReadStream(filePath)
        const options: PinataPinOptions = {
            pinataMetadata: {
                name: v4(),
            },
            pinataOptions: {
                cidVersion: 0,
            },
        }
        const resultFile = await this.client.pinFileToIPFS(file, options)
        logger().debug(`File pinned succesfully via PinataService. Hash: ${resultFile.IpfsHash}`)
        return resultFile
    }

    public async pinJSON(data: object) {
        const options: PinataPinOptions = {
            pinataMetadata: {
                name: v4(),
            },
            pinataOptions: {
                cidVersion: 0,
            },
        }
        const result = await this.client.pinJSONToIPFS(data, options)
        logger().info(`JSON pinned succesfully via PinataService. Hash: ${result.IpfsHash}`)
        return result
    }
}
