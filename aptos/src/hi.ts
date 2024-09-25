import { Network, AptosConfig, Aptos, Account, Ed25519PrivateKey, Ed25519PublicKey, AccountAddress } from "@aptos-labs/ts-sdk"
async function main() {
  const APTOS_NETWORK: Network = Network.TESTNET;
  const config = new AptosConfig({ network: APTOS_NETWORK });
  const aptos = new Aptos(config);

  const creator = Account.fromPrivateKey({
    privateKey: new Ed25519PrivateKey("0x4c601560512d632f01115bf896875f810ccfd054360821c1f8e6f4c3ecbed633")
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

    const tx= await aptos.transferDigitalAssetTransaction({
      recipient: AccountAddress.from("0x952cd4d00514fd1eb9cc3e2e683c1a2e1815cd3a06aee3356151c42cb1943d90"),
      digitalAssetAddress: "0x7b08b5c2ab654d75fd5b4a24b834be00b8c7621ec23f3e674b2517fd8fbf463b",
      sender: creator,
    })
         await aptos.signAndSubmitTransaction({
      signer: creator,
     transaction: tx,
     });
}
main()