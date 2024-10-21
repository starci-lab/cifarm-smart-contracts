"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PinataService = void 0;
require("dotenv/config");
const pino_1 = __importDefault(require("pino"));
const cid_1 = require("multiformats/cid");
const sdk_1 = __importDefault(require("@pinata/sdk"));
const algosdk_1 = __importDefault(require("algosdk"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
class PinataService {
    constructor() {
        this.apiKey = process.env.PINATA_API_KEY || "";
        this.apiSecret = process.env.PINATA_API_SECRET || "";
        this.client = new sdk_1.default(this.apiKey, this.apiSecret);
        (0, pino_1.default)().info(`PinataService initialized with apiKey: ${this.apiKey}`);
    }
    cidToReserveURL(cid) {
        const decoded = cid_1.CID.parse(cid);
        const { version } = decoded;
        const url = `template-ipfs://{ipfscid:${version}:dag-pb:reserve:sha2-256}`;
        const reserveAddress = algosdk_1.default.encodeAddress(Uint8Array.from(Buffer.from(decoded.multihash.digest)));
        return {
            url,
            reserveAddress,
        };
    }
    pinFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = fs_1.default.createReadStream(filePath);
            const options = {
                pinataMetadata: {
                    name: (0, uuid_1.v4)(),
                },
                pinataOptions: {
                    cidVersion: 0,
                },
            };
            const resultFile = yield this.client.pinFileToIPFS(file, options);
            (0, pino_1.default)().debug(`File pinned succesfully via PinataService. Hash: ${resultFile.IpfsHash}`);
            return resultFile;
        });
    }
    pinJSON(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                pinataMetadata: {
                    name: (0, uuid_1.v4)(),
                },
                pinataOptions: {
                    cidVersion: 0,
                },
            };
            const result = yield this.client.pinJSONToIPFS(data, options);
            (0, pino_1.default)().info(`JSON pinned succesfully via PinataService. Hash: ${result.IpfsHash}`);
            return result;
        });
    }
}
exports.PinataService = PinataService;
