import { useEffect, useRef } from "react";
import "./Marquee.css";
import shivaliMarquee from "@/assets/shivali-logo.png"

const Marquee: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Duplicate slides for seamless loop
    const slides = Array.from(wrapper.children) as HTMLElement[];

    slides.forEach((slide) => {
      const clone = slide.cloneNode(true) as HTMLElement;
      wrapper.appendChild(clone);
    });

    // Compute animation duration based on total width
    const speed = 800 / 2; // px per second
    const totalWidth = wrapper.scrollWidth;
    const duration = Math.max(10, totalWidth / speed);

    wrapper.style.setProperty("--marquee-duration", `${duration}s`);
  }, []);

  return (
    <div className="marquee-area" style={{ width: "auto" }}>
      <div className="container-fluid bg-[#f4f6f8] flex h-[100px]">
        <div className="swiper th-slider marquee-slider1">
          <div
            className="swiper-wrapper marquee-wrapper"
            ref={wrapperRef}
          >
            <div className="swiper-slide">
              <div className="marquee-card">
                <div className="color-masking h-[10px]">
                  <img 
                    src={shivaliMarquee}

                    alt="Creation icon"
                  />
                </div>
                {/* <a href="#">CREATION</a> */}
              </div>
            </div>

            <div className="swiper-slide">
              <div className="marquee-card">
                <div className="color-masking h-[10px]">
                  <img
                    src={shivaliMarquee}

                    alt="Discover icon"
                  />
                </div>
                {/* <a href="#">DISCOVER</a> */}
              </div>
            </div>

            <div className="swiper-slide">
              <div className="marquee-card">
                <div className="color-masking h-[10px]">
                  <img
                    src={shivaliMarquee}

                    alt="Innovate icon"
                  />
                </div>
                {/* <a href="#">INNOVATE</a> */}
              </div>
            </div>

            <div className="swiper-slide">
              <div className="marquee-card">
                <div className="color-masking h-[10px]">
                  <img
                    src={shivaliMarquee}

                    alt="Education icon"
                  />
                </div>
                {/* <a href="#">EDUCATION</a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Marquee;
