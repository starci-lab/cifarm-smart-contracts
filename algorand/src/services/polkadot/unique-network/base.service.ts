import { Network } from "@/utils"
import { Sr25519Account } from "@unique-nft/sr25519"
import { UniqueChain } from "@unique-nft/sdk"
import logger from "pino"
import { hexToU8a } from "@polkadot/util"
export interface PolkadotUniqueNetworkCreateCollectionParams {
  name: string;
  description: string;
  symbol: string;
}

export interface PolkadotUniqueNetworkMintParams {
  imageUrl: string;
  collectionId: number;
  name: string;
  attributes: Array<{
    value: string | number;
    trait_type: string;
    display_type?: string | undefined;
  }>;
}

export class PolkadotUniqueNetworkService {
    private account: ReturnType<typeof Sr25519Account.other.fromSecretKeyBytes>
    private client: ReturnType<typeof UniqueChain>
    constructor(
    //network
    private readonly network: Network,
    //private key
    private readonly privateKey: string,
    ) {
        this.account = Sr25519Account.other.fromSecretKeyBytes(hexToU8a(privateKey))
        const MAINNET_UNIQUE_CHAIN_SERVER_URL =
      "https://rest.unique.network/v2/unique"
        const TESTNET_UNIQUE_CHAIN_SERVER_URL =
      "https://rest.unique.network/v2/opal"
        const networkMap: Record<Network, string> = {
            [Network.Mainnet]: MAINNET_UNIQUE_CHAIN_SERVER_URL,
            [Network.Testnet]: TESTNET_UNIQUE_CHAIN_SERVER_URL,
        }
        this.client = UniqueChain({
            baseUrl: networkMap[network],
            account: this.account,
        })
    }
    public async address() {
        return this.account.address
    }
    
    public async balance() {
        const balance = await this.client.balance.get({
            address: this.account.address,
        })
        return balance
    }

    public async createCollection({
        name,
        description,
        symbol,
    }: PolkadotUniqueNetworkCreateCollectionParams) {
        try {
            const createCollectionTx = await this.client.collection.create({
                name,
                description,
                symbol,
            })
            return createCollectionTx.result.collectionId
        } catch (error) {
            logger().error(error)
        }
    }

    public async mintNft({
        imageUrl,
        collectionId,
        name,
        attributes,
    }: PolkadotUniqueNetworkMintParams) {
        logger().info({
            collectionId,
            tokens: [
                {
                    data: {
                        image: imageUrl,
                        name,
                        attributes,
                    },
                },
            ],
        })
        const mintTx = await this.client.token.mintNFTs({
            collectionId,
            tokens: [
                {
                    data: {
                        image: imageUrl,
                        name,
                        attributes,
                    },
                },
            ],
        })
        return mintTx.result[0].tokenId
    }
}
