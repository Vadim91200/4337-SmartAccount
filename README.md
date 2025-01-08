# PlentiFi

PlentiFi is a powerful web3 library that simplifies blockchain interactions through smart account abstraction (ERC-4337). It eliminates the need for end-users to manage private keys or handle gas fees directly, allowing developers to create more user-friendly web3 applications.

## Account Abstraction Explained

PlentiFi leverages ERC-4337 account abstraction to revolutionize how users interact with blockchain applications:

### Traditional Approach
In traditional blockchain interactions:
- Users must manage their own private keys
- Users need to hold native tokens (ETH) for gas fees
- Every transaction requires manual signature confirmation
- Limited transaction customization and batching

### PlentiFi's Smart Account Approach
With PlentiFi's account abstraction:
- No private key management required for end-users
- Gas fees can be abstracted away or paid in any token
- Transactions can be automated based on predefined rules
- Multiple operations can be bundled into a single transaction
- Custom validation logic can be implemented (e.g., spending limits, recovery mechanisms)
- 🎯 No private key management for end-users
- Optional Biometric authentication (face id, fingerprint, etc.) _(soon)_
- ⚡ No need to worry about transaction costs
- 🔒 Enhanced security through smart contract wallets
- 🔄 Batch multiple operations in one transaction
- 📱 Mobile-friendly UX
- 🤝 Supported on any device and browsers
- 🔑 Social recovery options _(soon)_
- 🎮 Gaming-friendly with session keys _(soon)_
- 💼 Enterprise-ready with flexible policies

## Features

### For Developers
- 🚀 Extremely simple SDK for blockchain interactions
- 📦 Pre-built UI components _(soon)_
- 🛠️ Customizable user accounts through external modules
- 📊 Built-in analytics and monitoring _(soon)_
- 🔌 Easy integration with existing dApps

### For Users
- 👤 Email/social login support
- 💸 No crypto currencies needed for gas
- 📲 Seamless mobile experience
- ⚡ Fast transaction processing
- 🔐 Enhanced security features
  
### How It Works
1. Users interact with your application
2. PlentiFi creates a smart contract wallet for each user
3. Users authenticate using their password or biometrics on the PlentiFi app to execute operations

This architecture provides maximum flexibility while maintaining security and user experience.

> PlentiFi has NEVER access to user's account and assets in any way. The user's account is managed by the user's smart contract wallet which is deployed on the blockchain.

## Installation

Install PlentiFi using npm:

```bash
npm install @plentifi/smartaccount
```

## Quick Start

1. Import the library:
```typescript
import * as PlentiFi from "@plentifi/smartaccount";
```

2. Create an operation:
```typescript
const userOp = PlentiFi.createOperation({
  target: COUNTER_ADDRESS,
  fctName: "increment",
  abi: [
    "function increment() public",
    "function count() public view returns(uint256)"
  ],
  // args: [], // optional function arguments
});
```

3. Execute the operation:
```typescript
const receipt = await PlentiFi.connect(BUSINESS_ID, userOp);
console.log(receipt);
```

## Advanced Usage

### Batch Transactions _(soon)_

PlentiFi supports executing multiple operations in a single transaction:

```typescript
const batchOp = PlentiFi.createBatchOperation([
  {
    target: CONTRACT_A,
    fctName: "functionA",
    abi: ["function functionA() public"]
  },
  {
    target: CONTRACT_B,
    fctName: "functionB",
    abi: ["function functionB(uint256 value) public"],
    args: [123]
  }
]);

const receipt = await PlentiFi.connect(BUSINESS_ID, batchOp);
```
