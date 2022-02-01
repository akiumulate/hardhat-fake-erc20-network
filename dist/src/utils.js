"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTaskResultsDisplay = exports.getInitialUserData = exports.checkLocalhostNetwork = exports.defaultSettings = exports.TASK_NAME = void 0;
require("isomorphic-fetch");
exports.TASK_NAME = "deploy-fake-erc20";
exports.defaultSettings = {
    tokens: [
        {
            name: "Fake ERC20 Token",
            symbol: "FAKE",
        },
    ],
    defaultMintAmount: "1000000000000000000000",
};
/*
     Checks to make sure that a local instance of HardHat node is running
 */
async function checkLocalhostNetwork(config) {
    var _a, _b;
    //Make sure the "localhost" url is set so we can ping it
    if (!((_b = (_a = config === null || config === void 0 ? void 0 : config.networks) === null || _a === void 0 ? void 0 : _a.localhost) === null || _b === void 0 ? void 0 : _b.url)) {
        throw new Error("No localhost URL");
    }
    // The JSON-RPC server run by the `hardhat node` task returns status=200 with an
    // empty body when the server is sent a request with the method set to "OPTIONS"
    // and refuses the connection if the server is not running
    const response = await fetch(config.networks.localhost.url, {
        method: "OPTIONS",
    }).catch((err) => {
        throw new Error("Can't find the HardHat local server. You must start the server using the `npx hardhat node` command.");
    });
    if (response.status !== 200) {
        throw new Error("Did not get the expected status from the local server");
    }
    return true;
}
exports.checkLocalhostNetwork = checkLocalhostNetwork;
/*
    Format ETH accounts and initial mint balance object for the fake ERC20 contract
*/
function getInitialUserData(accounts, initialMintAmount) {
    return accounts.map((account) => {
        return {
            userAddress: account.address,
            initialBalance: initialMintAmount,
        };
    });
}
exports.getInitialUserData = getInitialUserData;
function getTaskResultsDisplay(taskResults) {
    let results = [
        'Task Results\n',
        '=========================\n',
    ];
    Object.keys(taskResults).forEach((symbol) => {
        results.push(`${symbol} - ${taskResults[symbol]}\n`);
    });
    return results.join('');
}
exports.getTaskResultsDisplay = getTaskResultsDisplay;
//# sourceMappingURL=utils.js.map