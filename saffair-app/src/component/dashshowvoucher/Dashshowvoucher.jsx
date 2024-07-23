import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Reward.css';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faDeleteLeft, faDumpster, faDumpsterFire, faRemove, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Table } from 'flowbite-react';

const VoucherList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [vouchers, setVouchers] = useState([]);
  const [redeemedCode, setRedeemedCode] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [coin, setCoin] = useState(0);
  const shift = 3;
  const [redeemedVouchers, setRedeemedVouchers] = useState([]);
  const [allredeemedVouchers, setAllredeemedVouchers] = useState([]);

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
        const allredeemedVouchers = data.filter(voucher => voucher.isRedeemed);
        setVouchers(unredeemedVouchers);
        setRedeemedVouchers(userredeemedVouchers);
        setAllredeemedVouchers(allredeemedVouchers)
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

  const handledelete = async (id) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/vouchers/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        console.error(data.message);
      } else {
        alert('Voucher deleted successfully!');
        fetchVouchers();
      }
    } catch (error) {
      console.error('Error deleting voucher:', error);
      alert('An error occurred while deleting the voucher.');
    }
  }

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
              <div className='flex flex-row justify-between'>
                <button
                  onClick={() => handleRedeem(voucher._id, voucher.cost)}
                  className="redeem-button"
                  disabled={currentUser.totalCoins < voucher.cost}
                >
                  {currentUser.totalCoins < voucher.cost ? 'Insufficient Coins' : 'Redeem'}
                </button>
                {currentUser.isAdmin && (
                  <button
                    onClick={() => handledelete(voucher._id)}
                    className="redeem-button bg-red-600"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </>

      {currentUser.isAdmin && (
        <>
          <div className='title mt-4 '>
            Redeemed Voucher History
          </div>
          <div className="mt-2 table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            <Table hoverable>
              {/* Table headers */}
              <Table.Head>
                <Table.HeadCell>User</Table.HeadCell>
                <Table.HeadCell>Voucher name</Table.HeadCell>
                <Table.HeadCell>Voucher Cost</Table.HeadCell>
                <Table.HeadCell>Voucher info</Table.HeadCell>
                {/* <Table.HeadCell>BookMark</Table.HeadCell> */}
              </Table.Head>
              {/* Table body */}
              {allredeemedVouchers.map((voucher) => (
                <Table.Body key={voucher._id} className="divide-y">
                  <Table.Row className="bg-white">
                   

                    <Table.Cell>

                      <span>{voucher.userId}</span>
                    </Table.Cell>

                    <Table.Cell>

                      <span>{voucher.name}</span>
                    </Table.Cell>
                    <Table.Cell>
                      <span>{voucher.cost}</span>
                    </Table.Cell>
                    <Table.Cell>
                      <span>{voucher.info}</span>
                    </Table.Cell>


                  </Table.Row>
                </Table.Body>
              ))}
            </Table>

          </div>
          <div>
            <div className='reward-cards'>

            </div>

          </div>
        </>
      )}

      {!currentUser.isAdmin && (
        <>
          <div>
            <div className='title mt-4 '>
              Your Redeemed Voucher
            </div>
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
        </>
      )}



    </div>


  );
};

export default VoucherList;