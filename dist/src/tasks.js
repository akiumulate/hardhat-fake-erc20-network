"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployTokens = void 0;
const ora_1 = __importDefault(require("ora"));
const utils_1 = require("./utils");
const ERC20FakeFactory_json_1 = __importDefault(require("../artifacts/contracts/ERC20FakeFactory.sol/ERC20FakeFactory.json"));
async function deployTokens(_, hre) {
    var _a;
    const { config, ethers } = hre;
    //Check to make sure a network is running on localhost
    await (0, utils_1.checkLocalhostNetwork)(config);
    const { fakeERC20Network } = config;
    //Get all the users on the network
    const accounts = await ethers.getSigners();
    //Get the ERC20 Factory ABI
    const contractFactory = new ethers.ContractFactory(ERC20FakeFactory_json_1.default.abi, ERC20FakeFactory_json_1.default.bytecode, accounts[0]);
    const spinner = (0, ora_1.default)();
    //Iterate over each token to deploy the ERC20FakeFactory contract on the local network and
    //mint the token for each signer
    const taskResults = {};
    for (let token of fakeERC20Network.tokens) {
        spinner.start(`Deploying: ${token.name} (${token.symbol})`);
        //Get an array for each user and their initial token balance
        const initialMintAmount = (_a = token.defaultMintAmount) !== null && _a !== void 0 ? _a : fakeERC20Network.defaultMintAmount;
        let initialUsers = (0, utils_1.getInitialUserData)(accounts, initialMintAmount);
        //Deploy the token and wait until it is mined on the local network
        try {
            let contract = await contractFactory.deploy(token.name, token.symbol, initialUsers);
            await contract.deployTransaction.wait();
            spinner.succeed(`Token Deployed: ${token.name} - (${contract.address})`);
            taskResults[token.symbol] = contract.address;
        }
        catch (error) {
            taskResults[token.symbol] = "Failed";
            spinner.fail(`Token Deployment Failed: ${token.name}`);
        }
    }
    // Display task results
    spinner.info(`Tokens Deployed`);
    const results = (0, utils_1.getTaskResultsDisplay)(taskResults);
    console.log(results);
    return taskResults;
}
exports.deployTokens = deployTokens;
//# sourceMappingURL=tasks.js.map