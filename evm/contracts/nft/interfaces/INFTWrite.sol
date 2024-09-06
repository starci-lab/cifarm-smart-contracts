// SPDX-License-Identifier: 3.0
pragma solidity ^0.8.24;

interface INFTWrite {
    function mint(
        address to,
        string memory tokenURI
    ) external returns (uint256 tokenId);

    function setTokenURI(uint256 tokenId, string memory tokenURI) external;

    function burn(uint256 tokenId) external;
}
