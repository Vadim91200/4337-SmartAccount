import * as WalletSDK from "@plentifi/smartaccount";
import { Contract, JsonRpcProvider } from "ethers";
import { useEffect, useState } from "react";

const COMPANY_ID = "12345abcdef67890abcdef1234567890";
// Example NFT contract address - replace with your contract
const NFT_ADDRESS = "0x20eE7B720f4E4c4FFcB00C4065cdae55271aECCa" as `0x${string}`;

const NFTMintingApp = () => {
  const [currentBalance, setCurrentBalance] = useState(0n);
  const [isSessionKeyEnabled, setIsSessionKeyEnabled] = useState(false);

  const USER_WALLET = "0x3B565544cE1224f9D624E44c72001561de76b18c" as `0x${string}`;
  const NFT_INTERFACE = [
    "function safeMint() public",
    "function balanceOf(address owner) public view returns (uint256)",
  ];

  const refreshBalance = async () => {
    const nftContractInstance = new Contract(
      NFT_ADDRESS,
      NFT_INTERFACE,
      new JsonRpcProvider(WalletSDK.businessProvider(COMPANY_ID, "17000"))
    );
    const fetchedBalance = await nftContractInstance.balanceOf(USER_WALLET);
    setCurrentBalance(fetchedBalance);
  };

  useEffect(() => {
    refreshBalance();
  }, []);

  const mintNFTToken = async () => {
    const operation = WalletSDK.createOperation({
      target: NFT_ADDRESS,
      fctName: "safeMint",
      abi: NFT_INTERFACE,
      args: [], // No arguments for safeMint
    });
    const transactionReceipt = await WalletSDK.connect(COMPANY_ID, operation, {});
    console.log("Minting Transaction Receipt:", transactionReceipt);

    await refreshBalance();
  };

  const enableSessionKey = async () => {
    // Create a session key valid for 5 minutes
    const expiryTimestamp = Math.floor(Date.now() / 1000) + 300; // 5 minutes

    const sessionKeyOperation = WalletSDK.createSessionKey({
      validUntil: BigInt(expiryTimestamp),
      validAfter: BigInt(Math.floor(Date.now() / 1000)),
      permissions: [
        {
          target: NFT_ADDRESS,
          functionSelector: "0x6a627842", // safeMint() selector
          rules: [], // No additional rules
        },
      ],
    });
    await WalletSDK.connect(COMPANY_ID, sessionKeyOperation);
    setIsSessionKeyEnabled(true);
    // Session key automatically expires after 5 minutes
    setTimeout(() => setIsSessionKeyEnabled(false), 300000);
  };

  const mintWithAuthorization = async () => {
    const operation = WalletSDK.createOperation({
      target: NFT_ADDRESS,
      fctName: "safeMint",
      abi: NFT_INTERFACE,
      args: [], // No arguments for safeMint
    });
    const authReceipt = await WalletSDK.connect(COMPANY_ID, operation, {
      requireMultiSig: true,
      minSignatures: 2, // Requires 2 signatures for authorization
    });
    console.log("Multi-Signature Minting Receipt:", authReceipt);

    await refreshBalance();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-200">
      <div className="p-8 bg-white rounded shadow-md">
        <h1 className="mb-6 text-3xl font-bold text-gray-800">NFT Minting App</h1>

        <div className="mb-6 text-lg text-gray-700">
          Current NFT Balance: {currentBalance.toString()}
        </div>

        <div className="space-y-4">
          <button
            onClick={mintNFTToken}
            className="w-full px-5 py-3 text-lg font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Mint NFT
          </button>
          <button
            onClick={enableSessionKey}
            className={`w-full px-5 py-3 text-lg font-medium text-white rounded ${
              isSessionKeyEnabled
                ? "bg-green-500"
                : "bg-purple-500 hover:bg-purple-600"
            }`}
          >
            {isSessionKeyEnabled ? "Session Key Active" : "Enable Session Key (5 mins)"}
          </button>
          <button
            onClick={mintWithAuthorization}
            className="w-full px-5 py-3 text-lg font-medium text-white bg-orange-500 rounded hover:bg-orange-600"
          >
            Mint with Multi-Signature
          </button>
        </div>
      </div>
    </div>
  );
};

export default NFTMintingApp;