import React from 'react'

const HeroSection = () => {
  return (
   <div className="hero bg-base-100 min-h-screen">
  <div className="hero-content flex-col bg-base-100 lg:flex-row-reverse ">
    <img className="max-w-lg rounded-lg shadow-2xl" src="mixed_media9.jpg"/>
    <div className='max-w-lg'>
      <h1 className="font-display  text-8xl font-semibold text-primary">YOUR POTENTIAL IS BIGGER THAN YOU THINK.</h1>
      <p className="font-sans py-6 text-primary">
       The future you're imagining starts with what you choose to learn today.
        Explore powerful courses, build skills that matter, and turn every lesson into a step toward something greater.
      </p>
      <button className=" font-sans btn btn-accent text-base-100">Get Started</button>
    </div>
  </div>
</div>
  )
}

export default HeroSection