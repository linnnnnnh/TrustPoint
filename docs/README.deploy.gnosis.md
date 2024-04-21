# How to deploy the smart-contracts on Gnosis Chiado

This is a tutorial to deploy our smart-contract on Gnosis Chiado.

## Deployment

- Open a terminal and go to the root of the project:

```
$ cd TrustPoint
```

- Create a copy of the environment file and fill in your private key:

```
$ cp .env.example .env
```

- Install dependencies:

```
$ npm install
```

- Compile Solidity files:

```
$ npx hardhat compile
```

- Deploy the Factory contract:

```
$ npx hardhat ignition deploy ignition/modules/TrustPointFactory.js --network chiado
```

- Deploy the Customer contract:

```
$ npx hardhat ignition deploy ignition/modules/TrustPointCustomer.js --network chiado
```

- Fill the addresses of these 2 contracts in the `.env` file at `CONTRACT_ADDR_FACTORY=` and `CONTRACT_ADDR_CUSTOMER=`.

Now your contracts are created and your project is ready!

## Interact with the contracts

You can interact with the contract easily directly from our front-end application as explained [here](../README.md).

If you prefer you can also do it directly with lines of code as explain in the next section.

### Register new customers in your program (with lines of code):

- Register as a new customer (the user need to register before earning loyalty points):

```
$ npx hardhat run script/registerCustomer.js --network chiado
```

### Created a new Loyalty Program as a Brand (with lines of code):

- Create a new program for your brand:

```
$ npx hardhat run script/createProgram.js  --network chiado
```

- Fill the address of this new contract in the `.env` file at `CONTRACT_ADDR_BRAND=`.

- Add a new rewards in your program & add points to the user:

```
$ npx hardhat run script/createReward.js  --network chiado
```

- Let users select & own their rewards:

```
$ npx hardhat run script/chooseReward.js  --network chiado
```

- Let users use their rewards:

```
$ npx hardhat run script/useReward.js  --network chiado
```
