import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useWeb3 } from "./Web3Provider";

const LandingPage = () => {
  const {
    connected,
    walletAddress,
    connectWallet,
    shortenAddress,
    disconnectWallet,
  } = useWeb3();

  const navigate = useNavigate();

  useEffect(() => {
    if (connected) {
      navigate("/home");
    }
  }, [connected, navigate]);

  const handleConnectWallet = async () => {
    if (!connected) {
      await connectWallet();
    }
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center text-white">
      <h1 className="text-5xl font-bold mb-4">
        Airdrop Multisender – Effortless Token Distribution
      </h1>
      <p className="text-lg text-center mb-8">
        The Airdrop Multisender simplifies token distribution by enabling
        secure, efficient, and scalable batch transactions. Whether you’re
        managing community rewards, token distributions, or marketing campaigns,
        our platform ensures a hassle-free experience.
      </p>
      <button
        onClick={handleConnectWallet}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Connect Wallet
      </button>
    </div>
  );
};

export default LandingPage;
