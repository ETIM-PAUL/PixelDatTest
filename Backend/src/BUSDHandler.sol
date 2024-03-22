// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BUSDHandler {
    ERC20 token;

    error InvalidAddress();
    error ZeroAmount();
    error InsufficientAllowance();

    constructor(address _token) {
        token = ERC20(_token);
    }


function forwardBUSD(address _receiver, uint amount) external {
if(_receiver == address(0)){
            revert InvalidAddress();
        }
        if(amount == 0){
            revert ZeroAmount();
        }
        uint allocated_allowance = token.allowance(msg.sender, address(this));
if(allocated_allowance < amount){
  revert InsufficientAllowance();
}
        token.transferFrom(msg.sender, _receiver, amount);
}
}
