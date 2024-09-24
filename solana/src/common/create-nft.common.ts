import { umi as baseUmi } from './my-keypair.common'
import { createNft as metaplexCreateNft } from '@metaplex-foundation/mpl-token-metadata';
import { generateSigner, percentAmount, Umi, publicKey } from '@metaplex-foundation/umi';

export interface CreateNftParams {
    name: string;
    uri: string;
    umi?: Umi;
    collectionKey: string,
}
export const createNft = async ({name, uri, umi, collectionKey }: CreateNftParams) => {
    umi = umi ?? baseUmi
    const nftMint = generateSigner(umi);
    const publicKeySigner = publicKey(collectionKey)
    return await metaplexCreateNft(umi, {
        mint: nftMint,
        name,
        uri,
        sellerFeeBasisPoints: percentAmount(0),
        collection: {
            key: publicKeySigner ,
            verified: false,
        }
      }).sendAndConfirm(umi);
}