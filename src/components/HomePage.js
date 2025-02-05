import React, { useEffect, useState } from "react";
import AddressTable from "./AddressTable";
import TokenTransfer from "./TokenTransfer";
import { useWeb3 } from "./Web3Provider";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const {
    connected,
    walletAddress,
    connectWallet,
    shortenAddress,
    disconnectWallet,
  } = useWeb3();

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("addressValidation");

  useEffect(() => {
    if (!connected) {
      navigate("/");
    }
  }, [connected, navigate]);

  const handleDisconnectWallet = async () => {
    await disconnectWallet();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="flex justify-between items-center p-5 border-b border-gray-700">
        <div className="text-xl font-bold">Airdrop to Multisender</div>
        <div className="flex items-center space-x-4">
          <span>{walletAddress}</span>
          <button
            onClick={handleDisconnectWallet}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Disconnect Wallet
          </button>
        </div>
      </nav>

      <div className="p-5">
        <div className="flex space-x-4 mb-8">
          <button
            className={`border rounded px-4 py-2 ${
              activeTab === "addressValidation" ? "bg-blue-500" : "bg-gray-800"
            }`}
            onClick={() => setActiveTab("addressValidation")}
          >
            Address Validation
          </button>
          <button
            className={`border rounded px-4 py-2 ${
              activeTab === "tokenTransfer" ? "bg-blue-500" : "bg-gray-800"
            }`}
            onClick={() => setActiveTab("tokenTransfer")}
          >
            Token Transfer
          </button>
        </div>

        {activeTab === "addressValidation" && <AddressTable />}

        {activeTab === "tokenTransfer" && <TokenTransfer />}
      </div>
    </div>
  );
};

export default HomePage;
