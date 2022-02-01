"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("../../../src/index");
const config = {
    solidity: "0.7.3",
    fakeERC20Network: {
        tokens: [
            {
                name: "Gold Token",
                symbol: "GOLD",
            },
            {
                name: "Silver Token",
                symbol: "SILVER",
            },
        ],
    },
};
exports.default = config;
//# sourceMappingURL=hardhat.config.js.map