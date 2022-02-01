"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../../src/index");
const config = {
    solidity: "0.7.3",
    fakeERC20Network: {
        tokens: [
            {
                name: "Gold",
                symbol: "GLD",
                defaultMintAmount: "80000000000000000000",
            },
            {
                name: "Silver",
                symbol: "SLV",
                defaultMintAmount: "600000000000000000000",
            },
            {
                name: "Bronze",
                symbol: "BRZ",
            },
        ],
        defaultMintAmount: "80000000000000000000",
    },
};
exports.default = config;
//# sourceMappingURL=hardhat.config.js.map