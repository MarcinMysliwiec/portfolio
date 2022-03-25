import React, { useEffect, useRef } from 'react';
import Lottie from 'lottie-web';
import animate from 'lottie-web';

const Hero = () => {
  const container = useRef(null);

  useEffect(() => {
    Lottie.loadAnimation({
      container: container.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: require('./astronaut.json'),
    });
    animate.setSpeed(0.5);
  }, []);

  return (
    <section className="my-16 px-5 md:my-32 flex flex-col flex-wrap space-y-16 md:space-y-0 patterns">
      <div className="ml-auto w-72 md:w-96 lg:w-2/5">
        <div className="container" ref={container}></div>
      </div>
      <div className="max-w-md mb-auto space-y-5">
        <h1 className="text-5xl font-bold md:text-7xl">Hello, I’m Marcin <span className="wave" role="img"
                                                                               aria-labelledby="wave">👋🏻</span></h1>
        <p className="tracking-wide leading-relaxed">
          A passionate Full Stack Web Developer and Mobile App Developer newbie having experience of building Web
          applications with JavaScript / Reactjs / Nodejs / Python / Django / React Native (a little) and some other
          cool libraries and frameworks. 🦾🧑‍💻
        </p>
      </div>
    </section>
  );
};

export default Hero;
