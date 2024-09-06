// SPDX-License-Identifier: 3.0
pragma solidity ^0.8.24;

interface INFTEvents {
    event Mint(address to, string tokenId, string tokenURI);
    event Update(string tokenId, string tokenURI);
}