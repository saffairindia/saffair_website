import React, { useState } from 'react';
import './Couponform.css';
import {
    Alert,
    Button,
    Modal,
    ModalBody,
    TextInput,
    Textarea,
  } from "flowbite-react";

const CouponForm = () => {
  const [couponName, setCouponName] = useState('');
  const [couponAmount, setCouponAmount] = useState(0);

  const handleCouponNameChange = (event) => {
    setCouponName(event.target.value);
  };

  const handleCouponAmountChange = (event) => {
    setCouponAmount(event.target.value);
  };

  return (
    <div className='coupon'>
        <h1 className="text-center text-3xl my-7 font-semibold">
        Create A Coupon
      </h1>
      <TextInput
          type="text"
          id="CouponName"
          placeholder="Enter coupon Name"
        //   defaultValue={currentUser.firstName}
        //   onChange={handleChange}
        />
      <br />
        <Textarea
                type="textarea"
                rows="4"
                cols="40"
                id="CouponDescription"
                maxLength={200}
                // onChange={handleChange}
                placeholder="Enter Coupon Description"
                // defaultValue={currentUser.bio}
                required
              />
        <br />
      <TextInput
          type="number"
          id="CouponAmount"
          placeholder="Enter Coupon Amount"
        //   defaultValue={currentUser.firstName}
        //   onChange={handleChange}
        />
    <br />
    
        {/* {currentUser.isContributor && ( */}
        {/* <Link to={"/createblog"}> */}
            <Button
              type="button"
              gradientDuoTone="cyanToBlue"
              outline
              id="w-full"
              className="w-full"
            >
              Add A Coupon
            </Button>
        {/* </Link> */}
        {/* )} */}
    </div>
  );
};

export default CouponForm;
