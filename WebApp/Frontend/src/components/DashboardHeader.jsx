import React from "react";

const DashboardHeader = () => {
  return (
    <div className="dashboard_header">
      <div className=" manage_with">
        <div className="serch">
          <img className="search_img" src="/images/searc.svg" alt="" />
          <input
            type="text"
            className="form-control search_input"
            placeholder="Search a record by name, email, dob, e.t.c."
          />
        </div>
        <div className="">
          <div className="header_items">
            <div className="noti mr-5">
              <img
                style={{ height: "25px" }}
                src="/images/noti (2).svg"
                alt=""
              />
            </div>
            <div className="contact_person mr-5">
              <img style={{ height: "30px" }} src="/images/admi.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
