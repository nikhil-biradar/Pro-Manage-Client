import React, { useState, useEffect } from 'react';
import Style from './Loading.module.css'; // Import CSS for styling

const LoadingPage = (height) => {

  const style = {height:height.height}
  return (
    <div style={style} className={Style.loadingpage}>
        <div className={Style.loadingspinner}>
          <div className={Style.spinner}></div>
          <p>Loading...</p>
        </div>
    </div>
  );
};

export default LoadingPage;
