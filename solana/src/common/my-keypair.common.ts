import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { keypairIdentity } from '@metaplex-foundation/umi';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { clusterApiUrl} from '@solana/web3.js';
import bs58 from 'bs58'

const rpcEndpoint = clusterApiUrl('devnet')
export const umi = createUmi(rpcEndpoint).use(mplTokenMetadata())
const privateKeyUint8Array = bs58.decode("5iXvAYQRZxXTKZU8fsx9H7GvdSvr8gw1hUuPm3h7bFcX5g4qwYH9PUptGA5JKhTBGZecnSCvrAqNqzNRQ3GgUG9u")
const myKeypair = umi.eddsa.createKeypairFromSecretKey(privateKeyUint8Array);
umi.use(keypairIdentity(myKeypair))
