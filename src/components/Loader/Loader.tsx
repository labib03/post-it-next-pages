import React from "react";
import styles from "./style.module.css";

function Loader() {
  return (
    <div className="flex items-center gap-2">
      <div className={styles.loader}></div>
      <h1>Loading</h1>
    </div>
  );
}

export default Loader;
