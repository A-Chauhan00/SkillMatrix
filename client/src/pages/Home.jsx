import React from 'react';
import Navbar from '../components/Navbar.jsx';
import HeroSection from '../components/HeroSection.jsx';
import Megamenu from '../components/Megamenu.jsx';
import CardSection from '../components/CardSection.jsx';

const Home = () => {
  return (
    <div>
       <Navbar/>
       <HeroSection/>
       <Megamenu/>
       <CardSection/>
       <CardSection/>
       <CardSection/>
    </div>
  )
}

export default Home