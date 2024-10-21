import { Network } from "@/utils"
import { ARC19Metadata, ARC19Service } from "@/services"
import "dotenv/config"

const main = async () => {
    const arc19Service = new ARC19Service(
        Network.Testnet,
        process.env.ALGORAND_MNEMONIC_25 || "",
        {
            id: "premiumTile1",
            name: "Premium Tile"
        }
    )

    const metadata : Omit<ARC19Metadata, "collection"> = {
        name: `Premium Tile #${4}`,
        description: "A premium tile",
        image: "https://violet-lazy-yak-333.mypinata.cloud/ipfs/QmQVhu1DjgxzmGmJ8gS31CajXyzcL4g5LgEhDBRfd71cj9",
        image_integrity: "sha256-1",
        image_mimetype: "image/png",
        properties: {
            cuong: "cuong",
        }
    }
    await arc19Service.mint({
        metadata,
        index: 4,
        unitName: "CPT",
    })
}
main()