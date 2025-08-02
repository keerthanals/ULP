import React from "react";
import LOADER from '../assets/Loading.gif';
import { motion } from "framer-motion";

const PreLoader = () => {
  return (
    <div className="preloader">
      <motion.img 
      src={LOADER} alt=""
      style={{
        width:'300px'
      }}
      />
    </div>
  );
};

export default PreLoader;
