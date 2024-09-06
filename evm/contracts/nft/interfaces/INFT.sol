// SPDX-License-Identifier: 3.0
pragma solidity ^0.8.24;

import {INFTWrite} from "./INFTWrite.sol";
import {INFTEvents} from "./INFTEvents.sol";

interface INFT is INFTWrite, INFTEvents {}