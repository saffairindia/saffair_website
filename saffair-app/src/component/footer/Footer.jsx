import "./footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareFacebook,
  faSquareInstagram,
  faSquareXTwitter,
  faLinkedin,
  faSquareYoutube
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
const img = "./assets/logofooter.png";

export default function Home() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const share = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Check out this product!',
          text: 'I found this amazing product, check it out.',
          url: window.location.href, // Or specify a different URL
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      console.log('Web Share API not supported in this browser.');
    }
  };

  const handleClick = (e) => {
    scrollToTop();
    share();
  };
  return (
    <footer className="footMain">
      <div className="foot-panel2">
        <div className="logo-foot">
          <img className="imgfooter" src={img} />
        </div>
        <div className="f1">
          <div className="f2">
            <ul className="foot1">
              <li>
                <a href="/#" className="centerItem1" onClick={scrollToTop}>
                  Knowledge centre
                </a>
              </li>
              <li className="ml-4">
                <Link to="/blog">
                  <a href="/#" className="centerItem1 flex items-center" onClick={scrollToTop}>
                    <svg className="w-1 h-1 mr-1" fill="currentColor" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="4" cy="4" r="4" />
                    </svg>
                    Blogs
                  </a>
                </Link>
              </li>
              <li className="ml-4">
                <Link to="/news">
                  <a  href="/#" className="centerItem1 flex items-center" onClick={scrollToTop}>
                    <svg className="w-1 h-1 mr-1" fill="currentColor" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="4" cy="4" r="4" />
                    </svg>
                    News
                  </a>
                </Link>
              </li>
              <li className="ml-4">
                <Link to="/Update">
                  <a href="/#" className="centerItem1 flex items-center" onClick={scrollToTop}>
                    <svg className="w-1 h-1 mr-1" fill="currentColor" viewBox="0 0 8 8" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="4" cy="4" r="4" />
                    </svg>
                    Updates
                  </a>
                </Link>
              </li>
              <li>
                <Link to="/calculator">
                  <a href="/#" className="centerItem1" onClick={scrollToTop}>
                    Calculator
                  </a>
                </Link>
              </li>
              <li>
                <Link to="/contactus">
                  <a href="/#" className="centerItem1" onClick={scrollToTop}>
                    Contact Us
                  </a>
                </Link>
              </li>
              <li>
                <Link to="/aboutus">
                  <a  href="/#" className="centerItem1" onClick={scrollToTop}>
                    About Us
                  </a>
                </Link>
              </li>
            </ul>

            <ul className="foot2">
              <Link to="/dashboard?tab=profile">
                <a  href="/#" className="centerItem1" onClick={scrollToTop}>
                  My Profile
                </a>
              </Link>
              <br />
              <Link to="/dashboard?tab=mycoins">
                <a href="/#" className="centerItem1" onClick={scrollToTop}>
                  My Coins
                </a>
              </Link>
              <br />
              <Link to="/dashboard?tab=dashbookmark">
                <a  href="/#" className="centerItem1" onClick={scrollToTop}>
                  My Bookmarks
                </a>
              </Link>
              <br />
              <Link to="/dashboard?tab=profile">
                <a href="/#"  className="centerItem1" onClick={scrollToTop}>
                  Job profile
                </a>
              </Link>
              <br />
              <Link to="">
                <a  href="/#" className="centerItem1" onClick={scrollToTop}>
                  My Order
                </a>
              </Link>

              <br />
              <a  href="/#" className="centerItem1" onClick={handleClick}>
                refer a friend
              </a>

            
            </ul>
            <ul className="foot2">
              <Link to="/product">
                <a  href="/#" className="centerItem1" onClick={scrollToTop}>
                  Product
                </a>
              </Link>
              <br/>
              <Link to="/product">
                <a  href="/#" className="centerItem1" onClick={scrollToTop}>
                  Buy Saffair Aero 200                  </a>
              </Link>
              <br />
              <Link to="/product">
                <a  href="/#" className="centerItem1" onClick={scrollToTop}>
                  ⁠Buy Saffair Aero 450
                </a>
              </Link>
              <br />
              <Link to="/product">
                <a href="/#" className="centerItem1" onClick={scrollToTop}>
                   ⁠Buy Attachments
                </a>
              </Link>
              <br />
              <Link to="/product">
                <a href="/#" className="centerItem1" onClick={scrollToTop}>
                  ⁠Buy Filters               </a>
              </Link>
              <br />
              <Link to="/product">
                <a href="/#" className="centerItem1" onClick={scrollToTop}>
                  ⁠Become a Dealer             </a>
              </Link>
              <br />
              <Link to="/product">
                <a href="/#" className="centerItem1" onClick={scrollToTop}>
                  ⁠Corporate Gifting             </a>
              </Link>
              <br />




            </ul>
          </div>
          <div className="f3">
            <ul className="foot3">
              <p>Contact us</p>
              <a href="tel:+91989889889">
                <li>+91 989889889</li>
              </a>
              <a href="mailto:support@saffair.in">
                <li>support@saffair.in</li>
              </a>
            </ul>
            <ul className="social">
              <p className="text-align">Socials</p>
              <div className="socialapp">
                <a href="https://www.facebook.com/share/sYCKRUGcdDQR8exy/?mibextid=LQQJ4d" target="blank" className="icon1">
                  <FontAwesomeIcon icon={faSquareFacebook} />
                </a>
                <a href="https://www.instagram.com/saff_air?igsh=OWo5bm9lY2dud2t2&utm_source=qr" className="icon1" target="_blank">
                  <FontAwesomeIcon icon={faSquareInstagram} />
                </a>


                <a href="https://x.com/saff_air?s=21&t=vaXYQmjylPtSS4rtdTueDQ" target="blank" className="icon1">
                  <FontAwesomeIcon icon={faSquareXTwitter} />
                </a>
                <a href="https://www.linkedin.com/company/saffair/" target="blank" className="icon1">
                  <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a href="https://www.youtube.com/@Saffair-india" target="blank" className="icon1">
                  <FontAwesomeIcon icon={faSquareYoutube} />
                </a>
              </div>
              <div className="playstore">
                <a class="btn btn-google" rel="noreferrer noopener" href="/#" title="Google Play">
                  Google Play
                </a>
              </div>
              <div className="appstore">
                <a class="btn btn-apple"  rel="noreferrer noopener" href="/#" title="App Store">
                  App Store
                </a>
              </div>
            </ul>
          </div>
        </div>
      </div>
      <div className="foot-panel4">
        <div className="pages">
          <a href="/#">Conditions of Use</a>
          <a href="/#">Privacy Notice</a>
          <a href="/#">Your Ads Privacy Choices</a>
        </div>
        <div className="copyright">
          <Link to="https://agevole.in/" target="_blank">  ©2024 Saffair All rights reserved | Design and Developed by Agevole Innovation </Link>
        </div>
      </div>
    </footer>
  );
}
