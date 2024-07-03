import React from "react";
import { Link } from "react-router-dom";
import styles from "./PageNotFound.module.css";
import NotFoundImage from "../../../assets/image/NotFoundImage.jpg";

function PageNotFound() {
  return (
    <div className={styles.container}>
      <img src={NotFoundImage} alt="404 Not Found" className={styles.image} />
      <div className={styles.content}>
        <h1 className={styles.title}>Oops! Page Not Found</h1>
        <p className={styles.text}>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable. <br/>
        <Link to="/" className={styles.link}>
          Go back to home
        </Link>
        </p>
      </div>
    </div>
  );
}

export default PageNotFound;
