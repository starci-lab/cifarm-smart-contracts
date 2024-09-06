// SPDX-License-Identifier: 3.0
pragma solidity ^0.8.24;

import {INFT} from "./interfaces/INFT.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

contract NFT is INFT, ERC721URIStorage, Ownable {
    uint256[] private _tokenIds;

    

    constructor(
        string memory _name,
        string memory _symbol,
        address minter
    ) ERC721(_name, _symbol) Ownable(msg.sender)  {}

    function mint(
        address to,
        string memory tokenURI
    ) onlyOwner external override returns (uint256 tokenId) {
        tokenId = _tokenIds[_tokenIds.length - 1] + 1;
        _tokenIds.push(tokenId);

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
    }

    function updateURI(
        uint256 tokenId,
        string memory tokenURI
    ) onlyOwner external override {
        _setTokenURI(tokenId, tokenURI);
    }
}