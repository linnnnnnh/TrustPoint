# TrustPoint

TrustPoint revolutionizes loyalty programs with blockchain technology. This dApp allows brands to create token-based rewards, supporting permissionless co-branding to attract new customers. Users earn and redeem points across brands, leveraging NFTs for transferable rewards.

![](front/public/banniere.png)

## Set-up

### Deploy Front-end

- Open a terminal, clone the project & go to the `front` directory:

```
$ git clone https://github.com/linnnnnnh/TrustPoint
```

```
$ cd TrustPoint/front
```

- Install dependencies:

```
$ npm install
```

- Deploy front-end:

```
$ npm run dev
```

That's it! Now you can go to [http://localhost:3000/](http://localhost:3000/) and interact with the application!

### Deploy smart-contracts

The smart-contracts are already deployed, you can find them at these addresses:

- **Arbitrum Sepolia**:
    - FactoryContract: **0xDf1b12Efbc559ace5a86a1A5F9d97389B62B9984**
    - CustomerContract: **0x4c491aBC0Ae7D76466999c8876D2901B4Ede3d7A**

- **Gnosis Chiado**:
    - FactoryContract: **0xd74DA75E8Fd52f1bFac615f01Fe1ea96c679bbe8**
    - CustomerContract: **0x7F8fb89Ed62069FA4b5972C4804bAec563Db0cb5**

#### If you want to deploy the smart-contracts by yourself you can follow these tutorials:

- [Deploy on Arbitrum Sepolia](./docs/README.deploy.arbitrum.md)
- [Deploy on Gnosis Chiado](./docs/README.deploy.gnosis.md)
