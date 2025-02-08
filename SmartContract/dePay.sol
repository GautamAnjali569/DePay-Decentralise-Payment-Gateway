
// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;


import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract paymentGateway is Ownable {

    // Deposite / Buy function

    // Withdraw Funds, Owner-Only

    // All types of ERC20 tokens will be accepted.

    // ANY CHAINS, QR-Code of the wallet address will get displayed
                            //userAddress, tokenAddress, amount

    address [] public tokens ;
    uint  public  totalOrders;

    string public bName;
    
    constructor(address[] memory _tokens , string memory _bname ){
        tokens = _tokens;
        bName = _bname;
    }

    event nativeTokenDeposite(address, address, uint);
    event tokenDeposite(address, address, uint);


    // Any Type of ERC-20 Tokens 
    function deposite(uint _amount, address _tokenAddress) public payable {

        IERC20 token = IERC20(_tokenAddress);
        require(token.transferFrom(msg.sender, address(this), _amount),"Unable to Deposite");
        emit nativeTokenDeposite( msg.sender, _tokenAddress ,_amount );
        totalOrders +=1;

    }

    // For Native Tokens,
    function depositeNative(uint _amount) public payable  {
        
        require( msg.value >= _amount, "Please Deposite Complete amount");
        // emit nativeTokenDeposite( msg.sender, _tokenAddress ,_amount );
    }

    // Withdraw any ERC-20 tokens
    function withdrawNative() public onlyOwner {

        (bool os, ) = payable(owner()).call{value: address(this).balance}("Only owner is allowed");
        require(os);        
       
    }

    // Withdraw Native Token
    function withdraw(address _tokenAddress) public onlyOwner {
                     
        IERC20 token = IERC20(_tokenAddress);
        require(token.transfer( msg.sender, token.balanceOf(_tokenAddress)) ,"No tokens available!");

    }


    // Returns available tokens in the contract
    function receivedAmount(address _tokenAddress) public view  returns (uint) {
        
        IERC20 token = IERC20(_tokenAddress);
        return token.balanceOf(address(this));
    }

    function receivedNative() public view returns (uint) {
        return address(this).balance;
    }
    
    
}