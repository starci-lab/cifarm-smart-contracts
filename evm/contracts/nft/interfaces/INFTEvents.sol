// SPDX-License-Identifier: 3.0
pragma solidity ^0.8.24;

interface INFTEvents {
    event Mint(address indexed to, uint256 indexed tokenId);
    event TokenURIUpdated(uint256 indexed tokenId);
    event Burn(uint256 indexed tokenId);
}