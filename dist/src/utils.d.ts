import "isomorphic-fetch";
import type { HardhatConfig } from "hardhat/types";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import type { InitialUserData, TaskResults } from "./types/types";
export declare const TASK_NAME = "deploy-fake-erc20";
export declare const defaultSettings: {
    tokens: {
        name: string;
        symbol: string;
    }[];
    defaultMintAmount: string;
};
export declare function checkLocalhostNetwork(config: HardhatConfig): Promise<boolean>;
export declare function getInitialUserData(accounts: SignerWithAddress[], initialMintAmount: string): InitialUserData[];
export declare function getTaskResultsDisplay(taskResults: TaskResults): string;
//# sourceMappingURL=utils.d.ts.map