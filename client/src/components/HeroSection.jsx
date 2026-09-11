import React from 'react'

const HeroSection = () => {
  return (
   <div className="hero bg-primary min-h-screen ">
  <div className="hero-content flex-col  lg:flex-row-reverse">
    <img className="max-w-lg rounded-lg shadow-2xl" src="mixed_media9.jpg"/>
    <div className='max-w-lg'>
      <h1 className="font-display font-medium text-8xl font-bold text-primary-content">YOUR POTENTIAL IS BIGGER THAN YOU THINK.</h1>
      <p className="font-sans py-6 text-primary-content">
       The future you're imagining starts with what you choose to learn today.
        Explore powerful courses, build skills that matter, and turn every lesson into a step toward something greater.
      </p>
      <button className=" font-sans btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
  )
}

export default HeroSection