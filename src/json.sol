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
