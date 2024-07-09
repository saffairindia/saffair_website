import React from "react";
import { faSquareFacebook, faSquareInstagram, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import about from "./images/about1.jpeg";
import akshat from "./images/Akshat 6.png";
import karishma from "./images/Karishma_1.png";
import nirmit from "./images/nimit.png";
import image2 from "./images/image2.jpg";
import image3 from "./images/image3.jpg";
const AboutUsPage = () => {
  const navigate = useNavigate();

  const handleOnclick = () => {
    navigate('/blog');
  };

  return (
    <div className="about-us-container my-[80px] mx-auto">
      <h2 className="title my-3 text-center text-[48px] font-bold">Welcome to Saffair</h2>

      <main>
        <section className="section-intro flex flex-col md:flex-row items-center bg-gray-100 p-6">
          <div className="section-intro-image md:w-1/2">
            <img src={about} alt="Our Team" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
          <div className="section-intro-text md:w-1/2 md:pl-6 mt-6 md:mt-0 text-center md:text-left">
            <h1 className="text-2xl font-bold">About us</h1>
            <p className="mt-4">Saffair is a dedicated professional platform committed to raising environmental awareness and fostering a sustainable future. Our mission is to channel our passion for the environment into a vibrant, informative, and engaging website. We strive to educate and inspire our community through insightful content, innovative ideas, and actionable steps towards a greener planet. We hope you find our content as enriching and enjoyable as we do in creating and sharing it. Together, let's make a positive impact on the world.
</p>
            <hr className="my-4"/>
            <div className="section-intro-query">
              <p>Have any questions? <br />Contact us!</p>
              <h1 className="text-xl font-bold"><a href="tel:+919328696119" className="text-blue-500">+91-9328696119</a></h1>
            </div>
          </div>
        </section>

        <section className="section-about flex flex-col md:flex-row items-center bg-white p-6">
          <div className="section-about-text md:w-1/2 md:pr-6 mt-6 md:mt-0 text-center md:text-left">
            <h1 className="text-2xl font-bold">Vision</h1>
            <p className="mt-4">At Saffair, we envision a world where sustainability transcends buzzwords and becomes an integral part of everyday life. By fostering collaboration and embracing innovative designs, we strive to create an environment where clean air is a universal reality. Our goal is to ensure that everyone, today and for generations to come, can breathe freely and thrive in a healthier, greener world. Together, we are shaping a future where sustainable living is not just an ideal but a tangible, achievable way of life.
</p>
          </div>
          <div className="section-about-image md:w-1/2">
            <img src={image3} alt="Our Vision" className="hidden sm:block w-full h-auto rounded-lg shadow-lg" />
          </div>
        </section>

        <section className="section-third flex flex-col md:flex-row items-center bg-gray-100 p-6">
          <div className="section-third-image md:w-1/2">
            <img src={image2} alt="Our Mission" className="w-full h-auto rounded-lg shadow-lg" />
          </div>
          <div className="section-third-text md:w-1/2 md:pl-6 mt-6 md:mt-0 text-center md:text-left">
            <h1 className="text-2xl font-bold">Mission</h1>
            <p className="mt-4">Our mission at Saffair is to make clean air accessible to all, transcending social and economic barriers. We are dedicated to more than just air purification; we aim to empower communities, build trust, and advocate for clean air as a fundamental right. By championing this cause, we ensure that every individual has the opportunity to live in a healthy environment. Through education, technology, and community engagement, we are committed to fostering a world where clean air is not a privilege, but a guaranteed right for everyone.
</p>
          </div>
        </section>
      </main>

      <section className="section-team text-center bg-white p-6">
        <h2 className="text-2xl font-bold mb-6">Team Members</h2>
        <div className="team-list grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="team-member p-4 shadow-lg rounded-lg bg-gray-50">
            <img src={akshat} alt="Akshat Shah" className="w-24 h-24 rounded-full mx-auto" />
            <h3 className="mt-4 text-xl font-bold">Akshat Shah</h3>
            <p className="text-gray-600">Founder & CEO</p>
            <div className="flex justify-center mt-4 space-x-4">
              <a href="https://www.linkedin.com/in/akshat-shah-541812b0?" className="text-blue-500">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="https://www.instagram.com/who.is.akshat.shah?igsh=OGVsODFleHV3OTZl" className="text-pink-500">
                <FontAwesomeIcon icon={faSquareInstagram} />
              </a>
              <a href="https://www.facebook.com/akshat.shah.75839" className="text-blue-800">
                <FontAwesomeIcon icon={faSquareFacebook} />
              </a>
            </div>
          </div>

          <div className="team-member p-4 shadow-lg rounded-lg bg-gray-50">
            <img src={nirmit} alt="Nimit Shah" className="w-24 h-24 rounded-full mx-auto" />
            <h3 className="mt-4 text-xl font-bold">Nimit Shah</h3>
            <p className="text-gray-600">Co-founder & CTO</p>
            <div className="flex justify-center mt-4 space-x-4">
              <a href="https://www.linkedin.com/in/nimit-r-shah?" className="text-blue-500">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href="https://www.instagram.com/nimit.r.shah?igsh=NWs2YjZrdjRzc2Q3" className="text-pink-500">
                <FontAwesomeIcon icon={faSquareInstagram} />
              </a>
              <a href="https://www.facebook.com/nimit.r.shah" className="text-blue-800">
                <FontAwesomeIcon icon={faSquareFacebook} />
              </a>
            </div>
          </div>

          <div className="team-member p-4 shadow-lg rounded-lg bg-gray-50">
            <img src={karishma} alt="Karishma Shah" className="w-24 h-24 rounded-full mx-auto" />
            <h3 className="mt-4 text-xl font-bold">Karishma Shah</h3>
            <p className="text-gray-600">CFO</p>
            <div className="flex justify-center mt-4 space-x-4">
              <a href="https://www.instagram.com/karishama.shah?igsh=MW9pajlsdHA5N3o4Yg==" className="text-pink-500">
                <FontAwesomeIcon icon={faSquareInstagram} />
              </a>
              <a href="https://www.facebook.com/karishma.shah.503645" className="text-blue-800">
                <FontAwesomeIcon icon={faSquareFacebook} />
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
