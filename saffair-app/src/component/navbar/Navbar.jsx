import React, { useState, useEffect } from 'react'
import './navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBars,
  faXmark,
} from '@fortawesome/free-solid-svg-icons'
import {
  Avatar,
  Dropdown,
} from 'flowbite-react'
import { useSelector, useDispatch } from 'react-redux'

import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { SearchpostContext } from '../../page/Home'
import { signoutSuccess } from '../../redux/user/userSlice'


export default function Navbar({ _id }) {
  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const { search, setSearch } = useContext(SearchpostContext)
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const [posts, setPosts] = useState([])
  const [coin, setCoin] = useState('')
  const handleClick = (link) => {
    setActiveLink(link);
    scrollToTop();
  };
 

  const id = currentUser ? currentUser._id : null
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/user/${id}`)

        if (res.ok) {
          const data = await res.json()
          setCoin(data.totalCoins)
        }
      } catch (e) {
        console.log(e)
      }
    }

    fetchData()
  }, [id])

  useEffect(() => {
    // Fetch posts from the server
    fetch(`${process.env.REACT_APP_BACKEND_API}/post`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch posts')
        }
        return response.json()
      })
      .then((posts) => {
        setPosts(posts)
      })
      .catch((error) => {
        console.error('Error fetching posts:', error)
      })
  }, [])

  useEffect(() => {
    // Filter posts based on search keyword
    if (search.trim() !== '') {
      const filteredResults = posts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase()),
      )
      setSearchResults(filteredResults)
    } else {
      setSearchResults([])
    }
  }, [search, posts])

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const isTop = scrollTop < 50

      setIsScrolled(!isTop)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const handleSignout = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/user/signout`, {
        method: 'POST',
      })
      const data = await res.json()
      console.log('this is data : ' + data)
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess())
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
  const [activeLink, setActiveLink] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  let timer;
  const handleMouseEnter = () => {
    clearTimeout(timer);
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    timer = setTimeout(() => {
      setIsDropdownVisible(false);
    }, 300); // Adjust the delay as needed
  };
  return (
    <div
      className={`navbarContainer  top-0 ${isScrolled ? 'scrolled' : ''}`}
    >
      <div className="leftNevbar flex flex-row justify-center items-center">
        <div className="logoContainer">
          <Link to="/" className='logoNevbar'>
            <img
              src="./assets/transperent logo 1.svg"
              alt="logo"
              className="logoImage"
            />
          </Link>
        </div>

        <div className="flex justify-center items-center space-x-4">
          <Link to="/" className="links">
            <a
              className={`centerItem ${activeLink === 'home' ? 'active' : ''}`}
              onClick={() => handleClick('home')}
              href="/#"
            >
              Home
            </a>
          </Link>
          <Link to="/calculator" className="links">
            <a
              className={`centerItem ${activeLink === 'calculator' ? 'active' : ''}`}
              onClick={() => handleClick('calculator')}
              href="/#"
            >
              calculator
            </a>
          </Link>

          <div className="read relative ">
            <Link
              to="/news"
              className={`centerItem ${activeLink === 'news'  ? 'active' : ''} relative  cursor-pointer`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={() => handleClick('news')}
            >
              Readings
            </Link>
            {/* Conditional rendering based on screen size */}
            <div
              className={` absolute left-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg transition-all duration-200 ${isDropdownVisible && window.innerWidth >= 957 ? 'block' : 'hidden'}`}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                to="/blog"
                onClick={() => handleClick('/blog', 'blog')}
                className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900`}
              >
                Blogs
              </Link>
              <Link
                to="/news"
                onClick={() => handleClick('/news', 'news')}
                className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900`}
              >
                News
              </Link>
              <Link
                to="/update"
                onClick={() => handleClick('/update', 'update')}
                className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900`}
              >
                Updates
              </Link>
            </div>
          </div>



          <Link to="/events">
            <a
              className={`centerItem ${activeLink === 'campaigns' ? 'active' : ''}`}
              onClick={() => handleClick('campaigns')}
              href="/#"
            >
              Campaigns
            </a>
          </Link>
          <Link to="/aboutus">
            <a href="/#"
              className={`centerItem ${activeLink === 'aboutus' ? 'active' : ''}`}
              onClick={() => handleClick('aboutus')}
            >
              About Us
            </a>
          </Link>
          <Link to="/contactus">
            <a
              className={`centerItem ${activeLink === 'contactus' ? 'active' : ''}`}
              onClick={() => handleClick('contactus')}
              href="/#"
            >
              Contact Us
            </a>
          </Link>
        </div>

      </div>
      <div className="rightNevbar">
        {/* <Button
          className="w-12 h-10 hidden sm:inline"
          color="gray"
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaSun /> : <FaMoon />}
        </Button> */}
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <>
                {currentUser.isAdmin ? (
                  <div
                    className="flex items-center p-0.5 	rounded"
                    style={{ border: '2px solid #2196ba' }}
                  >
                    <Avatar
                      alt="user"
                      img={currentUser.profilePicture}
                      rounded
                      className="p-0.5 px-2 muserprofile"
                    />
                    <p className="mx-2 text-l text-[#327f97]  hidden sm:block">
                      {currentUser.username}
                    </p>
                  </div>
                ) : (
                  <div
                    className="flex items-center p-0.5 	rounded"
                    style={{ border: '2px solid #2196ba' }}
                  >
                    <Avatar
                      alt="user"
                      img={currentUser.profilePicture}
                      rounded
                      className="p-1  px-2 userprofile"
                    />
                    <p className="mx-2 text-l text-[#327f97] hidden sm:block">
                      {currentUser.username}
                    </p>
                    <div className="border-l border-[#327f97] h-7 p-1"></div>

                    <Avatar
                      alt="coin"
                      img="../assets/coin2.png"
                      rounded
                      className="userprofile"
                    />
                    <p className="mx-2 text-[#327f97] text-l hidden sm:block">{coin}</p>
                  </div>
                )}
              </>
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{currentUser.username}</span>
              <span className="block text-sm font-medium truncate">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            {currentUser.isAdmin ? (
              <Link to={'/dashboard?tab=profile'} onClick={scrollToTop}>
                <Dropdown.Item>Profile</Dropdown.Item>
              </Link>
            ) : (
              <>
                <Link to={'/dashboard?tab=profile'} onClick={scrollToTop}>
                  <Dropdown.Item>Profile</Dropdown.Item>
                </Link>
                <Link
                  to={
                    currentUser.isContributor
                      ? '/createblog'
                      : '/dashboard?tab=be-a-contributor'
                  }
                  onClick={scrollToTop}
                >
                  <Dropdown.Item>
                    {currentUser.isContributor
                      ? "Let's Contribute"
                      : "Let's Contribute"}
                  </Dropdown.Item>
                </Link>
              </>
            )}
            <Dropdown.Divider />
            <Dropdown.Item
              onClick={() => {
                handleSignout()
                scrollToTop()
              }}
            >
              Sign out
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <div className="community">
            <Link to="/login">
              <button
                className="hidden sm:flex"
                style={{
                  backgroundColor: '#1896ba',
                  color: 'white',
                  padding: '11px',
                  borderRadius: '5px',
                }}
              >
                Join Community
              </button>
            </Link>
          </div>
        )}

        
        <div className="menu ">
          <a href="/#" id="dropdownLink" onClick={toggleDropdown}>
            <FontAwesomeIcon icon={faBars} />
          </a>
          <div
            className="dropbox"
            id="dropdownMenu"
            style={{ display: isOpen ? 'block' : 'none' }}
          >
            <div>
              <FontAwesomeIcon
                icon={faXmark}
                style={{
                  top: '20px',
                  left: '20px',
                  position: 'absolute',
                  fontSize: '20px',
                  cursor: 'pointer',
                }}
                onClick={toggleDropdown}
              />
            </div>

            <Link to="/" style={{ textDecoration: 'none' }}>
              <a className="dropdown-item" href="/#" onClick={toggleDropdown}>
                Home
              </a>
            </Link>
            <a className="dropdown-item" href="/#" onClick={toggleDropdown}>
              Calculator
            </a>
            <Link to="/news">
              <a className="dropdown-item" href="/#" onClick={toggleDropdown}>
                Readings
              </a>
            </Link>
            <Link to="/events">
              <a className="dropdown-item" href="/#" onClick={toggleDropdown}>
                campaigns
              </a>
            </Link>
            <Link to="/aboutus">
              <a className="dropdown-item" href="/#" onClick={toggleDropdown}>
                About us
              </a>
            </Link>
            <Link to="/contactus">
              <a className="dropdown-item" href="/#" onClick={toggleDropdown}>
                Contact us
              </a>
            </Link>
            {currentUser ? (
              // Render nothing if user is logged in
              null
            ) : (
              // Render the link if user is not logged in
              <Link to="/login">
                <a className="dropdown-item" href="/#" onClick={toggleDropdown}>
                  Join Community
                </a>
              </Link>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}