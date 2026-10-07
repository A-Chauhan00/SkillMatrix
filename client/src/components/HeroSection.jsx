
const HeroSection = () => {

  return (

    <section
      aria-labelledby="hero-title"
      className="relative isolate min-h-screen overflow-hidden px-4 bg-primary"
    >
      <div className="relative mx-auto grid min-h-screen max-w-8xl items-center px-6 py-6  rounded-md bg-base-100 sm:px-10  lg:grid-cols-[0.9fr_1.1fr] lg:gap-4 lg:px-18">
        {/* Content */}
        <div className="relative z-10 max-w-2xl">

          <h1
            id="hero-title"

            className="max-w-xl text-[clamp(4.5rem,10vw,7.5rem)] font-black uppercase leading-[0.82] tracking-[-0.019em] text-primary"
          >
            Your potential is bigger than you think.
          </h1>

          <p
            className="mt-2 max-w-md text-md leading-4 text-primary tracking-tight sm:text-lg sm:leading-8"
          >
            The future you&apos;re imagining starts with what you choose to
            learn today. Explore powerful courses, build skills that matter,
            and turn every lesson into a step toward something greater.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href="#courses"

              className="group inline-flex items-center gap-3 rounded-md bg-accent px-5 py-3 text-sm border font-bold text-white shadow-[0_10px_24px_rgba(255,90,31,0.22)] transition duration-200 hover:-translate-y-1 hover:bg-secondary hover:text-primary hover:border-primary"
            >
              Get started
              <span className="text-lg transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>

            <a
              href="#courses"

              className="text-sm font-bold text-primary underline decoration-2 decoration-accent underline-offset-4 transition hover:text-accent"
            >
              Explore courses
            </a>
          </div>
        </div>

        {/* Artwork */}
        <div className="relative flex min-h-[28rem] items-center justify-center lg:min-h-[42rem]">
          {/* Background disc */}
          <div className="absolute h-[20rem] w-[20rem] rounded-full bg-accent sm:h-[29rem] sm:w-[29rem]" />

          {/* Decorative ring behind image */}
          <div className="absolute right-[8%] top-[8%] h-34 w-34 rounded-full border border-accent/30 sm:h-54 sm:w-54" />

          <img
            src="/sculpture.png"
            alt="Creative sculpture representing imagination and learning"
            className="relative z-10 w-full max-w-[44rem] object-contain drop-shadow-[0_26px_28px_rgba(7,63,54,0.14)]"
          />

          {/* Floating detail card */}
          <div
            className="absolute bottom-[5%] right-0 z-20 rounded-lg bg-white px-5 py-4 shadow-[0_12px_35px_rgba(7,63,54,0.13)] sm:right-[4%]"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#7b938c]">
              Start small
            </p>

            <p
              className="mt-1 text-3xl font-bold uppercase leading-none  tracking-tight text-primary"
            >
              Grow daily
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;



