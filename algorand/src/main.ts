import { Network } from "@/utils"
import { ARC19Metadata, ARC19Service, PolkadotUniqueNetworkService } from "@/services"
import "dotenv/config"

const main = async () => {
    // const arc19Service = new ARC19Service(
    //     Network.Testnet,
    //     process.env.ALGORAND_MNEMONIC_25 || "",
    //     {
    //         id: "premiumTile1",
    //         name: "Premium Tile"
    //     }
    // )

    // const metadata : Omit<ARC19Metadata, "collection"> = {
    //     name: `Premium Tile #${2}`,
    //     description: "A premium tile",
    //     image: "https://violet-lazy-yak-333.mypinata.cloud/ipfs/QmQVhu1DjgxzmGmJ8gS31CajXyzcL4g5LgEhDBRfd71cj9",
    //     image_integrity: "sha256-1",
    //     image_mimetype: "image/png",
    //     properties: {
    //         cuong: "cuong",
    //     }
    // }
    // await arc19Service.mint({
    //     metadata,
    //     index: 4,
    //     unitName: "CPT",
    // })
    const polkadotUniqueNetworkService = new PolkadotUniqueNetworkService(Network.Testnet, 
        process.env.POLKADOT_PRIVATE_KEY || "",
    )
    const address = await polkadotUniqueNetworkService.address()
    console.log(address)

    const balance = await polkadotUniqueNetworkService.balance()
    console.log(balance)

    // const collectionId = await polkadotUniqueNetworkService.createCollection({
    //     name: "Cifarm Ferile Collection",
    //     description: "A test collection",
    //     symbol: "CFC"
    // })
    // console.log(collectionId)
    // //4191
    const nftId = await polkadotUniqueNetworkService.mintNft({
        imageUrl: "https://violet-lazy-yak-333.mypinata.cloud/ipfs/QmQVhu1DjgxzmGmJ8gS31CajXyzcL4g5LgEhDBRfd71cj9",
        collectionId: 4191,
        name: "Cifarm Ferile NFT",
        attributes: [
            {
                trait_type: "cuong",
                value: "deptrai"
            }
        ]
    })
    console.log(nftId)
}
main()