import { Network, AptosConfig, Aptos, Account, Ed25519PrivateKey, Ed25519PublicKey, AccountAddress } from "@aptos-labs/ts-sdk"
async function main() {
  const APTOS_NETWORK: Network = Network.TESTNET;
  const config = new AptosConfig({ network: APTOS_NETWORK });
  const aptos = new Aptos(config);

  const creator = Account.fromPrivateKey({
    privateKey: new Ed25519PrivateKey("0xd5468cc050f5f3f638dfcc3f002a8cf89e4cb0a1f32362dbd09ca2a7329d98aa")
  }); 

  // const createCollectionTransaction = await aptos.createCollectionTransaction({
  //   creator,
  //   description: "NFT TILEEE",
  //   name: "CiFarm Premium Tile Collection",
  //   uri: "",
  // });
   
  // const committedTxn = await aptos.signAndSubmitTransaction({
  //   signer: creator,
  //   transaction: createCollectionTransaction,
  // });

    // const mintTokenTransaction = await aptos.mintDigitalAssetTransaction({
    //   creator: creator,
    //   collection: "CiFarm Premium Tile Collection",
    //   description: "NFT TILEEE",
    //   name: "CiFarm Premium Tile " + 3,
    //   uri: "",
    // });

    // await aptos.signAndSubmitTransaction({
    //   signer: creator,
    //   transaction: mintTokenTransaction,
    // });

    const tx = await aptos.transferDigitalAssetTransaction({
      recipient: AccountAddress.from("0x7009896a064b72436fbd169989130be11cdf134bdf20dff4313343ad5ccd564d"),
      digitalAssetAddress: "0x787ecdf9d1868ea255727acbd13eda22cde3d67b9342a14fe2d9a3d136e8136c",
      sender: creator,
    })
         await aptos.signAndSubmitTransaction({
      signer: creator,
     transaction: tx,
     });
}
main()