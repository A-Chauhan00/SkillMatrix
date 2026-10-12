import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, BookOpen, Video, IndianRupee, ImageIcon, Upload, FileVideo} from "lucide-react";
import { createNewCourse,addLectureToCourse } from "../api/courseApi";

const CreateCourse = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Basic Course Details
  const [courseData, setCourseData] = useState({
    title: "",
    subtitle:"",
    description: "",
    category: "",
    level: "",
    price: "",
    thumbnailFile: null, // Stores the thumbnail image file
  });

  // Flat Lectures List
 const [lectures, setLectures] = useState([
    { title: "", videoFile: null, description: "" },
  ]);

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setCourseData((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  // Handle Thumbnail File Selection
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCourseData((prev) => ({ ...prev, thumbnailFile: file }));
    }
  };

 // Lecture Handlers
  const addLecture = () => {
    setLectures([
      ...lectures,
      { title: "", videoFile: null, description: "" },
    ]);
  };

 const removeLecture = (index) => {
    setLectures(lectures.filter((_, idx) => idx !== index));
  };

  const handleLectureChange = (index, field, value) => {
    const updated = [...lectures];
    updated[index][field] = value;
    setLectures(updated);
  };

  // Handle Direct Video File Selection
  const handleFileChange = (index, file) => {
    const updated = [...lectures];
    updated[index].videoFile = file;
    setLectures(updated);
  };

  // Form Submission
  const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  if (!courseData.title || !courseData.description) {
    return setError("Course title and description are required.");
  }
  
  try {
    setIsSubmitting(true);

    // -------------------------------------------------------------
    // STEP 1: Send Course Metadata & Thumbnail to createNewCourse
    // -------------------------------------------------------------
    const courseFormData = new FormData();
    courseFormData.append("title", courseData.title);
     courseFormData.append("subtitle", courseData.subtitle);
    courseFormData.append("description", courseData.description);
    courseFormData.append("category", courseData.category);
    courseFormData.append("level", courseData.level);
    courseFormData.append("price", Number(courseData.price) || 0);

    if (courseData.thumbnailFile) {
      courseFormData.append("thumbnail", courseData.thumbnailFile); 
    }
   
  for (let [key, value] of courseFormData.entries()) {
  console.log(`${key}:`, value);
}

    const courseRes = await createNewCourse(courseFormData);
    const courseId = courseRes.course._id; // Get the newly generated course ID from backend

    // -------------------------------------------------------------
    // STEP 2: Loop and send each lecture to addLectureToCourse
    // -------------------------------------------------------------
    for (const lecture of lectures) {
      const lectureFormData = new FormData();
      lectureFormData.append("title", lecture.title);
      lectureFormData.append("description", lecture.description);

      if (lecture.videoFile) {
        lectureFormData.append("video", lecture.videoFile); // Matches your backend multer upload field name
      }

      await addLectureToCourse(courseId, lectureFormData);
    }

    // Success! Navigate back to instructor dashboard
    navigate("/instructor/dashboard");

  } catch (err) {
    console.error(err);
    setError(err.response?.data?.message || "Failed to create course. Try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-base-content text-primary flex items-center gap-2">
            <BookOpen className="w-8 h-8 " /> Create New Course
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Fill in the course details and add lectures with descriptions.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/*Course Information */}
          <div className="bg-base-100 p-6 rounded-2xl shadow-md border border-base-200 space-y-4">
            <h2 className="text-xl font-bold text-primary border-b border-base-200 pb-2">
             Course Information
            </h2>

            <div className="form-control w-full">
              <label className="label font-semibold text-sm">Course Title *</label>
              <input
                type="text"
                name="title"
                placeholder="The main title of your course"
                value={courseData.title}
                onChange={handleInputChange}
                className="input outline-none focus:border-primary focus:placeholder-transparent w-full"
                required
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-semibold text-sm">Course Subtitle *</label>
              <input
                type="text"
                name="subtitle"
                placeholder="The subtitle of your course"
                value={courseData.subtitle}
                onChange={handleInputChange}
                className="input outline-none focus:border-primary focus:placeholder-transparent w-full"
                required
              />
            </div>

            <div className="form-control w-full">
              <label className="label font-semibold text-sm">Course Description *</label>
              <textarea
                name="description"
                placeholder="Briefly describe what students will learn in this course..."
                value={courseData.description}
                onChange={handleInputChange}
                rows={4}
                className="textarea textarea-bordered w-full  outline-none focus:border-primary focus:placeholder-transparent text-base"
                required
              ></textarea>
            </div>
             
             {/* Course Thumbnail Upload */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold text-sm flex items-center gap-1.5">
                  <ImageIcon className="w-4 h-4 text-primary" /> Course Thumbnail Image (PNG, JPG, WEBP)
                </span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="file-input outline-none focus:border-primary file-input-primary w-full text-sm"
              />
              {courseData.thumbnailFile && (
                <div className="flex items-center gap-2 mt-2 text-xs text-success font-medium">
                  <ImageIcon className="w-4 h-4" />
                  <span>Selected Thumbnail: {courseData.thumbnailFile.name}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="form-control w-full">
                <label className="label font-semibold text-sm">Category</label>
                <select
                  name="category"
                  value={courseData.category}
                 onChange={handleInputChange}
                  className="select select-bordered w-full"
                >
                  <option value="" disabled>Select category</option>
                  <option  value="Web Development">Web Development</option>
                  <option  value="Mobile App Development">Mobile App Development</option>
                  <option value="Data Science & AI">Data Science & AI</option>
                  <option value="DevOps & Cloud">DevOps & Cloud</option>
                </select>
              </div>

                          <div className="form-control w-full">
                              <label className="label font-semibold text-sm">Difficulty Level</label>
                              <select
                                  name="level"
                                  value={courseData.level}
                                   onChange={handleInputChange}
                                  className="select select-bordered w-full"
                              >
                                  <option value="" disabled>Select level</option>
                                  <option value="beginner">beginner</option>
                                  <option value="intermediate">intermediate</option>
                                  <option value="advanced">advanced</option>
                              </select>
                          </div>
              {/* Price Field with INR symbol */}
              <div className="form-control w-full">
                <label className="label font-semibold text-sm">Price (₹ INR)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500 font-bold">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="price"
                    placeholder="e.g. 1499 (0 for Free)"
                    value={courseData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="1"
                    className="input outline-none focus:border-primary focus:placeholder-transparent w-full pl-8"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Lectures List */}
          <div className="bg-base-100 p-6 rounded-2xl shadow-md border border-base-200 space-y-6">
            <div className="flex justify-between items-center border-b border-base-200 pb-2">
              <h2 className="text-xl font-bold text-primary flex items-center gap-2">
                <Video className="w-5 h-5" /> Course Lectures
              </h2>
              <button
                type="button"
                onClick={addLecture}
                className="btn  bg-primary  border text-base-100 hover:bg-secondary hover:text-primary hover:border-primary btn-sm flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add Lecture
              </button>
            </div>

            <div className="space-y-4">
              {lectures.map((lecture, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-base-200 border border-base-300 space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-primary text-sm">
                      Lecture #{index + 1}
                    </span>
                    {lectures.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLecture(index)}
                        className="btn btn-ghost btn-xs text-error"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Lecture Title */}
                  <div className="form-control w-full">
                    <input
                      type="text"
                      placeholder="Lecture title"
                      value={lecture.title}
                      onChange={(e) =>
                        handleLectureChange(index, "title", e.target.value)
                      }
                      className="input outline-none focus:border-primary focus:placeholder-transparent w-full input-md  font-medium"
                      required
                    />
                  </div>
                     
                     {/* Direct Device File Upload Input */}
                  <div className="form-control w-full">
                    <label className="label py-1">
                      <span className="label-text text-xs font-semibold text-gray-600 flex items-center gap-1">
                        <Upload className="w-3.5 h-3.5 text-primary" /> Upload Video File (MP4, MOV, MKV)
                      </span>
                    </label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => handleFileChange(index, e.target.files[0])}
                      className="file-input file-input-bordered file-input-md file-input-primary w-full text-xs"
                    />

                    {lecture.videoFile && (
                      <div className="flex items-center gap-2 mt-1.5 text-xs text-success font-medium">
                        <FileVideo className="w-4 h-4" />
                        <span>Selected: {lecture.videoFile.name} ({(lecture.videoFile.size / (1024 * 1024)).toFixed(1)} MB)</span>
                      </div>
                    )}
                  </div>

                  {/* Lecture Description */}
                  <div className="form-control w-full">
                    <textarea
                      placeholder="Brief description or key points for this lecture..."
                      value={lecture.description}
                      onChange={(e) =>
                        handleLectureChange(index, "description", e.target.value)
                      }
                      rows={2}
                      className="textarea textarea-bordered  outline-none focus:border-primary focus:placeholder-transparent w-full text-sm"
                    ></textarea>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="alert alert-error text-sm font-medium rounded-xl">
              <span>{error}</span>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/instructor/dashboard")}
              className="btn text-red-500 border border-red-500 hover:bg-red-500 hover:text-base-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn btn-primary text-base-100  hover:bg-secondary hover:text-primary px-8"
            >
              {isSubmitting ? (
                <>
                  <span className="loading loading-spinner loading-xs"></span>
                  Publishing...
                </>
              ) : (
                "Publish Course"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;