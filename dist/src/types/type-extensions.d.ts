import "hardhat/types/config";
import "hardhat/types/runtime";
import type { FakeERC20Network } from './types';
declare module "hardhat/types/config" {
    interface HardhatConfig {
        fakeERC20Network: FakeERC20Network;
    }
    interface HardhatUserConfig {
        fakeERC20Network?: Partial<FakeERC20Network>;
    }
}
//# sourceMappingURL=type-extensions.d.ts.map