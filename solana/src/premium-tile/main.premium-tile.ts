import { createNft, findMetadataPda, verifyCollectionV1 } from "@metaplex-foundation/mpl-token-metadata";
import { createSignerFromKeypair, generateSigner, keypairIdentity, percentAmount } from "@metaplex-foundation/umi";
import bs58 from 'bs58'
import { umi } from "../common";

export const main = async () => {
    //create nft collection
    
    // const collectionMint = generateSigner(umi);
    // console.log(bs58.encode(collectionMint.secretKey))
    const colelctionMintPrivateKey = "317cQz7GfSnYPbVrRoeWsxzZENTdZS5iqfhrQfyppasYCTBk15FmUZvUpm3cJmQV7RyJkpGnjpGw1cqWMDAPkQQy"
    const privateKeyUint8Array = bs58.decode(colelctionMintPrivateKey)
    const collectionKeypair = umi.eddsa.createKeypairFromSecretKey(privateKeyUint8Array);
    const collectionMint = createSignerFromKeypair(umi, collectionKeypair)

    // await createNft(umi, {
    //     mint: collectionMint,
    //     name: "CiFarm Premium Tile Collection",
    //     uri: "https://arweave.net/123",
    //     sellerFeeBasisPoints: percentAmount(0),
    //     isCollection: true,
    //   }).sendAndConfirm(umi);

    //create nft
    for (let i = 2; i < 11; i++) {
        const mint = generateSigner(umi);
        const { signature, result } = await createNft(umi, {
            mint,
            name: "Premium Tile #" + i,
            uri:"",
            updateAuthority: umi.identity.publicKey,
            sellerFeeBasisPoints: percentAmount(0),
            collection: { key: collectionMint.publicKey, verified: false },
          }).sendAndConfirm(umi, { send: { commitment: "finalized" } });
          const metadata = findMetadataPda(umi, { mint: mint.publicKey });
          await verifyCollectionV1(umi, {
            metadata,
            collectionMint: collectionMint.publicKey,
            authority: umi.identity,
          }).sendAndConfirm(umi);
    }
    const mint = generateSigner(umi);

}
main()