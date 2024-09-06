// SPDX-License-Identifier: 3.0
pragma solidity ^0.8.24;

import {Roles} from "@openzeppelin/contracts/access/Roles.sol";
import {INFTErrors} from "../interfaces/INFTErrors.sol";

abstract contract NFTAccessControl is INFTErrors {
    using Roles for Roles.Role;
    Roles.Role private _minters;
    Roles.Role private _burners;

    modifier onlyMinters {
        if (!_minters.has(msg.sender)){
            throw UnauthorizedMinter(msg.sender);
        }
    }
    modifier onlyBurners {
        if (!_minters.has(msg.sender)){
            throw UnauthorizedBurner(msg.sender);
        }
    }
}