import React from "react";
import { faSquareFacebook, faFacebookSquare, faInstagramSquare,faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import about from "./images/about1.jpeg";
import akshat from "./images/Akshat 6.jpg";
import karishma from "./images/Karishma_1.jpg";
import nirmit from "./images/Nimit.jpg";
import image2 from "./images/image2.jpg";
import image3 from "./images/image3.jpg";
const AboutUsPage = () => {
  const navigate = useNavigate();

  const handleOnclick = () => {
    navigate('/blog');
  };

  return (
    <div className="px-8 pt-1 about-us-container my-[80px] mx-auto">

      <main className="mt-4">
        <section className="section-intro flex flex-col  md:flex-row items-center bg-gray-100 p-6">
          <div className="section-intro-image md:w-1/4">
            <img src={about} alt="Our Team" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
          <div className="section-intro-text md:w-3/4 md:pl-6 mt-6 md:mt-0 text-center md:text-left">
            <h1 className="text-4xl font-bold text-[#2196BA]">About us</h1>
            <p className="mt-4 text-xl">Saffair is a dedicated professional platform committed to raising environmental awareness and fostering a sustainable future. Our mission is to channel our passion for the environment into a vibrant, informative, and engaging website. We strive to educate and inspire our community through insightful content, innovative ideas, and actionable steps towards a greener planet. We hope you find our content as enriching and enjoyable as we do in creating and sharing it. Together, let's make a positive impact on the world.
            </p>
            <hr className="my-4" />
            <div className="section-intro-query">
              <p>Have any questions? <br />Contact us!</p>
              <h1 className="text-xl font-bold"><a href="tel:+919328696119" className="text-blue-500">+91 93286 96119</a></h1>
            </div>
          </div>
        </section>

        <section className="section-about flex flex-col md:flex-row items-center bg-white p-6">
          <div className="section-about-text md:w-3/4 md:pr-6 mt-6 md:mt-0 text-center md:text-left">
            <h1 className="text-4xl font-bold text-[#2196BA]">Vision</h1>
            <p className="mt-4 text-xl">We envision to create Sustainable Ecosystem where clean air is a basic right, driven by community cooperation and innovative solutions.
            </p>
          </div>
          <div className="section-about-image md:w-1/4">
            <img src={image3} alt="Our Vision" className="hidden sm:block  h-3/4 w-auto rounded-lg shadow-lg" />
          </div>
        </section>

        <section className="section-third  flex flex-col md:flex-row items-center bg-gray-100 p-12">
          <div className="section-third-image md:w-1/4">
            <img src={image2} alt="Our Mission" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
          <div className="section-third-text md:w-3/4 md:pl-6 mt-6 md:mt-0 text-center md:text-left">
            <h1 className="text-4xl font-bold text-[#2196BA]">Mission</h1>
            <p className="mt-4 text-xl">At Saffair, we ensure everyone can breathe clean air by uniting technology with community efforts, making it accessible and reliable.
            </p>
          </div>
        </section>
      </main>

      <section className="section-team text-center bg-white p-6">
        <h2 className="text-2xl font-bold mb-6 text-[#2196BA]">Team Members</h2>
        <div className="team-list grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="team-member flex flex-col justify-center items-center  p-4 shadow-lg rounded-lg bg-gray-50">
            <img src={akshat} alt="Akshat Shah" className="w-2/5 max-w-xs rounded-full border-b-10 border-custom-blue shadow-custom" />
            <h3 className="mt-4 text-xl font-bold">Akshat Shah</h3>
            <p className="text-gray-600">Founder & CEO</p>
            <div className="flex justify-center mt-4 space-x-4">
              <a href="https://www.linkedin.com/in/akshat-shah-541812b0?" className="text-xl text-custom-blue">
                <FontAwesomeIcon icon={faLinkedinIn} aria-hidden="true" />
              </a>
              <a href="https://www.instagram.com/who.is.akshat.shah?igsh=OGVsODFleHV3OTZl" className="text-xl text-custom-blue">
                <FontAwesomeIcon icon={faInstagramSquare} />
              </a>
              <a href="https://www.facebook.com/akshat.shah.75839" className="text-custom-blue text-xl">
                <FontAwesomeIcon icon={faSquareFacebook} />
              </a>
            </div>
          </div>

          <div className="team-member flex flex-col justify-center items-center  p-4 shadow-lg rounded-lg bg-gray-50">
            <img src={nirmit} alt="Nimit Shah" className="w-2/5 max-w-xs rounded-full border-b-10 border-custom-blue shadow-custom" />
            <h3 className="mt-4 text-xl font-bold">Nimit Shah</h3>
            <p className="text-gray-600">Co-founder & CTO</p>
            <div className="flex justify-center mt-4 space-x-4">
              <a href="https://www.linkedin.com/in/nimit-r-shah?" className="text-custom-blue text-xl">
                <FontAwesomeIcon icon={faLinkedinIn} />
              </a>
              <a href="https://www.instagram.com/nimit.r.shah?igsh=NWs2YjZrdjRzc2Q3" className="text-custom-blue text-xl">
                <FontAwesomeIcon icon={faInstagramSquare} />
              </a>
              <a href="https://www.facebook.com/nimit.r.shah" className="text-xl text-custom-blue">
                <FontAwesomeIcon icon={faSquareFacebook} />
              </a>
            </div>
          </div>

          <div className="team-member  flex flex-col justify-center items-center  p-4 shadow-lg rounded-lg bg-gray-50">
            <img src={karishma} alt="Karishma Shah" className="w-2/5 max-w-xs rounded-full border-b-10 border-custom-blue shadow-custom" />
            <h3 className="mt-4 text-xl font-bold">Karishma Shah</h3>
            <p className="text-gray-600">CFO</p>
            <div className="flex justify-center mt-4 space-x-4">
              <a href="https://www.instagram.com/karishama.shah?igsh=MW9pajlsdHA5N3o4Yg==" className="text-xl text-custom-blue">
                <FontAwesomeIcon icon={faInstagramSquare} />
              </a>
              <a href="https://www.facebook.com/karishma.shah.503645" className="text-xl text-custom-blue">
                <FontAwesomeIcon icon={faFacebookSquare} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="thanks-section text-center p-6 bg-gray-100">
        <div className="thanks-message text-2xl font-bold">Thank you For Visiting Our Site</div>
        <div className="great-day-message text-xl mt-2">Have A Great Day!</div>
      </div>
    </div>
  );
};

export default AboutUsPage;
