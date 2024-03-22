// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.21;

import {Test, console} from "forge-std/Test.sol";
import {BUSD} from "../src/BUSD.sol";

contract BUSDTest is Test {
    BUSD public busd;
    address user1;

    function setUp() public {
        busd = new BUSD();
        user1 = vm.addr(1);
    }

    function testMint() public {
    busd.mint(user1,1e18);
    uint bal = busd.balanceOfUser(user1);
    assertEq(bal,1e18);
    }
}
