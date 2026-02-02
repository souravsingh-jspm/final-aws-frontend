import { useEffect, useRef } from "react";
import "./Marquee.css";
import shivaliMarquee from "@/assets/shivali-logo.png";

const Marquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  return (
    <div className="marquee-area">
      <div className="marquee-track" ref={containerRef}>
        <div className="single-image-marquee">
          <img 
            src={shivaliMarquee} 
            alt="Shivali logo" 
            className="marquee-single-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Marquee;