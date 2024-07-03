import React from 'react'
import Login from '../../componants/Login/Login'

import Art from '../../assets/image/Art.png'
import Style from './RegLogPage.module.css'

function RegLogPage() {
  return (
    <>
    <div className={Style.container}>
      <div className={Style.leftside}>
        <div className={Style.back}></div>
        <img src={Art} alt="Art" />
        <div className={Style.txt}>
            <h2>Welcome aboard my friend</h2>
            <p>just a couple of clicks and we start</p>
        </div>
      </div>
      <div className={Style.rightside}>
        <Login/>
      </div>
      </div>
    </>
  )
}

export default RegLogPage
