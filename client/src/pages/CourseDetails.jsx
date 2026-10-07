// import React from 'react'

// const CourseDetails = () => {
//     return (
//         <div className='bg-primary min-h-screen'>
//         {/* course hero section with details */}
//             <div className="hero bg-base-100 flex">
//                 <div className="hero-content ml-48 text-primary">

//                     <div>
//                         <h1 className="text-4xl font-bold">This is the course title</h1>
//                         <p className="py-5">
//                             This is a long ass course subtitle that tells you a little more about the course
//                         </p>
//                         <p className="py-4">
//                             Course Instructor
//                         </p>
//                         <p className="py-4">
//                             Lat updated
//                         </p>

//                     </div>
//                 </div>
//             </div>
         
//          {/* floating course purchase card */}
//             <div className="card bg-base-100 w-96 shadow-sm absolute top-2/12 right-1/12">
//                 <figure className="h-full w-full">
//                     <img
//                         src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
//                         alt="Shoes"
//                         className="rounded-xl" />
//                 </figure>
//                 <div className="card-body ">
//                     <h1 className=" text-4xl text-primary font-bold ml-2">$ 6700</h1>
//                     <p className='ml-2 text-primary'> Full life time access</p>
//                     <div className="card-actions w-80 m-auto">
//                         <button className="btn btn-accent text-base-100 border w-full hover:bg-secondary hover:text-primary hover:border-primary">Buy Now</button>
//                     </div>
//                 </div>
//             </div>

//             {/* Course content  */}
//             <div className='max-w-1/2 ml-48'> 
//               <div className='text-primary'>
//                 <h1 className='text-3xl py-4 text-base-100'>Course Content</h1>
//                 <p  className='text-md py-2 text-base-100'> Sections.Lectures.Duration</p>
//               </div>

//                 {/* Section 1 */}
//                 <div tabIndex={0} className="collapse collapse-arrow bg-base-100 text-primary border border-primary ">
//                     <div className="collapse-title font-semibold after:start-5 after:end-auto pe-4 ps-12">Section 1</div>
//                     <div className="collapse-content text-sm">
//                         <div tabIndex={0} className="collapse collapse-arrow bg-base-100 border-primary border">
//                             <div className="collapse-title font-semibold after:start-5 after:end-auto pe-4 ps-12">Lecture 1</div>
//                             <div className="collapse-content text-sm">
//                                   THis is the description for the first lecture of this course
//                             </div>
//                         </div>
//                         <div tabIndex={0} className="collapse collapse-arrow bg-base-100 border-primary border">
//                             <div className="collapse-title font-semibold after:start-5 after:end-auto pe-4 ps-12">Lecture 2</div>
//                             <div className="collapse-content text-sm">
//                                   THis is the description for the second lecture of this course
//                             </div>
//                         </div>
//                          <div tabIndex={0} className="collapse collapse-arrow bg-base-100 border-primary border">
//                             <div className="collapse-title font-semibold after:start-5 after:end-auto pe-4 ps-12">Lecture 3</div>
//                             <div className="collapse-content text-sm">
//                                   THis is the description for the third lecture of this course
//                             </div>
//                         </div>
//                          <div tabIndex={0} className="collapse collapse-arrow bg-base-100 border-primary border">
//                             <div className="collapse-title font-semibold after:start-5 after:end-auto pe-4 ps-12">Lecture 4</div>
//                             <div className="collapse-content text-sm">
//                                   THis is the description for the fourth lecture of this course
//                             </div>
//                         </div>
//                     </div>
//                 </div>
                 
//                  {/* Description */}
//                  <div className='bg-primary text-base-100 mt-8'>
//                       <h1 className="text-3xl">Description</h1>
//                       <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas possimus nihil dicta, nobis voluptate repellendus totam voluptatibus magnam culpa ab sapiente distinctio accusamus doloribus suscipit perferendis alias, ducimus enim unde?
//                       </p>
//                  </div>

//             </div>
//         </div>
//     )
// }

// export default CourseDetails;


import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCourseDetails } from "../api/courseApi.js"; // 👈 Import your service helper

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        // Call your API service helper directly
        const res = await getCourseDetails(courseId);
        
        if (res.success) {
          setCourse(res.data);
        }
      } catch (err) {
        console.error("Error fetching course details:", err);
        setError(err.response?.data?.message || "Failed to load course details");
      } finally {
        setLoading(false);
      }
    };

    if (courseId) fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-base-100"></span>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-primary flex flex-col items-center justify-center space-y-4 text-base-100">
        <p className="text-xl font-semibold">{error || "Course not found"}</p>
        <Link to="/" className="btn btn-accent btn-sm">
          Back to Home
        </Link>
      </div>
    );
  }

  const instructorName =
    typeof course.instructor === "object"
      ? course.instructor?.name
      : course.instructor || "Instructor";

  return (
    <div className="bg-primary min-h-screen relative pb-16">
      {/* Course Hero Section */}
      <div className="hero bg-base-100 py-12">
        <div className="hero-content max-w-6xl w-full mx-auto px-6 text-primary flex justify-start">
          <div className="max-w-xl space-y-3">
            <h1 className="text-4xl font-bold leading-tight">{course.title}</h1>
            <p className="text-lg text-gray-600">
              {course.subtitle || course.description}
            </p>
            <p className="text-sm font-medium pt-2">
              Created by <span className="font-semibold text-primary">{instructorName}</span>
            </p>
            <p className="text-xs text-gray-500">
              Category: <span className="capitalize font-semibold">{course.category || "General"}</span> | Level: <span className="capitalize font-semibold">{course.level || "All"}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Floating Course Purchase Card */}
      <div className="card bg-base-100 w-80 md:w-96 shadow-xl absolute top-10 right-6 lg:right-24 z-10 rounded-2xl overflow-hidden border border-base-200">
        <figure className="h-48 w-full bg-gray-100">
          <img
            src={course.thumbnail || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </figure>
        <div className="card-body p-6 space-y-3">
          <h1 className="text-3xl text-primary font-bold">₹{course.price}</h1>
          <p className="text-sm text-gray-600">Full lifetime access</p>
          <div className="card-actions w-full pt-2">
            <button className="btn btn-accent text-base-100 w-full hover:bg-secondary hover:text-primary transition-colors">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Course Content & Details */}
      <div className="max-w-xl mx-6 lg:mx-24 mt-12 space-y-8">
        <div className="text-base-100 space-y-1">
          <h2 className="text-3xl font-bold">Course Content</h2>
          <p className="text-sm text-base-200">
            {course.lectures ? `${course.lectures.length} Lectures` : "0 Lectures"}
          </p>
        </div>

        {course.lectures && course.lectures.length > 0 ? (
          <div className="space-y-3">
            {course.lectures.map((lecture, index) => (
              <div
                key={lecture._id || index}
                tabIndex={0}
                className="collapse collapse-arrow bg-base-100 text-primary border border-primary rounded-xl"
              >
                <div className="collapse-title font-semibold flex items-center justify-between pr-10">
                  <span>
                    {index + 1}. {lecture.title}
                  </span>
                  {lecture.isPreview && (
                    <span className="badge badge-accent badge-sm text-xs font-medium">Preview</span>
                  )}
                </div>
                <div className="collapse-content text-sm text-gray-600 space-y-2">
                  <p>{lecture.description || "No description available for this lecture."}</p>
                  {lecture.duration && (
                    <p className="text-xs text-gray-400">Duration: {lecture.duration} mins</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-base-200 italic">No lectures available for this course yet.</p>
        )}

        <div className="bg-primary text-base-100 space-y-3 pt-4 border-t border-primary-content/20">
          <h2 className="text-2xl font-bold">Description</h2>
          <p className="text-sm leading-relaxed text-base-200">
            {course.description || "No full description provided for this course."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;