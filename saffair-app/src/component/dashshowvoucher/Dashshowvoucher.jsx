import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import './Reward.css'; // Ensure this import statement is pointing to your CSS file

const VoucherList = () => {
  const [vouchers, setVouchers] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const res = await fetch( `${process.env.REACT_APP_BACKEND_API}/api/vouchers/list`);
        const data = await res.json();
        if (!res.ok) {
          console.error(data.message);
        } else {
          setVouchers(data);
        }
      } catch (error) {
        console.error('Error fetching vouchers:', error);
      }
    };

    fetchVouchers();
  }, []);

  const handleRedeem = async (voucherId) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/vouchers/redeem/${voucherId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: currentUser._id }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message);
      } else {
        alert('Voucher redeemed successfully!');
        // Optionally update vouchers list or user data here
      }
    } catch (error) {
      console.error('Error redeeming voucher:', error);
    }
  };

  return (
    <div className="reward-container">
      {!currentUser.isadmin && (
        <>
          <div className="title">Vouchers</div>
          <div className="reward-cards">
            {vouchers.map((voucher) => (
              <div key={voucher._id} className="reward-card">
                <div className="voucher-info">
                  <h2>{voucher.name}</h2>
                  <p>Coins: {voucher.cost}</p>
                  <p>Expiry Date: {new Date(voucher.expiryDate).toLocaleDateString()}</p>
                  <p>Get amazing discounts and offers with this voucher!</p>
                </div>
                <button onClick={() => handleRedeem(voucher._id)} className="redeem-button">Redeem</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default VoucherList;
