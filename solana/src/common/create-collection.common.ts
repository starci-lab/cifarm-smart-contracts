import 'dotenv/config'
import { umi as baseUmi } from './my-keypair.common'
import { generateSigner, percentAmount, Umi } from '@metaplex-foundation/umi';
import { createNft } from '@metaplex-foundation/mpl-token-metadata';

export interface CreateCollectionParams {
    name: string;
    uri: string;
    umi?: Umi
}

export const createCollection = async ({name, uri, umi}: CreateCollectionParams) => {
    umi = umi ?? baseUmi
    const collectionMint = generateSigner(umi);
    return await createNft(umi, {
        mint: collectionMint,
        name,
        uri,
        sellerFeeBasisPoints: percentAmount(0),
        isCollection: true,
      }).sendAndConfirm(umi);
}