import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function CreateVoucherForm() {
  const [voucherName, setVoucherName] = useState("");
  const [voucherCost, setVoucherCost] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [code, setCode] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const shift = 3;
const [info, setinfo] = useState("");
  function encryptVoucherCode(code) {
    return code
      .split('')
      .map(char => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          if ((code >= 65) && (code <= 90)) {
            return String.fromCharCode(((code - 65 + shift) % 26) + 65);
          } else if ((code >= 97) && (code <= 122)) {
            return String.fromCharCode(((code - 97 + shift) % 26) + 97);
          }
        }
        return char;
      })
      .join('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add your form submission logic here
    const voucherData = {
      name: voucherName,
      cost: voucherCost,
      expiryDate: expiryDate,
      code: encryptVoucherCode(code),
      info:info,
    };

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/vouchers/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(voucherData),
      });

      const data = await res.json();
      if (!res.ok) {
        console.error(data.message);
      } else {
        console.log("Voucher created successfully:", data);
        // Reset form fields
        setVoucherName("");
        setVoucherCost("");
        setExpiryDate("");
        setCode("");
        // Optionally, redirect to another page
        navigate("/dashboard?tab=voucherlist");
      }
    } catch (error) {
      console.error("Error creating voucher:", error);
    }
  };

  return (

    <div className="w-full p-4">
      <h2 className="  text-xl font-bold mb-4">Create Voucher</h2>
      <form onSubmit={handleSubmit}>
        <div className=" w-[300px] mb-4">
          <label htmlFor="voucherName" className="block text-sm font-medium text-gray-700">
            Voucher Name
          </label>
          <input
            type="text"
            id="voucherName"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            value={voucherName}
            onChange={(e) => setVoucherName(e.target.value)}
            required
          />
        </div>
        <div className=" w-[300px] mb-4">
          <label htmlFor="voucherCost" className="block text-sm font-medium text-gray-700">
            Voucher Coins cost
          </label>
          <input
            type="number"
            id="voucherCost"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            value={voucherCost}
            onChange={(e) => setVoucherCost(e.target.value)}
            required
          />
        </div>
        <div className="w-[300px] mb-4">
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
            Expiry Date
          </label>
          <input
            type="date"
            id="expiryDate"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            required
          />
        </div>
        <div className="w-[300px] mb-4">
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
            voucher info
          </label>
          <input
            type="info"
            id="info"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            value={info}
            onChange={(e) => setinfo(e.target.value)}
            required
          />
        </div>
        <div className="w-[300px] mb-4">
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
            Vocher code
          </label>
          <input
            type="code"
            id="code"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Create Voucher
        </button>
      </form>
    </div>
  );
}
