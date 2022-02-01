"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("hardhat/config");
require("@nomiclabs/hardhat-ethers");
const tasks_1 = require("./tasks");
const utils_1 = require("./utils");
require("./types/type-extensions");
(0, config_1.extendConfig)((config, userConfig) => {
    //Merge default settings and userConfig for fakeERC20Network
    config.fakeERC20Network = Object.assign(Object.assign({}, utils_1.defaultSettings), userConfig.fakeERC20Network);
});
(0, config_1.task)(utils_1.TASK_NAME, "Deploys fake ERC20 tokens to your localhost network").setAction(tasks_1.deployTokens);
//# sourceMappingURL=index.js.map