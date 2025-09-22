"use client";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis, useLenis } from "lenis/react";
import Image from "next/image";
import { useRef } from "react";
import img1 from "../../public/images/img-1.jpg";
import img2 from "../../public/images/img-2.jpg";
import img3 from "../../public/images/img-3.jpg";
import img4 from "../../public/images/img-4.jpg";

export default function Home() {
  const lenis = useLenis(() => {});

  const container = useRef(null);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      const cards = document.querySelectorAll(".card");
      const images = document.querySelectorAll(".card img");
      const totalCards = cards.length;

      gsap.set(cards[0], {
        y: "0%",
        scale: 1,
        rotate: 0,
      });

      gsap.set(images[0], {
        scale: 1,
      });

      for (let i = 1; i < totalCards; i++) {
        gsap.set(cards[i], {
          y: "100%",
          scale: 1,
          rotate: 0,
        });

        gsap.set(images[i], {
          scale: 1,
        });
      }

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".sticky-cards",
          start: "top top",
          end: "+=" + window.innerHeight * (totalCards - 1),
          pin: true,
          scrub: 0.5,
        },
      });

      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = cards[i];
        const currentImage = images[i];
        const nextCard = cards[i + 1];
        const position = i;

        scrollTimeline.to(
          currentCard,
          {
            scale: 0.5,
            rotation: 10,
            duration: 1,
            ease: "none",
          },
          position
        );
        scrollTimeline.to(
          currentImage,
          {
            scale: 1.5,
            duration: 1,
            ease: "none",
          },
          position
        );
        scrollTimeline.to(
          nextCard,
          {
            y: "0%",
            duration: 1,
            ease: "none",
          },
          position
        );
      }
    },
    { scope: container }
  );
  return (
    <ReactLenis root>
      <div ref={container} className="overflow-hidden">
        {/* Intro Section */}
        <section className="intro">
          <h1>
            Art is not what you see. It&apos;s what you *feel* in the blur, the
            chaos, the motion — every pulse captured in color and form.
          </h1>
        </section>

        {/* Sticky Cards Section */}
        <section className="sticky-cards">
          <div className="cards-container">
            <div className="card">
              <div className="tag">
                <p>Motion Blur</p>
              </div>
              <Image src={img1} alt="Motion blur art" />
            </div>
            <div className="card">
              <div className="tag">
                <p>Abstract Flow</p>
              </div>
              <Image src={img2} alt="Abstract flow art" />
            </div>
            <div className="card">
              <div className="tag">
                <p>Color Chaos</p>
              </div>
              <Image src={img3} alt="Color chaos art" />
            </div>
            <div className="card">
              <div className="tag">
                <p>Dynamic Energy</p>
              </div>
              <Image src={img4} alt="Dynamic energy art" />
            </div>
            <div className="card">
              <div className="tag">
                <p>Visual Rhythm</p>
              </div>
              <Image src={img1} alt="Visual rhythm art" />
            </div>
          </div>
        </section>

        {/* Outro Section */}
        <section className="outro">
          <h1>
            This isn&apos;t just motion. It&apos;s meaning in movement. In every
            blurred edge and amplified hue, we trace the shape of something
            deeper — truth in abstraction.
          </h1>
        </section>
      </div>
    </ReactLenis>
  );
}
