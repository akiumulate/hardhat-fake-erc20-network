"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable-next-line no-implicit-dependencies
const chai_1 = __importStar(require("chai"));
const fetch_mock_1 = __importDefault(require("fetch-mock"));
const chai_as_promised_1 = __importDefault(require("chai-as-promised"));
const mocha_chai_jest_snapshot_1 = require("mocha-chai-jest-snapshot");
chai_1.default.use(chai_as_promised_1.default);
chai_1.default.use((0, mocha_chai_jest_snapshot_1.jestSnapshotPlugin)());
const hardhat_1 = require("hardhat");
const helpers_1 = require("./helpers");
const utils_1 = require("../src/utils");
describe("Utils - checkLocalhostNetwork", function () {
    (0, helpers_1.useEnvironment)("no-config");
    afterEach(() => {
        fetch_mock_1.default.reset();
    });
    it("Throws when localhost URL is falsey", async function () {
        let config = Object.assign({}, this.hre.config);
        config.networks.localhost.url = "";
        await (0, chai_1.expect)((0, utils_1.checkLocalhostNetwork)(config)).to.be.rejectedWith(Error);
    });
    it("Throws when localhost URL is does not respond", async function () {
        let config = Object.assign({}, this.hre.config);
        await (0, chai_1.expect)((0, utils_1.checkLocalhostNetwork)(config)).to.be.rejectedWith(Error);
    });
    it("Throws when response from local server is not status 200", async function () {
        let config = Object.assign({}, this.hre.config);
        fetch_mock_1.default.mock(config.networks.localhost.url, 500);
        await (0, chai_1.expect)((0, utils_1.checkLocalhostNetwork)(config)).to.be.rejectedWith(Error);
    });
    it("Returns true if response from local server is status 200", async function () {
        let config = Object.assign({}, this.hre.config);
        fetch_mock_1.default.mock(config.networks.localhost.url, 200);
        await (0, chai_1.expect)((0, utils_1.checkLocalhostNetwork)(config)).to.eventually.equal(true);
    });
});
describe("Utils - getInitialUserData", function () {
    (0, helpers_1.useEnvironment)("no-config");
    it("Returns an array of addresses and initialBalances", async function () {
        let accounts = await hardhat_1.ethers.getSigners();
        const initialMint = "1000000";
        const initialUsers = (0, utils_1.getInitialUserData)(accounts, initialMint);
        (0, chai_1.expect)(initialUsers.length).to.equal(accounts.length);
        (0, chai_1.expect)(initialUsers[0].hasOwnProperty("userAddress")).to.equal(true);
        (0, chai_1.expect)(initialUsers[0].userAddress).to.equal(accounts[0].address);
        (0, chai_1.expect)(initialUsers[0].hasOwnProperty("initialBalance")).to.equal(true);
        (0, chai_1.expect)(initialUsers[0].initialBalance).to.equal(initialMint);
    });
});
describe("Utils - displayTaskResults", function () {
    (0, helpers_1.useEnvironment)("no-config");
    it("The function should return string output", function () {
        const taskResults = {
            test1: "Success",
            test2: "Failed",
        };
        const results = (0, utils_1.getTaskResultsDisplay)(taskResults);
        (0, chai_1.expect)(results).toMatchSnapshot();
    });
});
//# sourceMappingURL=utils.test.js.map