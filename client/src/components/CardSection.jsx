
import React from "react";
import Card from "./Card.jsx";

const CardSection = ({ title = "Featured Courses", description, courses = [] }) => {

  if (!courses || courses.length === 0) return null;

  return (
    <section className="w-full bg-primary px-6 md:px-8 py-10">
      <div className="mb-6">
        <h1 className="text-3xl md:text-5xl text-base-100 font-medium tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-base-200/80 text-sm md:text-base mt-2">
            {description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {courses.map((course) => (
          <Card
            key={course._id || course.id} 
            course={course}
          />
        ))}
      </div>
    </section>
  );
};

export default CardSection;