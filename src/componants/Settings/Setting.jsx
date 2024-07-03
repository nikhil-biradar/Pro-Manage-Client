import React, { useState,useEffect } from "react";
import view from "../../assets/icon/view.png";
import { updatePassword } from "../../api/auth";
import './Setting.css'
function Setting() {
  
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false)

  const [name, setName] = useState(JSON.parse(localStorage.getItem('name')) || "");
  const handleSubmit=(e)=>{
    e.preventDefault();
    const userId = JSON.parse(localStorage.getItem('userId'))
    updatePassword({userId,name,oldPassword,newPassword})
    setNewPassword('')
    setOldPassword('')
  }


  return (
    <div className='setting-container'>
      <p>Setting</p>
      <form>
      <label htmlFor="name">
            <input type="text" id="name" placeholder="Name" value={name} onChange={(e)=>{setName(e.target.value)}} required />
            
          </label>
          <label htmlFor="password">
          <div className="pass">
            <input
              type={show ? "text" : "password"}
              id="password"
              placeholder="Old Password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <button className="view-btn" onClick={(e)=>{e.preventDefault(); setShow(!show)}}>
              <img src={view} alt="view" />
            </button>
          </div>
        </label>
          <label htmlFor="Confirmpassword">
            <div className="Confirm-pass">
              <input
                type={showConfirm ? "text" : "password"}
                id="Confirmpassword"
                placeholder="New Password"
                value={newPassword}
                onChange={(e)=>setNewPassword(e.target.value)}
                required
              />
              <button className="confirm-view-btn" onClick={(e)=>{e.preventDefault(); setShowConfirm(!showConfirm)}}>
                <img src={view} alt="view" />
              </button>
            </div>
          </label>
          <button type="submit" className="login-btn" onClick={handleSubmit}>
            Update
        </button>
      </form>
    </div>
  )
}

export default Setting
