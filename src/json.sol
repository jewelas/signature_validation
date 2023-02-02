// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import '@openzeppelin/contracts/utils/cryptography/ECDSA.sol';

contract SigTest {

    using ECDSA for bytes32;

    address private systemAddress;

    constructor (address _systemAddress) {
        systemAddress = _systemAddress;
    }

    function isValidSignature(bytes memory hash, bytes memory signature) external view returns (string memory purpose, uint256 amount) {
        bytes32 hashMessage = keccak256(hash);
        bytes32 signedHash = keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", hashMessage));
        
        require(signedHash.recover(signature) == systemAddress, "Invalid Signature");
        (purpose, amount) = abi.decode(hash, (string, uint));
    }
}

/*
"for trails afterwards it would be a small code demo of a website where you input json into a textfield. encode it and let the user sign it. and a smart contract that has 1 function that accepts the message, checks for valid signer and extracts a string field and a uint256 field, so nothing to wild

 */