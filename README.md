# rebels

## Unittest

### Run contract running test

```
npx hardhat test
```

## Deploy website

`.env` file at the root of the project (use env.template as an example)

### Local development website

To rebuild the website and serve it locally, we recommend to use firebase with
the following command after creating your firebase project:
```
source .env && npm run build && webpack && cp dist/customization.bundle.js*
website/dist && firebase serve
```

To deploy the website, ensure that the previous command worked and simply run:
```
firebase deploy
```

## Deploy contract(s) to test network

```
ALCHEMY_API_KEY=""
ETH_PRIVATE_KEY="[SHOULD BE A TEST WALLET]"
DEPLOYED_CONTRACT=""
```

### For a public test

`npx hardhat deploy-contract`
Update the `.env` with your stdout contract address `0x...`
Update the `mint-app/.env{development.local}` with your stdout contract address `0x...`

```
npx hardhat deploy-merkle-minter --mint-name "Test Private Sale" --user-mint-price 5000000000000000 --user-mint-limit 3 --merkle-root "0x0000000000000000000000000000000000000000000000000000000000000000"  --total-mint-limit 100
```

Save the stdout `0xMINTER`

```
npx hardhat set-mint-authorizer-address --address 0xMINTER
```

## Dev mint-app

`cd mint-app && npm start`

## Deploy steps

1. Deploy main contract
   1. update contract address in useBlockChain.js
2. Generate proofs
   1. in a temp folder
3. Deploy mint contract with proof root
4. Update temp proof folder with minter address LOWER CASE
5. build react app: `npm run build`
6. Firebase deploy
   1. For private testing: `firebase hosting:channel:deploy preview`

# Known issues

- root.json file issue
- 500k wei GAS LIMIT
