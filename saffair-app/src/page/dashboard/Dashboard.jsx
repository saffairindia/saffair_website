import React from "react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import DashProfile from "../../component/dashprofile/DashProfile";
import DashSidebar from "../../component/dashsidebar/DashSidebar";
import DashPosts from "../../component/dashposts/DashPosts";
import DashallPosts from "../../component/dashposts/Dashallpost";
import DashUsers from "../../component/dashusers/DashUsers";
import DashboardComp from "../../component/DashboardComp.jsx/DashboardComp";
import Contributors from "../../component/contributors/Verify";
import Mycoins from "../../component/mycoins/Mycoins";
import Dashcontributors from "../../component/dashcontributors/Dashcontributors";
import DashReqContributor from "../../component/dashReqContributor/DashReqContributor";
import DashComments from "../../component/dashComments/DashComments";
import DashEvent from "../../component/DashEvent/DashEvent";
import ConDashboardComp from "../../component/condashboardcom/ConDashboardComp";
import DashBookMark from "../../component/DashBookMark/DashBookMark";
import PostRequest from "../../component/PostRequest/PostRequest";
import DashEventEntrys from "../../component/DashEventEntrys/DashEventEntrys";
import CreateVoucherForm from "../../component/dashVoucherForm/CreateVoucherForm";
import VoucherList from "../../component/dashshowvoucher/Dashshowvoucher";

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className="sm:min-h-screen flex flex-col md:flex-row mt-20">
      <div className="md:w-56">
        <DashSidebar />
      </div>
      <div className="flex-grow">
        <div className="w-full  sm:mx-auto">
          {tab === "profile" && <DashProfile />}
          {tab === "posts" && <DashPosts />}
          {tab === "allposts" && <DashallPosts />}
          {tab === "users" && <DashUsers />}
          {tab === "contributors" && <Dashcontributors />}
          {tab === "dash" && <DashboardComp />}
          {tab === "verify" && <Contributors />}
          {tab === "mycoins" && <Mycoins />}
          {/* {tab === "myevent" && <MyEvent />} */}
          {tab === "reqCon" && <DashReqContributor />}
          {tab === "comments" && <DashComments />}
          {tab === "event" && <DashEvent />}
          {tab === "contributorDash" && <ConDashboardComp />}
          {tab === "dashbookmark" && <DashBookMark />}
          {tab === "postrequest" && <PostRequest />}
          {tab === "evententry" && <DashEventEntrys />}
          {tab === "createvoucherform" && <CreateVoucherForm/>}
          {tab === "voucherlist" && <VoucherList/>}
        </div>
      </div>
    </div>
  );
}
