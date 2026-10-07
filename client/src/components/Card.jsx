
import React from "react";
import { Link ,useNavigate} from "react-router-dom";

const Card = ({ course }) => {
 const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/course/${course._id}`);
  };
  return (
    <div 
    onClick={handleCardClick}
    className="card bg-base-100 w-full shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-shadow">
      <figure className="aspect-video w-full overflow-hidden bg-gray-100">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover"
        />
      </figure>

      <div className="card-body bg-base-100 p-5 flex flex-col justify-between">
        <div className="space-y-2">
          {course.category && (
            <span className="inline-block bg-primary/10 text-primary px-2 py-0.5 rounded text-[11px] font-semibold">
              {course.category}
            </span>
          )}

          <h2 className="card-title text-primary tracking-tight text-lg">
            {course.title}
          </h2>


          <p className="text-sm text-gray-800 font-medium">
           {typeof course.instructor === "object" ? course.instructor?.name : course.instructor || "Instructor"}
          </p>

          <div>
            <span className="inline-block border border-gray-500 text-gray-600 rounded-md py-1 px-2 text-xs tracking-tight capitalize">
              {course.level}
            </span>
          </div>
        </div>

        <div className="card-actions justify-between items-center mt-3 pt-3 border-t border-base-200">
          <h1 className="text-primary text-2xl font-medium">
            ₹{course.price}
          </h1>

          <Link
            to={`/course/${course._id}`}
            className="btn btn-sm btn-accent border-1 rounded-md text-base-100 hover:bg-secondary hover:text-primary hover:border-primary"
          >
            Buy now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;