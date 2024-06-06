// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.21;

import {Test, console} from "forge-std/Test.sol";
import {NumberHeist} from "../src/trump.sol";

contract TRUMPTest is Test {
    NumberHeist public trump;
    address user1;
    address user2;

    function setUp() public {
        trump = new NumberHeist();
        user1 = vm.addr(1);
        user2 = vm.addr(2);
    }

    function invariant_testTransferFuzz() public {
        // vm.assume(1 < n);
        // vm.assume(n <= 32);
        // vm.assume(factor1 > 1);
        // vm.assume(factor2 > 1);
        // vm.assume(factor1 < n);
        // vm.assume(factor2 < n);
        vm.startPrank(user1);
        assertFalse(trump.solved(user1));
    }
    // function testTransferFuzz(
    //     uint8 n,
    //     uint256 circleCuttingWitness,
    //     uint8 factor1,
    //     uint8 factor2
    // ) public {
    //     vm.assume(1 < n);
    //     vm.assume(n <= 32);
    //     vm.assume(factor1 > 1);
    //     vm.assume(factor2 > 1);
    //     vm.assume(factor1 < n);
    //     vm.assume(factor2 < n);
    //     bool k = trump.heist(n, circleCuttingWitness, factor1, factor2);
    //     // assertTrue(k);
    // }
}
