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
const chai_1 = __importStar(require("chai"));
const chai_as_promised_1 = __importDefault(require("chai-as-promised"));
const mocha_chai_jest_snapshot_1 = require("mocha-chai-jest-snapshot");
const sinon_1 = __importDefault(require("sinon"));
const mute_1 = __importDefault(require("mute"));
chai_1.default.use(chai_as_promised_1.default);
chai_1.default.use((0, mocha_chai_jest_snapshot_1.jestSnapshotPlugin)());
const helpers_1 = require("./helpers");
const utils = __importStar(require("../src/utils"));
describe("Task", function () {
    (0, helpers_1.useEnvironment)("full-config");
    let getInitialUserDataSPY = sinon_1.default.spy(utils, "getInitialUserData");
    let getTaskResultsDisplaySPY = sinon_1.default.spy(utils, "getTaskResultsDisplay");
    afterEach(function () {
        sinon_1.default.reset();
    });
    after(function () {
        sinon_1.default.restore();
    });
    it("Task - Throws if local network not detected and exits", async function () {
        let ethersGetSignersSPY = sinon_1.default.spy(this.hre.ethers, "getSigners");
        let ethersContractFactorySPY = sinon_1.default.spy(this.hre.ethers, "ContractFactory");
        await (0, chai_1.expect)(this.hre.run(utils.TASK_NAME)).to.be.rejectedWith(Error);
        // Expect the task to end so the following functions are not called
        (0, chai_1.expect)(ethersGetSignersSPY.called).to.equal(false);
        (0, chai_1.expect)(ethersContractFactorySPY.called).to.equal(false);
        (0, chai_1.expect)(getInitialUserDataSPY.called).to.equal(false);
    });
    it("Task - Task completes successfully", async function () {
        const tokenNumber = this.hre.config.fakeERC20Network.tokens.length;
        let ethersContractFactorySPY = sinon_1.default.spy(this.hre.ethers, "ContractFactory");
        //Setup stubs and spies5
        sinon_1.default.stub(console, "log");
        const checkLocalhostNetworkSTUB = sinon_1.default
            .stub(utils, "checkLocalhostNetwork")
            .returns(Promise.resolve(true));
        /*
            Run task

            Note: Using mute package to suppress the output from Ora.
            Ora uses process.stderr.write instead of console.log.
        */
        let unmute = (0, mute_1.default)();
        await this.hre.run(utils.TASK_NAME).finally(unmute);
        //Tests
        (0, chai_1.expect)(checkLocalhostNetworkSTUB.called).to.equal(true);
        (0, chai_1.expect)(ethersContractFactorySPY.called).to.equal(true);
        (0, chai_1.expect)(getInitialUserDataSPY.callCount).to.equal(tokenNumber);
        (0, chai_1.expect)(getTaskResultsDisplaySPY.calledOnce).to.equal(true);
        (0, chai_1.expect)(getTaskResultsDisplaySPY.firstCall.args[0]).toMatchSnapshot();
        checkLocalhostNetworkSTUB.restore();
    });
});
//# sourceMappingURL=task.test.js.map