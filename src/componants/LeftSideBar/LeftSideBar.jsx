import React, { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";

import Style from "./LeftSideBar.module.css";
import sandbox from "../../assets/icon/codesandbox.png";
import database from "../../assets/icon/database.png";
import settings from "../../assets/icon/settings.png";
import layout from "../../assets/icon/layout.png";
import logout from "../../assets/icon/Logout.png";

function LeftSideBar() {
  const [logoutPop, setlogoutPop] = useState(false);

  const navigate = useNavigate();
  const handleLogout = ()=>{
    localStorage.clear()
    navigate('/')
  }

  return (
    <>
      {logoutPop ? (
        <div className={Style.PopBack}>
          <div className={Style.logoutPopup}>
            <div>Are you sure you want to Logout?</div>
            <div className={Style.logoutBtns}>
              <button className={Style.yesLog} onClick={handleLogout}>Yes, Logout</button>
              <button className={Style.cancel} onClick={() => setlogoutPop(false)}>Cancel</button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className={Style.leftcontainer}>
        <div className={Style.head}>
          <img src={sandbox} alt="sandbox" />
          <h1>Pro Manage</h1>
        </div>
        <div className={Style.sidebar}>
          <NavLink to="/board" className={Style.nav} activeclassname="active">
            <div className={`${Style.board} ${Style.left}`}>
              <img src={layout} alt="board" />
              <p style={{ marginRight: "20px" }} className="p">
                Board
              </p>
            </div>
          </NavLink>
          <NavLink
            to="/analytics"
            className={Style.nav}
            activeclassname="active"
          >
            <div className={`${Style.analytics} ${Style.left}`}>
              <img src={database} alt="database" />
              <p className="p">Analytics</p>
            </div>{" "}
          </NavLink>
          <NavLink to="/setting" className={Style.nav} activeclassname="active">
            <div className={`${Style.settings} ${Style.left}`}>
              <img src={settings} alt="settings" />
              <p style={{ marginRight: "10px" }} className="p">
                Settings
              </p>
            </div>
          </NavLink>
        </div>
        <div
          className={`${Style.logout} ${Style.left}`}
          onClick={() => setlogoutPop(true)}
        >
          <img src={logout} alt="logout" />
          <p>Log out</p>
        </div>
      </div>
    </>
  );
}

export default LeftSideBar;
