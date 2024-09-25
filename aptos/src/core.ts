import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { generateSigner, percentAmount, keypairIdentity } from '@metaplex-foundation/umi';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey} from '@solana/web3.js';
import { nftStorageUploader } from '@metaplex-foundation/umi-uploader-nft-storage'
import { createNft } from '@metaplex-foundation/mpl-token-metadata'
import bs58 from 'bs58'


const NFT_STORAGE_API = "2047e12c.7d1136ebe503483a8e4a968a47cd42d6"

// Create a connection to devnet
const rpcEndpoint = clusterApiUrl('devnet');
const connection = new Connection(rpcEndpoint)

// Create umi instance and use nftStorage & Token Metadata plugins
const umi = createUmi(rpcEndpoint)
    .use(nftStorageUploader({ token: NFT_STORAGE_API, endpoint: new URL("https://preserve.nft.storage/api/v1/collection/add_tokens")}))
    .use(mplTokenMetadata())


// Generate a new keypair to mint to/from
//const myKeypair = umi.eddsa.generateKeypair();

// Or use your own wallet by uncommenting the next lines (and comment the keypair above)
const privateKey = '5iXvAYQRZxXTKZU8fsx9H7GvdSvr8gw1hUuPm3h7bFcX5g4qwYH9PUptGA5JKhTBGZecnSCvrAqNqzNRQ3GgUG9u'
const privateKeyUint8Array = bs58.decode(privateKey)
const myKeypair = umi.eddsa.createKeypairFromSecretKey(privateKeyUint8Array);

// Register the identity with Umi
umi.use(keypairIdentity(myKeypair))


// Wrapper function for awaits
const doit = async () => {

    // If there isnt a keypair return
    if (!myKeypair) return

    // Lets get our balance
    const myPublicKey = new PublicKey(myKeypair.publicKey)
    let balance = await connection.getBalance(myPublicKey)

    console.log(`Address: ${myPublicKey.toBase58()}`)
    console.log(`Balance: ${balance / LAMPORTS_PER_SOL} SOL`)

    // Balance check, request airdrop if needed
    if (balance < 0.05){
        console.log("Requesting airdrop")
        await connection.requestAirdrop(myPublicKey, LAMPORTS_PER_SOL)
        
        // Sleep 2 seconds before refreshing balance
        await new Promise(r => setTimeout(r, 5000));
        balance = await connection.getBalance(myPublicKey)
        console.log(`New balance: ${balance / LAMPORTS_PER_SOL} SOL`)

    }

    //Create Metadata JSON
    // const uri = await umi.uploader.uploadJson({
    //     name: 'My NFT',
    //     description: 'This is my NFT',
    //     image: "https://solana.com/src/img/branding/solanaLogoMark.png"
    // })

    // console.log(`Metadata uploaded: ${uri}`)

    //Mint NFT
    const mint = generateSigner(umi)
    const nft = await createNft(umi, {
        mint,
        name: 'My NFT',
        uri: "https://solana.com/src/img/branding/solanaLogoMark.png",
        sellerFeeBasisPoints: percentAmount(5.5),
    }).sendAndConfirm(umi)

    // // Output the transaction signature
    console.log(`Done: https://explorer.solana.com/tx/${bs58.encode(nft.signature)}?cluster=devnet`)
}

// Call our function
doit()