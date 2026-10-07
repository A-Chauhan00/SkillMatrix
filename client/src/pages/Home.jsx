
import HeroSection from '../components/HeroSection.jsx';
import Megamenu from '../components/Megamenu.jsx';
import CardSection from '../components/CardSection.jsx';
import React, { useEffect, useState } from "react";
import { getHomeCourses } from "../api/courseApi.js";


const Home = () => {
  const [homeCourses, setHomeCourses] = useState({ featured: [], beginner: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getHomeCourses(); // calls GET /courses/home
        if (response?.success) {
          setHomeCourses(response.data);
        }
      } catch (error) {
        console.error("Failed to load home courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) {
    return <div className="p-8 text-center text-base-100">Loading SkillMatrix courses...</div>;
  }
  return (
    <div>
       <HeroSection/>
       <CardSection
        title="Featured Courses"
        description="Top picks curated for industry readiness"
        courses={homeCourses.featured}
      />

      <CardSection
        title="Beginner Friendly"
        description="Foundational paths to kickstart your career"
        courses={homeCourses.beginner}
      />
    </div>
  )
}

export default Home