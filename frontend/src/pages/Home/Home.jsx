import React, { useState } from "react";
import PreLoader from "../../components/PreLoader";
import Nav from "../../components/Nav/Nav";
import MalayalamSpeechToText from "../../components/VoiceTast";

import HERO from "../../assets/Retro.png";
import MOM from "../../assets/mom.png";
import DAD from "../../assets/papa.png";
import BTN from "../../assets/btn.png";
import { motion } from "framer-motion";

const Home = () => {
  const [selectedOption, setSelectedOption] = useState("mom");
  // const [preloader, setPreLoader] = useState(true);
  // setTimeout(() => {
  //   setPreLoader(false);
  // }, 3000);
  // console.log(preloader);
  return (
    <div className="home">
      <Nav
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
      />

      <motion.img
        initial={{ scale: 0, rotate: "20deg" }}
        animate={{ scale: 1, rotate: "0deg" }}
        transition={{ duration: 0.8, type: "spring" }}
        className="hero-txt"
        src={HERO}
        alt=""
      />
      <div className="voice-txt">
        <p className="voice-txt-p">
          <MalayalamSpeechToText
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
          />
        </p>
      </div>
      <motion.img
        initial={{ scale: 0, rotate: "20deg" }}
        animate={{ scale: 1, rotate: "0deg" }}
        transition={{ duration: 0.8, type: "spring", delay: 0.4 }}
        src={selectedOption == "mom" ? MOM : DAD}
        className="speaker"
        alt=""
      />
    </div>
  );
};

export default Home;
