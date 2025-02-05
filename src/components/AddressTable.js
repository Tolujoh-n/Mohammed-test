import React, { useState } from "react";
import Web3 from "web3";

const AddressTable = () => {
  const [addresses, setAddresses] = useState(
    new Array(1).fill({ address: "", status: "" })
  );

  const web3 = new Web3();

  const handleAddressChange = (index, value) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[index].address = value;
    updatedAddresses[index].status = web3.utils.isAddress(value)
      ? "Valid"
      : "Invalid";
    setAddresses(updatedAddresses);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const csvAddresses = event.target.result.split("\n").map((line) => {
        const address = line.trim();
        return {
          address,
          status: web3.utils.isAddress(address) ? "Valid" : "Invalid",
        };
      });
      setAddresses(csvAddresses);
    };
    reader.readAsText(file);
  };

  const addRow = () => {
    setAddresses([...addresses, { address: "", status: "" }]);
  };

  return (
    <div>
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((row, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={row.address}
                  onChange={(e) => handleAddressChange(index, e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2"
                />
              </td>
              <td className="border px-4 py-2">
                <input
                  type="text"
                  value={row.status}
                  disabled
                  className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-2"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <div className="flex justify-between items-center mb-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={addRow}
        >
          Add Row
        </button>
        <label className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
          Upload CSV
          <input type="file" onChange={handleFileUpload} className="hidden" />
        </label>
      </div>
    </div>
  );
};

export default AddressTable;
