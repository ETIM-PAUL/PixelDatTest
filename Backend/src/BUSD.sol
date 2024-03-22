// SPDX-License-Identifier: MIT
pragma solidity 0.8.21;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BUSD is ERC20 {
    error ZeroAmount();

    constructor() ERC20("Binance Tokens", "BUSD") {}

    function mint(address reciever, uint amount) external {
        if(amount == 0){
            revert ZeroAmount();
        }
        _mint(reciever, amount);
    }

    function balanceOfUser(address _user) external view returns (uint bal)  {
        bal = balanceOf(_user);
    }
}
