import React from 'react';
import HeroSection from '../components/HeroSection.jsx';
import Megamenu from '../components/Megamenu.jsx';
import CardSection from '../components/CardSection.jsx';

const Home = () => {
  return (
    <div>
       <HeroSection/>
       <Megamenu/>
       <CardSection/>
       <CardSection/>
       <CardSection/>
    </div>
  )
}

export default Home