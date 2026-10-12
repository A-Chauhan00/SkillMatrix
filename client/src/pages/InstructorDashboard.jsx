import React from "react";
import { Link } from "react-router-dom";
import { Plus, Users, BookOpen, DollarSign, Star, Edit3, Trash2 } from "lucide-react";

const InstructorDashboard = () => {
  // Mock instructor courses data (normally fetched from your backend API)
  const courses = [
    { id: 1, title: "Full-Stack MERN Mastery", students: 850, status: "Published", price: "$49.99" },
    { id: 2, title: "Advanced Node.js Architecture", students: 320, status: "Published", price: "$39.99" },
    { id: 3, title: "React & Tailwind Pro", status: "Draft", price: "$29.99" },
  ];

  return (
    <div className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header & Create Button */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold  text-primary text-base-content">Instructor Dashboard</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your courses, track student progress, and create new content.</p>
          </div>
          <Link to="/instructor/create-course" className="btn btn-primary text-base-100 hover:bg-secondary hover:text-primary flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create New Course
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="stats shadow bg-base-100 border border-base-200">
            <div className="stat">
              <div className="stat-figure text-primary"><Users className="w-8 h-8" /></div>
              <div className="stat-title text-gray-500">Total Students</div>
              <div className="stat-value text-primary">1,170</div>
            </div>
          </div>

          <div className="stats shadow bg-base-100 border border-base-200">
            <div className="stat">
              <div className="stat-figure text-primary"><BookOpen className="w-8 h-8" /></div>
              <div className="stat-title text-gray-500">Active Courses</div>
              <div className="stat-value text-primary">3</div>
            </div>
          </div>

          <div className="stats shadow bg-base-100 border border-base-200">
            <div className="stat">
              <div className="stat-figure text-success"><DollarSign className="w-8 h-8" /></div>
              <div className="stat-title text-gray-500">Total Revenue</div>
              <div className="stat-value text-success">8,420</div>
            </div>
          </div>

          <div className="stats shadow bg-base-100 border border-base-200">
            <div className="stat">
              <div className="stat-figure text-warning"><Star className="w-8 h-8" /></div>
              <div className="stat-title text-gray-500">Instructor Rating</div>
              <div className="stat-value text-warning">4.9</div>
            </div>
          </div>
        </div>

        {/* Courses Management Table */}
        <div className="bg-base-100 rounded-2xl shadow-xl p-6 border border-base-200">
          <h2 className="text-xl text-primary font-bold text-base-content mb-4">Your Courses</h2>

          <div className="overflow-x-auto">
            <table className="table w-full text-primary">
              <thead>
                <tr>
                  <th>Course Title</th>
                  <th>Status</th>
                  <th>Students</th>
                  <th>Price</th>
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course.id} className="hover">
                    <td className="font-semibold">{course.title}</td>
                    <td>
                      <span className={`badge badge-sm font-bold ${course.status === "Published" ? "badge-success text-white" : "badge-warning"}`}>
                        {course.status}
                      </span>
                    </td>
                    <td>{course.students || 0}</td>
                    <td>{course.price}</td>
                    <td className="text-right space-x-2">
                      <Link to={`/instructor/edit-course/${course.id}`} className="btn btn-ghost btn-xs text-primary">
                        <Edit3 className="w-4 h-4" /> Edit
                      </Link>
                      <button className="btn btn-ghost btn-xs text-error">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default InstructorDashboard;