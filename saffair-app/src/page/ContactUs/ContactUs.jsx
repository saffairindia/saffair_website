import React, { useState } from "react";
import { Button, Spinner } from "flowbite-react";
<<<<<<< HEAD
import {  useSelector } from "react-redux";

import emailjs from "@emailjs/browser";
import "./contactus.css";

=======
import { useSelector } from "react-redux";
import { faChevronDown,faEnvelope,faBrush, faGear, faSignal, faHandshake } from "@fortawesome/free-solid-svg-icons";
import emailjs from "@emailjs/browser";
import "./contactus.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
>>>>>>> master
const ContactUs = () => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { loading, error: errorMessage } = useSelector((state) => state.user);


  const [uname, setName] = useState("");
  const [uemail, setEmail] = useState("");
  const [unumber, setNumber] = useState("");
  const [umessage, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // add the below details from emailjs
    const serviceID = "";
    const templateID = "";
    const publicKey = "";

    const templateParams = {
      from_name: uname,
      email: uemail,
      to_name: "Team Saffair",
      message: umessage,
    };
    emailjs
      .send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully", response);
        setName("");
        setEmail("");
        setMessage("");
      })
      .catch((error) => {
        console.error("error sending email:", error);
      });
  };
<<<<<<< HEAD

  return (
    <div className="contact-us-container">
      <div className="title">Do you have any questions?</div>
      <div className="description">
        For inquiries, contact us via phone, email or our website's contact form
        given below. Our Saffair team is here to help you effectively.
      </div>
      <div className="contact-section">
        <div className="contact-info">
          <div className="contact-info-item">
            <p className="contact-label">Contact Us</p>
            <p className="contact-text">
              We are here to help you, whatever kind of help you need
            </p>
            <p className="contact-email">breath@saffair.in</p>
          </div>
          <div className="contact-info-item">
            <div className="horizontal-line"></div>
            <p className="contact-label">ADDRESS</p>
            <p className="contact-text">
            204, Loha Bhavan, Opp. Old High-court, Income Tax, Ahmedabad-380014   <br />   8am - 8pm      </p>
            <p className="contact-email">
            <a href="tel:+919328696119">
                +91-9328696119
              </a>
            </p>
          </div>
        </div>
        <div className="contact-form">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="label">
                Your Name<span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                value={uname}
                placeholder="Name"
                className="input"
                maxLength={200}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="label">
                Your Email<span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                value={uemail}
                placeholder="Email"
                className="input"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="Contact no." className="label">
                Your Contact no.<span className="required">*</span>
              </label>
              <input
                type="number"
                id="contactno"
                value={unumber}
                placeholder="Number"
                className="input"
                required
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="msg" className="label">
                Message<span className="required">*</span>
              </label>
              <br />
              <textarea
                rows="4"
                cols="40"
                id="msg"
                className="textarea"
                required
                value={umessage}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <Button
              gradientDuoTone="cyanToBlue"
              outline
              type="submit"
              disabled={loading}
              className="submit-button"
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="loading-text">Loading...</span>
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </div>
      </div>
      {showSuccessMessage && (
        <p className="success-message">
          Thank you for reaching out to us. We will get back to you as soon as
          possible.
        </p>
      )}
    </div>
=======
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is Krushi?",
      answer: "Krushi is a Public Charitable Trust designed to carry out farming on extensive scale Natural & Sustainable methods."
    },
    {
      question: "How does it work?",
      answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis saepe molestiae distinctio asperiores cupiditate consequuntur dolor ullam, iure eligendi harum eaque hic corporis debitis porro consectetur voluptate rem officiis architecto."
    },
    {
      question: "What are the major challenges of current agriculture?",
      answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis saepe molestiae distinctio asperiores cupiditate consequuntur dolor ullam, iure eligendi harum eaque hic corporis debitis porro consectetur voluptate rem officiis architecto."
    },
    {
      question: "How does the Krushi address the above challenges?",
      answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis saepe molestiae distinctio asperiores cupiditate consequuntur dolor ullam, iure eligendi harum eaque hic corporis debitis porro consectetur voluptate rem officiis architecto."
    },
    {
      question: "How can I be a part of Krushi?",
      answer: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Facilis saepe molestiae distinctio asperiores cupiditate consequuntur dolor ullam, iure eligendi harum eaque hic corporis debitis porro consectetur voluptate rem officiis architecto."
    },
  ];

  return (
    <>
      <div className="contact-us-container">
        <div className="title">Do you have any questions?</div>
        <div className="description">
          For inquiries, contact us via phone, email or our website's contact form
          given below. Our Saffair team is here to help you effectively.
        </div>
        <div className="contact-section">
          <div className="contact-info">
            <div className="contact-info-item">
              <p className="contact-label">Contact Us</p>
              <p className="contact-text">
                We are here to help you, whatever kind of help you need
              </p>
              <p className="contact-email">breath@saffair.in</p>
            </div>
            <div className="contact-info-item">
              <div className="horizontal-line"></div>
              <p className="contact-label">ADDRESS</p>
              <p className="contact-text">
                204, Loha Bhavan, Opp. Old High-court, Income Tax, Ahmedabad-380014   <br />   8am - 8pm      </p>
              <p className="contact-email">
                <a href="tel:+919328696119">
                  +91-9328696119
                </a>
              </p>
            </div>
          </div>
          <div className="contact-form">
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="label">
                  Your Name<span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  value={uname}
                  placeholder="Name"
                  className="input"
                  maxLength={200}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="label">
                  Your Email<span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  value={uemail}
                  placeholder="Email"
                  className="input"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Contact no." className="label">
                  Your Contact no.<span className="required">*</span>
                </label>
                <input
                  type="number"
                  id="contactno"
                  value={unumber}
                  placeholder="Number"
                  className="input"
                  required
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="msg" className="label">
                  Message<span className="required">*</span>
                </label>
                <br />
                <textarea
                  rows="4"
                  cols="40"
                  id="msg"
                  className="textarea"
                  required
                  value={umessage}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <Button
                gradientDuoTone="cyanToBlue"
                outline
                type="submit"
                disabled={loading}
                className="submit-button"
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="loading-text">Loading...</span>
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </div>
        </div>
        {showSuccessMessage && (
          <p className="success-message">
            Thank you for reaching out to us. We will get back to you as soon as
            possible.
          </p>
        )}
      </div>
      <div className="join-us-section">
      <h1>Join Our Company</h1>
      <div className="Role">
        <div className="Role-member" id="r1">
          <div className="logo">
            <span className="material-symbols-outlined">
            <FontAwesomeIcon icon={faGear} />
              
            </span>
          </div>
          <h3>Engineer</h3>
          <p>
            <a href="mailto:join@saffair.in">
              <FontAwesomeIcon icon={faEnvelope} /> join@saffair.in
            </a>
          </p>
        </div>
        <div className="Role-member" id="r2">
          <div className="logo">
          <span className="material-symbols-outlined">
          <FontAwesomeIcon icon={faBrush} />
              
            </span>
          </div>
          <h3>Designer</h3>
          <p>
            <a href="mailto:join@saffair.in">
              <FontAwesomeIcon icon={faEnvelope} /> join@saffair.in
            </a>
          </p>
        </div>
        <div className="Role-member" id="r3">
          <div className="logo">
          <span className="material-symbols-outlined">
          <FontAwesomeIcon icon={faSignal} />
              
            </span>
          </div>
          <h3>Marketing</h3>
          <p>
            <a href="mailto:marketing@saffair.in">
              <FontAwesomeIcon icon={faEnvelope} /> marketing@saffair.in
            </a>
          </p>
        </div>
        <div className="Role-member" id="r4">
          <div className="logo">
          <span className="material-symbols-outlined">
          <FontAwesomeIcon icon={faHandshake} />
              
            </span>          </div>
          <h3>Dealership</h3>
          <p>
            <a href="mailto:Dealers@saffair.in">
              <FontAwesomeIcon icon={faEnvelope} /> Dealers@saffair.in
            </a>
          </p>
        </div>
      </div>
    </div>
      <div className="faq-section">
        <div className="wrapper">
          <h1>Frequently Asked Questions</h1>
          {faqData.map((faq, index) => (
            <div className="faq" key={index}>
              <button
                className={`accordion ${activeIndex === index ? 'active' : ''}`}
                onClick={() => toggleAccordion(index)}
              >
                {faq.question}
                <FontAwesomeIcon icon={faChevronDown} />
              </button>
              <div className={`pannel ${activeIndex === index ? 'active' : ''}`} style={{ display: activeIndex === index ? 'block' : 'none' }}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
>>>>>>> master
  );
};

export default ContactUs;
