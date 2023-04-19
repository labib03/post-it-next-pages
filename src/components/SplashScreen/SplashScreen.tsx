"use client";

import { ReactElement } from "react";
import styles from "./style.module.css";

function SplashScreen() {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className={styles.loader}></div>
    </div>
  );
}

SplashScreen.getLayout = function getLayout(page: ReactElement) {
  return page;
};

export default SplashScreen;
