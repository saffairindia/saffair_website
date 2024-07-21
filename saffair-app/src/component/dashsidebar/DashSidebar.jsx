import { Sidebar } from "flowbite-react";
import {
  HiUser,
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiAnnotation,
  HiChartPie,
  HiGift,
  HiShoppingBag,
} from "react-icons/hi";
import { MdEvent } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { BiSolidCoin } from "react-icons/bi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { signoutSuccess } from "../../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoins } from "@fortawesome/free-solid-svg-icons";

export default function DashSidebar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [tab, setTab] = useState("");
  
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_API}/api/user/signout`, {
        method: "POST",
      });
      const data = await res.json();
      console.log("this is data : " + data);
      if (!res.ok) {
        // console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Sidebar className=" w-full md:w-56 ">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          {currentUser && currentUser.isAdmin && (
            <Link to="/dashboard?tab=dash" onClick={scrollToTop}>
              <Sidebar.Item
                active={tab === "dash" || !tab}
                icon={HiChartPie}
                as="div"
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          <Link to="/dashboard?tab=profile" onClick={scrollToTop}>
            <Sidebar.Item
              active={tab === "profile"}
              icon={HiUser}
              labelColor="dark"
              label={currentUser.isAdmin ? "Admin" : ""}
              as="div"
            >
              Profile
            </Sidebar.Item>
          </Link>

          {currentUser.isAdmin && (
            <>
              <Sidebar.Collapse icon={HiDocumentText} label="Readings">
                <Link to="/createblog" onClick={scrollToTop}>
                  <Sidebar.Item icon={FaClipboardList}>
                    Create Readings
                  </Sidebar.Item>
                </Link>
                <Link to="/dashboard?tab=posts" onClick={scrollToTop}>
                  <Sidebar.Item action={tab === "posts"} icon={HiDocumentText}>
                  My Contributions                  </Sidebar.Item>
                </Link>
                <Link to="/dashboard?tab=allposts" onClick={scrollToTop}>
                  <Sidebar.Item action={tab === "allposts"} icon={HiDocumentText}>
                  All Contributions                  </Sidebar.Item>
                </Link>
              </Sidebar.Collapse>
            </>
          )}

          {(currentUser.isContributor &&  !currentUser.isAdmin)&& (
            <>
              <Sidebar.Collapse icon={HiDocumentText} label="Readings">
                <Link to="/createblog" onClick={scrollToTop}>
                  <Sidebar.Item icon={FaClipboardList}>
                    Create Readings
                  </Sidebar.Item>
                </Link>
                <Link to="/dashboard?tab=posts" onClick={scrollToTop}>
                  <Sidebar.Item action={tab === "posts"} icon={HiDocumentText}>
                  My Contributions                  
                  </Sidebar.Item>
                </Link>
              </Sidebar.Collapse>
            </>
          )}

          {!currentUser.isAdmin && (
            <>
              <Link to="/dashboard?tab=mycoins" onClick={scrollToTop}>
                <Sidebar.Item icon={BiSolidCoin}>My Coins</Sidebar.Item>
              </Link>
              {/* <Link to="/dashboard?tab=myevent" onClick={scrollToTop}>
                <Sidebar.Item icon={MdEvent}>My Events</Sidebar.Item>
              </Link> */}
              {!currentUser.isContributor && (
                <Link to="/dashboard?tab=be-a-contributor" onClick={scrollToTop}>
                  <Sidebar.Item icon={BiSolidCoin}>Be a Contributor</Sidebar.Item>
                </Link>
              )}
            </>
          )}

          {(currentUser.isContributor && !currentUser.isAdmin )&& (
            <Link to="/dashboard?tab=posts" onClick={scrollToTop}>
              <Sidebar.Item
                active={tab === "posts"}
                icon={HiDocumentText}
                as="div"
              >
                My Blogs
              </Sidebar.Item>
            </Link>
          )}

          {currentUser.isAdmin && (
            <>
              <Link to="/dashboard?tab=users" onClick={scrollToTop}>
                <Sidebar.Item
                  active={tab === "users"}
                  icon={HiOutlineUserGroup}
                  as="div"
                >
                  Users
                </Sidebar.Item>
              </Link>
              <Sidebar.Collapse icon={HiOutlineUserGroup} label="Contributors">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Link
                    to="/dashboard?tab=contributors"
                    onClick={scrollToTop}
                    style={{ textDecoration: "none", color: "inherit", marginBottom: "10px", marginLeft:"10px" }}
                  >
                    <Sidebar.Item icon={FaClipboardList}>Total Contributors</Sidebar.Item>
                  </Link>
                  <Link
                    to="/dashboard?tab=reqCon"
                    onClick={scrollToTop}
                    style={{ textDecoration: "none", color: "inherit", marginBottom: "10px" }}
                  >
                    <Sidebar.Item action={tab === "reqCon"} icon={HiOutlineUserGroup}>
                      Requests
                    </Sidebar.Item>
                  </Link>
                  <Link
                    to="/dashboard?tab=postrequest"
                    onClick={scrollToTop}
                    style={{ textDecoration: "none", color: "inherit", marginBottom: "10px" }}
                  >
                    <Sidebar.Item icon={FaClipboardList} action={tab === "postrequest"}>
                      Post Request
                    </Sidebar.Item>
                  </Link>
                </div>
              </Sidebar.Collapse>
              <Link to="/dashboard?tab=comments" onClick={scrollToTop}>
                <Sidebar.Item
                  active={tab === "comments"}
                  icon={HiAnnotation}
                  as="div"
                >
                  Comments
                </Sidebar.Item>
              </Link>
            </>
          )}

          {currentUser.isAdmin && (
            <>
              <Sidebar.Collapse icon={HiDocumentText} label="Events">
                <Link to="/dashboard?tab=event" onClick={scrollToTop}>
                  <Sidebar.Item
                    icon={FaClipboardList}
                    active={tab === "event"}
                    as="div"
                  >
                    Create Event
                  </Sidebar.Item>
                </Link>
                <Link to="/dashboard?tab=evententry" onClick={scrollToTop}>
                  <Sidebar.Item
                    action={tab === "evententry"}
                    icon={HiDocumentText}
                  >
                    List of Events
                  </Sidebar.Item>
                </Link>
              </Sidebar.Collapse>
            </>
          )}

          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=createvoucherform" onClick={scrollToTop}>
              <Sidebar.Item
                active={tab === "createvoucherform"}
                icon={HiShoppingBag}
                as="div"
              >
                Create Voucher
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isContributor && (
            <Link to="/dashboard?tab=voucherlist" onClick={scrollToTop}>
              <Sidebar.Item
                active={tab === "voucherlist" || !tab}
                icon={HiGift}
                as="div"
              >
                My Voucher
              </Sidebar.Item>
            </Link>
          )}
          {currentUser && (
            <Link to="/dashboard?tab=dashbookmark" onClick={scrollToTop}>
              <Sidebar.Item
                active={tab === "dashbookmark" || !tab}
                icon={HiChartPie}
                as="div"
              >
                My Bookmarks
              </Sidebar.Item>
            </Link>
          )}
          
          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignout}
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
