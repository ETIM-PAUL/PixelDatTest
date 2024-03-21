// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.21;

import {Test, console} from "forge-std/Test.sol";
import {BUSDHandler} from "../src/BUSDHandler.sol";
import {BUSD} from "../src/BUSD.sol";

contract BUSDHandlerTest is Test {
    BUSDHandler public busd_handler;
    BUSD public busd;
    address user1;
    address user2;

    function setUp() public {
        busd = new BUSD();
        busd_handler = new BUSDHandler(address(busd));
        user1 = vm.addr(1);
        user2 = vm.addr(2);
    }

    function testZeroAmountRevert() public {
        vm.prank(user1);
        vm.expectRevert(
            abi.encodeWithSelector(
                BUSDHandler.ZeroAmount.selector
            )
        );
    busd_handler.forwardBUSD(user1,0);
    }

    function testZeroAddressRevert() public {
       vm.expectRevert(
            abi.encodeWithSelector(
                BUSDHandler.InvalidAddress.selector
            )
        );
    busd_handler.forwardBUSD(address(0x0),1e18);
    }

    function testInsufficientAllowanceRevert() public {
       vm.expectRevert(
            abi.encodeWithSelector(
                BUSDHandler.InsufficientAllowance.selector
            )
        );
    busd_handler.forwardBUSD(user2,4e18);
    }

    function testForwardTransfer() public {
      busd.mint(user1,1e18);
      vm.startPrank(user1);
      busd.approve(address(busd_handler), 1e17);
    busd_handler.forwardBUSD(user2,1e17);
    uint bal = busd.balanceOfUser(user2);
    assertEq(bal,1e17);
    }
}
