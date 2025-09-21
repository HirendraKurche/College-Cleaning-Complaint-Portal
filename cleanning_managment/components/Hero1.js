"use client";

import React from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

const Hero1 = () => {
  return (
    <div className="bg-[#aed8da]">
      <Parallax pages={1} style={{ top: "0", left: "0" }}>
        {/* MANIT Building Image */}
        <ParallaxLayer offset={0} speed={2.5}>
          <div
            className="w-full h-screen bg-no-repeat bg-contain bg-center"
            style={{backgroundImage: "url('/images/parallax/manit1.png')",}}
          />
        </ParallaxLayer>

        {/* Balauster 1 */}
        {/* <ParallaxLayer offset={0} speed={2.5}>
            <div
            className="w"
            style={{ backgroundImage: "url('assets/images/parallex/balauster1.png')", top: '100px', left: '50px' }}
            />
        </ParallaxLayer> */}

        {/* Balauster 2 */}
        {/* <ParallaxLayer offset={0} speed={2.5}>
            <div
            className="w-full h-screen bg-no-repeat bg-cover"
            style={{ backgroundImage: "url('assets/images/parallex/balauster2.png')", top: '150px', left: '150px' }}
            />
        </ParallaxLayer> */}
        {/* Balauster 3*/}
        {/* <ParallaxLayer offset={0} speed={2.5}>
            <div
            className="w-full h-screen bg-no-repeat bg-cover"
            style={{ backgroundImage: "url('assets/images/parallex/balauster3.png')", top: '150px', left: '150px' }}
            />
        </ParallaxLayer> */}
        {/* Cloud 1 */}
        {/* <ParallaxLayer offset={0} speed={2.5}>
            <div
            className="absolute w-40 h-40 bg-no-repeat bg-contain"
            style={{ backgroundImage: "url('assets/images/parallex/cloud1.png')", top: '80px', left: '300px' }}
            />
        </ParallaxLayer> */}

        {/* Tree */}
        {/* <ParallaxLayer offset={0} speed={2.5}>
            <div
            className="absolute w-[250px] h-[300px] bg-no-repeat bg-contain"
            style={{ backgroundImage: "url('assets/images/parallex/tree.png')", top: '350px', left: '600px' }}
            />
        </ParallaxLayer> */}

        {/* Paper Roll */}
        {/* <ParallaxLayer offset={0} speed={2.5}>
            <div
            className="absolute w-24 h-24 bg-no-repeat bg-contain"
            style={{ backgroundImage: "url('/images/paperroll.png')", top: '400px', left: '400px' }}
            />
        </ParallaxLayer> */}
      </Parallax>
    </div>
  );
};

export default Hero1;
