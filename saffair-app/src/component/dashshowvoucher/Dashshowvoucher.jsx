import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Reward.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

const VoucherList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [vouchers, setVouchers] = useState([]);
  const [redeemedCode, setRedeemedCode] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [coin, setCoin] = useState(0);
  const shift = 3;
  const [redeemedVouchers, setRedeemedVouchers] = useState([]);


  useEffect(() => {
    fetchVouchers();
    fetchData();
  }, [redeemedCode]);

  function decryptVoucherCode(code) {
    const shift = 3; // Example shift value, you can change this
    return code
      .split('')
      .map(char => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          if ((code >= 65) && (code <= 90)) {
            return String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
          } else if ((code >= 97) && (code <= 122)) {
            return String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
          }
        }
        return char;
      })
      .join('');
  }

  const fetchData = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/user/${currentUser._id}`)

      if (res.ok) {
        const data = await res.json()
        setCoin(data.totalCoins)
      }
    } catch (e) {
      console.log(e)
    }
  }



  const fetchVouchers = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/vouchers/list`);
      const data = await res.json();
      if (!res.ok) {
        console.error(data.message);
      } else {
        const unredeemedVouchers = data.filter(voucher => !voucher.isRedeemed);
        const userredeemedVouchers = data.filter(voucher => voucher.isRedeemed && voucher.userId === currentUser._id);
        setVouchers(unredeemedVouchers);
        setRedeemedVouchers(userredeemedVouchers);
      }
    } catch (error) {
      console.error('Error fetching vouchers:', error);
    }
  };

  const handleRedeem = async (voucherId, voucherCost) => {
    if (!currentUser.isVerify) {
      alert("You are not a verified user. Please verify your account to redeem the voucher.");
      navigate("/dashboard?tab=verify");
      return;
    }

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/vouchers/redeem/${voucherId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: currentUser._id, voucherCost }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
      } else {
        setRedeemedCode(data.decryptedCode);
        alert('Voucher redeemed successfully!');
        setVouchers(prevVouchers => prevVouchers.filter(v => v._id !== voucherId));
        // Update user's total coins in Redux store
        dispatch({
          type: 'UPDATE_USER_COINS',
          payload: data.newTotalCoins
        });
      }
    } catch (error) {
      console.error('Error redeeming voucher:', error);
      alert('An error occurred while redeeming the voucher.');
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Voucher code copied to clipboard!');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

  return (
    <div className="reward-container">

      <>
        <div className="title">Vouchers</div>

        <div className="reward-cards">
          {vouchers.map((voucher) => (
            <div key={voucher._id} className="reward-card">
              <div className="voucher-info">
                <h2>{voucher.name}</h2>
                <p>Coins: {voucher.cost}</p>
                <p>Expiry Date: {new Date(voucher.expiryDate).toLocaleDateString()}</p>
                <p>{voucher.info}</p>
              </div>
              <button
                onClick={() => handleRedeem(voucher._id, voucher.cost)}
                className="redeem-button"
                disabled={currentUser.totalCoins < voucher.cost}
              >
                {currentUser.totalCoins < voucher.cost ? 'Insufficient Coins' : 'Redeem'}
              </button>
            </div>
          ))}
        </div>
      </>
      <div>
        <div className="title mt-4"> Your Redeemed Voucher</div>
        <div className='reward-cards'>
          {redeemedVouchers.map((voucher) => (
            <div key={voucher._id} className="reward-card">
              <div className="voucher-info">
                <h2>{voucher.name}</h2>
                <p>Coins: {voucher.cost}</p>
                <p>Expiry Date: {new Date(voucher.expiryDate).toLocaleDateString()}</p>
                <p>{voucher.info}</p>
                <div className="flex justify-evenly px-2 py-2 items-center gap-2 rounded-lg border-2 border-dotted border-blue-500">
                  <p className="text-lg">{decryptVoucherCode(voucher.code)}</p>
                  <button
                    className="text-blue-500 hover:text-blue-700 focus:outline-none transform transition-transform duration-200 hover:scale-105"
                    onClick={() => {
                      copyToClipboard(decryptVoucherCode(voucher.code));
                      // Add your animation trigger here if needed
                    }}
                  >
                    <FontAwesomeIcon icon={faCopy} />
                  </button>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default VoucherList;