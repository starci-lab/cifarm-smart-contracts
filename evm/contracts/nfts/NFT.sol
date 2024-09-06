// SPDX-License-Identifier: 3.0
pragma solidity ^0.8.24;

import {INFT} from "./interfaces/INFT.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {AccessControlDefaultAdminRules} from "@openzeppelin/contracts/access/extensions/AccessControlDefaultAdminRules.sol";
import {INFTErrors} from "./interfaces/INFTErrors.sol";

contract NFT is INFT, ERC721URIStorage, AccessControlDefaultAdminRules {
    uint256[] private _tokenIds;

    bytes32 public immutable MINTER = keccak256("MINTER");
    bytes32 public immutable BURNER = keccak256("BURNER");

    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) AccessControlDefaultAdminRules(0, msg.sender) {}

    function _baseURI() internal view virtual override returns (string memory) {
        return "https://ipfs.io/ipfs/";
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        virtual
        override(ERC721URIStorage, AccessControlDefaultAdminRules)
        returns (bool)
    {
        return (ERC721.supportsInterface(interfaceId));
    }

    function mint(
        address to,
        string memory tokenURI
    ) external override onlyRole(MINTER) returns (uint256 tokenId) {
        tokenId = _tokenIds[_tokenIds.length - 1] + 1;
        _tokenIds.push(tokenId);

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);

        emit Mint(to, tokenId);
    }

    function setTokenURI(
        uint256 tokenId,
        string memory tokenURI
    ) external override onlyRole(MINTER) {
        _setTokenURI(tokenId, tokenURI);

        emit TokenURISet(tokenId);
    }

    function burn(uint256 tokenId) external override onlyRole(BURNER) {
        _burn(tokenId);

        emit Burn(tokenId);
    }
}
