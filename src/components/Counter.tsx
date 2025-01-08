import * as PlentiFi from "@plentifi/smartaccount";
import { Contract, JsonRpcProvider } from "ethers";
import { useEffect, useState } from "react";

const BUSINESS_ID = "abcdef1234567890abcdef1234567890";
const COUNTER_ADDRESS = "0x74F27d4C5dCF2A9571f383cF74BdD3AcB8012865" as `0x${string}`;
const Counter = () => {
  const [count, setCount] = useState(0n);

  const updateCount = async () => {
    const counterContract = new Contract(
      COUNTER_ADDRESS,
      ["function count() public view returns(uint256)"],
      new JsonRpcProvider(PlentiFi.businessProvider(BUSINESS_ID, "17000")), // only holesky supported right now
    );

    const count = await counterContract.count();
    setCount(count);
  };

  useEffect(() => {
    (async () => {
      await updateCount();
    })();

    // every 5 seconds, update the count
    const interval = setInterval(async () => {
      await updateCount();
    }, 5000);

    return () => clearInterval(interval);

  }, []);

  const incrementCounter = async () => {
    const userOp = PlentiFi.createOperation({
      target: COUNTER_ADDRESS,
      fctName: "increment",
      abi: ["function increment() public", "function count() public view returns(uint256)"],
      // args: [], // optional
      // value: 0n, // optional
    });

    const receipt = await PlentiFi.connect(BUSINESS_ID, userOp);

    console.log(receipt);
    
    await updateCount();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-lg">
        <h1 className="mb-6 text-4xl font-bold text-gray-800">Counter</h1>
        <div className="mb-6 text-6xl font-bold text-blue-600">{count.toString()}</div>
        <button
          onClick={incrementCounter}
          className="px-6 py-3 text-lg font-semibold text-white transition-all duration-300 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg hover:shadow-xl"
        >
          Increment
        </button>
      </div>
    </div>
  );
};

export default Counter;