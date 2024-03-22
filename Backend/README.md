
### To setup backend
###### Run this command "forge init"

### To deploy and verify for BUSD ERC20 contract

##### Run this command 
forge create --rpc-url desiredchainRPC \
    --private-key yourPrivateKey \
    --etherscan-api-key yourEtherscanKey \
    --verify \
    src/BUSD.sol:BUSD
    
    to run deploy and verify BUSD ERC20 contract


### To deploy and verify for BUSDHandler contract

##### Run this command
forge create --rpc-url urdesiredchainRPC \
    --constructor-args busdTokenAddress \
    --private-key yourPrivateKey \
    --etherscan-api-key yourEtherscanKey \
    --verify \
    src/BUSDHandler.sol:BUSDHandler
    
    to run deploy and verify BUSDHandler contract



### To run the test for BUSD ERC20 contract

##### Run this command next "forge test -vvvvv --match-contract BUSDTest" to run test for BUSD ERC20 contract

### To run the test for BUSDHandler contract

##### Run this command next "forge test -vvvvv --match-contract BUSDHandlerTest" to run test for BUSDHandler contract

#### All the contracts have written tests in foundry to test possible contract functions, as well as possible issues. Although to deploy the contract on mainnet, all contracts need to pass through different stages of audits