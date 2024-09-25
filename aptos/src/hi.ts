import { Network, AptosConfig, Aptos, Account, Ed25519PrivateKey } from "@aptos-labs/ts-sdk"
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

    const mintTokenTransaction = await aptos.mintDigitalAssetTransaction({
      creator: creator,
      collection: "CiFarm Premium Tile Collection",
      description: "NFT TILEEE",
      name: "CiFarm Premium Tile " + 3,
      uri: "",
    });
     
    await aptos.signAndSubmitTransaction({
      signer: creator,
      transaction: mintTokenTransaction,
    });
}
main()