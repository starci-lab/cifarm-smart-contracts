import {
  DataV2Args,
  findMetadataPda,
} from "@metaplex-foundation/mpl-token-metadata";
import {
  createAssociatedTokenAccount,
  createMint,
  mintTo,
  
} from "@solana/spl-token";
import {
  clusterApiUrl,
  Connection,
  Keypair,
} from "@solana/web3.js";
import bs58 from "bs58";
import { umi } from "./common";
import { createSignerFromKeypair, publicKey } from "@metaplex-foundation/umi";
import { createMetadataAccountV3 } from '@metaplex-foundation/mpl-token-metadata';

const flow = async () => {
  const url = clusterApiUrl("devnet");
  const connection = new Connection(url, {
    commitment: "confirmed",
  });
  const feePayer = Keypair.fromSecretKey(
    bs58.decode(
      "5iXvAYQRZxXTKZU8fsx9H7GvdSvr8gw1hUuPm3h7bFcX5g4qwYH9PUptGA5JKhTBGZecnSCvrAqNqzNRQ3GgUG9u"
    )
  );
  let mintPubkey = await createMint(
    connection, // conneciton
    feePayer, // fee payer
    feePayer.publicKey, // mint authority
    feePayer.publicKey, // freeze authority (you can use `null` to disable it. when you disable it, you can't turn it on again)
    9 // decimals
  );
  console.log(mintPubkey.toBase58());
  let ata = await createAssociatedTokenAccount(
    connection, // connection
    feePayer, // fee payer
    mintPubkey, // mint
    feePayer.publicKey // owner,
  );
  console.log(ata.toBase58());

  const to = Keypair.generate();
  let txhash = await mintTo(
    connection, // connection
    feePayer, // fee payer
    mintPubkey, // mint
    ata, // receiver (should be a token account)
    feePayer, // mint authority
    1e15 // amount. if your decimals is 8, you mint 10^8 for 1 token.
  );
  console.log(txhash);
};

const flow2 = async () => {
    const signer = Keypair.fromSecretKey(
        bs58.decode(
          "5iXvAYQRZxXTKZU8fsx9H7GvdSvr8gw1hUuPm3h7bFcX5g4qwYH9PUptGA5JKhTBGZecnSCvrAqNqzNRQ3GgUG9u"
        )
      );
  const metadataPDA = findMetadataPda(umi, {
    mint: publicKey("FnQEAh9NNPzE26Z8iBq9onU3gzynGeHbPVy8gdwHFYee"),
  }); // This is derived from the mint account's public key
  const createNewTokenTransaction = await createMetadataAccountV3(umi, {
    metadata: metadataPDA,
    mint: publicKey("FnQEAh9NNPzE26Z8iBq9onU3gzynGeHbPVy8gdwHFYee"),
    mintAuthority: createSignerFromKeypair(umi, {
        publicKey: publicKey(signer.publicKey.toBase58()),
        secretKey: signer.secretKey,
    }),
    data: {
        name: "$CARROT Token",
        symbol: "$CARROT",
        uri: "https://token-creator-lac.vercel.app/token_metadata.json",
        sellerFeeBasisPoints: 0,
        collection: null,
        creators: null,
        uses: null
      },
    collectionDetails: null,
    isMutable: true,
  }).sendAndConfirm(umi);
  console.log(createNewTokenTransaction);
};

flow()
//flow2()