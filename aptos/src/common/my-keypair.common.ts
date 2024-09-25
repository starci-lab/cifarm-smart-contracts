import { createUmi } from '@metaplex-foundation/umi-bundle-defaults';
import { keypairIdentity } from '@metaplex-foundation/umi';
import { mplTokenMetadata } from '@metaplex-foundation/mpl-token-metadata';
import { clusterApiUrl} from '@solana/web3.js';
import bs58 from 'bs58'
import 'dotenv/config'

const rpcEndpoint = clusterApiUrl('devnet')
export const umi = createUmi(rpcEndpoint).use(mplTokenMetadata())
const privateKeyUint8Array = bs58.decode(process.env.PRIVATE_KEY ?? "")
const myKeypair = umi.eddsa.createKeypairFromSecretKey(privateKeyUint8Array);
umi.use(keypairIdentity(myKeypair))
