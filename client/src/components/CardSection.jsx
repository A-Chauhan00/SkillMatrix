import React from 'react';
import  Card  from './Card.jsx';
import { ChevronRight,ChevronLeft } from 'lucide';
const CardSection = () => {
  return (
     <div className="carousel w-full bg-secondary">
  <div id="slide1" className="carousel-item relative w-full">
   <Card/>
   <Card/>
   <Card/>
   <Card/>
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-end">
      <a href="#slide2" className="btn btn-circle text-primary"><ChevronRight /></a>
    </div>
  </div>
  <div id="slide2" className="carousel-item relative w-full">
    <Card/>
   <Card/>
   <Card/>
   <Card/>
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide1" className="btn btn-circle text-primary"><ChevronLeft/></a>
      <a href="#slide3" className="btn btn-circle text-primary"><ChevronRight/></a>
    </div>
  </div>
  <div id="slide3" className="carousel-item relative w-full">
    <Card/>
   <Card/>
   <Card/>
   <Card/>
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide2" className="btn btn-circle text-primary"><ChevronLeft/></a>
      <a href="#slide4" className="btn btn-circle text-primary"><ChevronRight/></a>
    </div>
  </div>
  <div id="slide4" className="carousel-item relative w-full">
    <Card/>
   <Card/>
   <Card/>
   <Card/>
    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
      <a href="#slide3" className="btn btn-circle text-primary"><ChevronLeft/></a>
      <a href="#slide1" className="btn btn-circle text-primary"><ChevronRight/></a>
    </div>
  </div>
</div>

  )
}

export default CardSection;