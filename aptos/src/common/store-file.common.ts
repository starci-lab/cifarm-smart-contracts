const writeAddresses = async (addresses: Addresses): Promise<void> => {
    const addressesContent = `*****
Cauliflower Token Address: ${addresses.cauliflowerTokenAddress}
Carrot Token Address: ${addresses.carrotTokenAddress}
NFT Address: ${addresses.nftAddress}
NFT Marketplace Address: ${addresses.nftMarketplaceAddress}
*****`
    let content = ""
    try {
        content = readFileSync(filePath, "utf-8")
    } catch (ex: unknown) {
    //file not exist
        console.log(ex)
    }
    const newContent = `${content}
${addressesContent}`
    writeFileSync(filePath, newContent)
}