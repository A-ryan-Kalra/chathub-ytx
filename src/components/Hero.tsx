"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { Alfa_Slab_One, Shojumaru, Bungee } from "next/font/google";
import { Icon } from "@iconify/react";
import Script from "next/script";

const alfa = Shojumaru({ subsets: ["latin"], weight: "400" });
const noto = Bungee({ subsets: ["latin"], weight: "400" });

const Hero = () => {
  useEffect(() => {
    const imgLeft = document.querySelectorAll(".translate-left");
    const imgRight = document.querySelectorAll(".translate-right");
    const rotate = document.querySelector(".rotate");
    const popUpOnce = document.querySelector(".popUpOnce");
    // console.log(imgLeft);
    if (imgLeft && imgRight && rotate && popUpOnce) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // console.log(entry.target.classList.contains("animate"));

            if (entry.isIntersecting) {
              entry.target.classList.add("animate");
              observer.unobserve(entry.target);
            }
            //  else {
            //   entry.target.classList.remove("animate");
            // }
          });
        },
        { threshold: 0.8 }
      );
      imgLeft.forEach((img) => observer.observe(img));
      imgRight.forEach((img) => observer.observe(img));
      observer.observe(rotate);
      observer.observe(popUpOnce);
    }
  }, []);

  return (
    <div className="overflow-hidde">
      <Script
        src="https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js"
        strategy="afterInteractive"
      />
      <div className="relative w-full bg-gradient-to-br from-fuchsia-400 to-yellow-300 ">
        <div className="pb-20 w-[1520px] pt-[200px]  lg:max-h-[calc(100vh-200px)] md:max-lg:min-h-[calc(100vh-400px)] mx-auto flex justify-between items-end">
          <div className="relative  max-sm:top-[90px] max-md:top-6  -left-[70px] xl:-left-[300px] lg:-left-[420px] bottom-0 w-[400px]  md:hidden xl:top-0 lg:inline h-[400px] sm:w-[550px] sm:h-[340px] lg:w-[650px]  ">
            <Image
              draggable="false"
              src={"/discord5.svg"}
              fill
              className=" lg:inline bg-contain cursor-auto"
              alt="hero-logo-1"
            />
          </div>
          <div className="relative xl:-right-[200px] bottom-0 w-[650px] md:max-lg:left-[300px]  md:bottom-0 lg:max-xl:left-[50px] h-[340px] ">
            <Image
              draggable="false"
              src={"/discord3.svg"}
              fill
              className="bg-contain"
              alt="hero-logo-1"
            />
          </div>
          <div className="p-4 lg:p-0 absolute lg:w-[790px] z-10 top-5 md:top-0 lg:translate-y-[-35%] lg:left-[50%] md:px-10 md:w-[60%] lg:translate-x-[-50%] flex-col lg:items-center   lg:top-[35%]">
            <h1
              className={`lg:text-center  md:text-[40px] lg:text-[57px] text-[27px]  text-white font-bold ${alfa.className}`}
            >
              IMAGINE A PLACE...
            </h1>
            <p className="text-white text-lg text-left lg:text-center mt-6 ">
              ...where you can belong to a school club, a gaming group, or a
              worldwide art community. Where just you and a handful of friends
              can spend time together. A place that makes it easy to talk every
              day and hang out more often.
            </p>
            {/* <div className="flex mt-5 w-[80%]  lg:mx-auto flex-col sm:flex-row lg:flex-row md:flex-col justify-around items-start   gap-5 ">
              <button
                type="button"
                className="text-black shadow-md hover:text-[#5865F2] hover:shadow-xl bg-white md:px-6 px-3 py-3  md:py-3 rounded-full"
              >
                <Icon
                  className="inline-block w-6 h-6 mr-1"
                  icon="material-symbols:download"
                />
                <span className="text-[15px]  lg:text-[18px]">
                  Download for Linux
                </span>
              </button>
              <button
                type="button"
                className="text-white hover:shadow-xl hover:bg-opacity-80 shadow-md bg-black md:px-6  px-3 py-3  md:py-3 rounded-full text-[15px] lg:text-[18px]"
              >
                Open Discord in your browser
              </button>
            </div> */}
          </div>
        </div>
      </div>
      {/* lg:max-h-[calc(100vh-200px)] md:max-lg:min-h-[calc(100vh-400px)] */}
      {/* lg:min-h-[calc(100vh-10vh)] max-md:min-h-[calc(100vh-30vh)] */}
      <div className="h-[70vh]  bg-gradient-to-tr border-t-zinc-300 from-fuchsia-400 to-yellow-300 2xl:max-h-[calc(100vh-100px)] md:max-xl:min-h-[calc(100vh-200px)] max-sm:min-h-[60vh] flex justify-center items-center">
        <div className="relative pt-[60px] w-full p-5 max-w-[1220px] mx-auto flex md:flex-row flex-col items-center justify-around">
          <img
            draggable="false"
            src="/chat1.svg"
            className="translate-left lg:w-[628px] md:w-[440px] md:h-[350px] lg:h-[480px]"
            alt=""
          />
          <div className="flex flex-col max-w-[550px] translate-right md:max-w-[400px] gap-5">
            <h1 className="text-[30px] xl:text-[40px]  font-bold">
              Create an invite-only place where you belong
            </h1>
            <p className="text-[14px] leading-7 lg:text-[18px] lg:leading-8 font-light">
              ChatHub servers are organized into topic-based channels where you
              can collaborate, share, and just talk about your day without
              clogging up a group chat.
            </p>
          </div>
        </div>
      </div>
      <div className="h-[70vh] pb-10 bg-gradient-to-br from-fuchsia-400 to-yellow-300 pt-10 lg:max-h-[calc(100vh)] md:max-lg:min-h-[calc(100vh-400px)] flex max-sm:min-h-[60vh] justify-center items-center">
        <div className="relative  w-full p-5 max-w-[1220px] mx-auto flex max-md:flex-col-reverse md:flex-row flex-col   items-center justify-around">
          <div className="popUpOnce flex flex-col pt-[60px] max-w-[550px]  md:max-w-[400px] gap-5">
            <h1 className="text-[30px] xl:text-[40px]  font-bold">
              Where hanging out is easy
            </h1>
            <p className="text-[14px] leading-7 lg:text-[18px] lg:leading-8 font-light">
              Grab a seat in a voice channel when you&apos;re free. Friends in
              your server can see you&apos;re around and instantly pop in to
              talk without having to call.
            </p>
          </div>
          <img
            draggable="false"
            src="/chat2.svg"
            className="rotate lg:w-[628px] md:w-[440px] md:h-[350px] lg:h-[480px]"
            alt=""
          />
        </div>
      </div>
      <div className="h-[60vh] bg-gradient-to-tr from-fuchsia-400 to-yellow-300  2xl:max-h-[calc(100vh-100px)] md:max-xl:min-h-[calc(100vh-200px)] max-sm:min-h-[60vh] flex justify-center items-center">
        <div className="relative  w-full p-5 max-w-[1220px] mx-auto flex md:flex-row flex-col   items-center justify-around">
          <img
            draggable="false"
            src="/chat3.svg"
            className="translate-left lg:w-[628px] md:w-[440px] md:h-[350px] lg:h-[480px]"
            alt=""
          />
          <div className="translate-right flex flex-col max-w-[550px]  md:max-w-[400px] gap-5">
            <h1 className="text-[30px] xl:text-[40px]  font-bold">
              From few to a fandom
            </h1>
            <p className="text-[14px] leading-7 lg:text-[18px] lg:leading-8 font-light">
              Get any community running with moderation tools and custom member
              access. Give members special powers, set up private channels, and
              more.
            </p>
          </div>
        </div>
      </div>
      {/* lg:max-h-[calc(100vh)] md:max-lg:min-h-[calc(100vh-400px)] */}
      <div className="overflow-visible bg-gradient-to-br from-fuchsia-400 to-yellow-300 pt-10  flex max-sm:min-h-[60vh] justify-center items-center">
        <div className="popUp relative  w-full p-5 max-w-[1220px] mx-auto flex  flex-col items-center pt-[60px] justify-around">
          <div className="flex  flex-col  max-w-[950px]   gap-5">
            <h1
              className={` text-[40px] text-center xl:text-[45px] tracking-wider max-md:text-[25px] font-bold max-md:text-left   ${noto.className}`}
            >
              RELIABLE TECH FOR STAYING CLOSE
            </h1>
            <p className="text-[18px] leading-7 lg:text-[18px] text-center max-md:text-left lg:leading-8 font-light max-sm:text-[15px]">
              Low-latency voice and video feels like you&apos;e in the same
              room. Wave hello over video, watch friends stream their games, or
              gather up and have a drawing session with screen share.
            </p>
          </div>
          <img
            draggable="false"
            src="/callerId.svg"
            className="lg:w-[1180px] md:w-[940px] md:h-[650px] lg:h-[715px]"
            alt=""
          />
        </div>
      </div>

      <div className=" bg-gradient-to-tr from-fuchsia-400 to-yellow-300 flex items-center justify-center">
        <div className=" max-md:p-5 flex flex-col items-center gap-5 pb-20">
          <div className="max-md:p-2 translate-y-10">
            <img draggable="false" src="/stars.svg" alt="glitter" />
          </div>
          <h1 className="text-left sm:text-left text-[30px] font-bold ">
            Ready to start your journey?
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Hero;
