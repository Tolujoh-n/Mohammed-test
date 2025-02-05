import React, { useState, useEffect } from "react";
import Web3 from "web3";

const TokenTransfer = () => {
  const [contractAddress, setContractAddress] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [tokenBalance, setTokenBalance] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      // Check if the wallet is connected
      window.ethereum.request({ method: "eth_accounts" }).then((accounts) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      });
    } else {
      console.error("Please install MetaMask!");
    }
  }, []);

  const handleContractAddressChange = (e) => {
    const address = e.target.value;
    setContractAddress(address);
    if (web3.utils.isAddress(address)) {
      fetchTokenBalance(address);
    } else {
      setTokenBalance(null);
    }
  };

  const fetchTokenBalance = async (address) => {
    const tokenContract = new web3.eth.Contract(
      // ABI for ERC-20 Token
      [
        {
          constant: true,
          inputs: [{ name: "_owner", type: "address" }],
          name: "balanceOf",
          outputs: [{ name: "balance", type: "uint256" }],
          type: "function",
        },
      ],
      address
    );

    const balance = await tokenContract.methods.balanceOf(walletAddress).call();
    setTokenBalance(web3.utils.fromWei(balance, "ether"));
  };

  const handleSendAirdrop = async () => {
    const tokenContract = new web3.eth.Contract(
      // ABI for ERC-20 Token
      [
        {
          constant: false,
          inputs: [
            { name: "_to", type: "address" },
            { name: "_value", type: "uint256" },
          ],
          name: "transfer",
          outputs: [{ name: "", type: "bool" }],
          type: "function",
        },
      ],
      contractAddress
    );

    await tokenContract.methods
      .transfer(recipientAddress, web3.utils.toWei(amount, "ether"))
      .send({ from: walletAddress });

    alert("Airdrop sent!");
    window.location.reload();
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Contract Address"
        value={contractAddress}
        onChange={handleContractAddressChange}
        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded"
      />
      {tokenBalance !== null && (
        <p className="text-sm text-green-500">Token Balance: {tokenBalance}</p>
      )}
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded"
      />
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded"
      />
      <button
        onClick={handleSendAirdrop}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Send Airdrop
      </button>
    </div>
  );
};

export default TokenTransfer;
