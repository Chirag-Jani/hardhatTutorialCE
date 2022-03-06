//SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.12;
import "hardhat/console.sol"; // for debugging

contract Token {
    string public name = "HardHat Token";
    string public symbol = "HHT";
    uint256 public totalSupply = 10000;

    address public owner;

    mapping(address => uint256) balances;

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address _to, uint256 _funds) public {
        // for testing and debugging
        // console.log("Sender balance is: %s ", balances[msg.sender]);
        // console.log("Sender is sending %s tokens to %s address", _funds, _to);
        require(balances[msg.sender] >= _funds, "Not Enough Funds");
        balances[msg.sender] -= _funds;
        balances[_to] += _funds;
    }

    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
