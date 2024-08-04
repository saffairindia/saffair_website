import React, { useState } from "react";
import { Button, Spinner } from "flowbite-react";
import { useSelector } from "react-redux";
import { faChevronDown, faEnvelope, faBrush, faGear, faSignal, faHandshake } from "@fortawesome/free-solid-svg-icons";
import emailjs from "@emailjs/browser";
import "./contactus.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import market from "../ContactUs/promote.png"
import Loadder from "../../lottie/Loadder";

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
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "What is the Saffair Community?",
      answer:"Saffair is an online platform for environmental enthusiasts and professionals dedicated to sustainable living. It encourages knowledge sharing and collaborative efforts toward environmental good deeds. Members can earn coins, redeemable for vouchers, by contributing to the community. Saffair's vision and mission emphasize these values to create a sustainable future for current and future generations"
    },
    {
      question: "What can I contribute?",
      answer: "You can contribute various types of content, such as campaigns, latest innovations, news,legal updates, legal reforms, and more, as long as they relate to the environment, sustainability, and health. For specific options, refer to the ' Let's Contribute ' section in your profile"
    },
    {
      question: "What is a campaign, and how can I join one?",
      answer: " Campaigns are events listed on the Campaign page of our website. Each campaign includes details such as the date, activities involved, and rewards. You can join a campaign by clicking 'Yes,' 'No,' or 'Maybe' based on your interest and availability"
    },
    {
      question: "How do I earn coins for joining a campaign?",
      answer:"After selecting 'Yes' or 'Maybe' for a campaign, navigate to 'Let's Contribute -> Campaign -> [Your Selected Campaign]' and upload the required photos as specified in the campaign details. Once approved by the Saffair Team, you will receive coins based on your participation and contributions."
    },
    {
      question: " How can I check my contributions?",
      answer:"You can view your contribution history by going to Profile -> My Contributions."
    },
    {
      question: " How can I earn coins, and how many can I earn?",
      answer:"There are two main ways to earn coins: 1. Reading Articles: Visit the Knowledge Centre, read articles, and answer the questions provided. Correct answers will earn you 5 to 10 coins. 2. Contributing Content: Submit contributions through your profile in the 'Let's Contribute' section. The number of coins earned depends on the type and depth of your contribution. There is no upper limit; contributions can earn anywhere from 0 to 100 coins, with extra coins possible for deeper involvement."
    },
    {
      question: "How can I see my coin history?",
      answer:"To view your coin history, go to 'Profile -> My Coins.'"
    },
    {
      question: " I made a contribution but didn't receive reward coins. What should I do?",
      answer:"Coins are awarded for each valid contribution. If you haven't received coins, please wait 2-3 days for review. If the issue persists, contact the Saffair Team at Breathe@saffair.in or through the Contact Us page. Note that for contributions like'News', if another user has already shared the same, you may not receive coins. In such cases, contact the Saffair ko Pi team for clarification."
    },
    {
      question: "What can I use these coins for?",
      answer:"Coins can be redeemed for vouchers available on our website. The value and type of vouchers vary, and you can choose based on your preferences."
    },

    {
      question: "How can I redeem my coins?",
      answer: "To redeem your coins, go to 'Login -> Profile -> Redeem Voucher,' select your preferred voucher, and receive a mail receipt."
    },
    {
      question: "How do I receive the voucher code?",
      answer: "The voucher code will be included in the mail receipt once you redeem your coins. You can use this code on the respective platform"
    },
    {
      question: "Why isn't my contribution published on the website?",
      answer: "While all contributions are rewarded with coins, publishing them on the website (Blog, News, or Updates sections) is at the discretion of the Saffair Team."
    },
    {
      question: "Is it mandatory to provide social media profile links?",
      answer: "No, providing social media profile links is optional. They are used for linking creditor details in the Knowledge Centre articles."
    },
    {
      question: "Why doesn't my name appear as a contributor on my published article?",
      answer: "If you chose not to publish your name during submission, the article will list the contributor as 'Unknown' or 'Saffair Team.' If multiple users submitted the same news, only the first person will be credited and rewarded."
    },
    {
      question:"What is the Job Alert feature?",
      answer:"The Job Alert toggle in your profile can be enabled to receive relevant job alerts based on your education, field of work, and work experience. You'll be prompted to add these details once the toggle is enabled"
    },
    {
      question:"Do I need to pay for job alerts?",
      answer:"No, job alerts are completely free as part of your membership in the Saffair Communi."
    }

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
              <a href="mailto:breathe@saffair.in">
                <p className="contact-email">breathe@saffair.in</p>
              </a>
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
                    <Loadder/>
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
              <span className="material-symbols-outlined p-5">
              <img src={market} alt="market" srcset=""         className="w-24 h-auto md:w-36 md:h-auto"
              />
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
              <div className={`pannel pt-6 ${activeIndex === index ? 'active' : ''}`} style={{ display: activeIndex === index ? 'block' : 'none' }}>
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ContactUs;
