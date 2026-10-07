import React from 'react'
import { useState } from 'react'
import { X,Menu, Check} from 'lucide-react';

const lessons = [
  {
    id: 1,
    title: "Introduction to React",
    duration: "08:24",
    completed: true,
  },
  {
    id: 2,
    title: "Understanding Components",
    duration: "12:45",
    completed: false,
  },
  {
    id: 3,
    title: "Props and State",
    duration: "18:32",
    completed: false,
  },
  {
    id: 4,
    title: "React Hooks",
    duration: "21:10",
    completed: false,
  },
  {
    id: 5,
    title: "Building the Final Project",
    duration: "32:15",
    completed: false,
  },
];

const LecturePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeLesson, setActiveLesson] = useState(lessons[0]);

  const selectLesson = (lesson) => {
    setActiveLesson(lesson);
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-base-100">

      {/* Top bar */}
      <header className="flex h-16 items-center justify-between border-b bg-primary px-6">

        <div className='flex flex-row'>
          <h1 className='text-base-100 text-xl font-bold p-2 border-r'> SKILLMATRIX</h1>
          <h1 className='text-base-100 text-xl p-2 ml-6 '> This is the course Title</h1>
        </div>

        <button
          onClick={() => setSidebarOpen(true)}
          className="flex items-center gap-2 rounded-md bg-base-100 px-4 py-2 text-sm font-medium text-primary transition hover:bg-secondary"
        >
           <span><Menu size={16}/></span>
          Course Content
        </button>

      </header>


      {/* Main learning area */}
      <main className="mx-auto max-w-6xl px-6 py-8">

        {/* Video */}
        <div className="aspect-video overflow-hidden rounded-2xl bg-black shadow-lg">

          <video
            className="h-full w-full"
            controls
            src="/videos/react-introduction.mp4"
          />

        </div>


        {/* Lesson information */}
        <div className="mt-8">

          <div className="flex items-start justify-between gap-6">

            <div>
              <p className="text-sm font-medium text-[#16856B]">
                Lesson {activeLesson.id}
              </p>

              <h2 className="mt-1 text-3xl font-bold text-[#163B33]">
                {activeLesson.title}
              </h2>

              <p className="mt-3 max-w-2xl text-gray-500">
                This is the lesson description for this lecture
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et nostrum optio eum, soluta officiis ut iusto autem perspiciatis architecto, asperiores dignissimos voluptatum animi doloremque. Enim architecto impedit ipsum omnis maiores.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, ea facere adipisci possimus et deserunt veniam cum maiores, eum, mollitia perspiciatis amet unde illum quaerat tenetur! Repudiandae ut quos nulla.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus, at aliquam placeat iste amet, officiis accusantium obcaecati totam corrupti ea sint laborum excepturi. Optio id sed ipsum esse ratione facere?
              </p>
            </div>

          </div>

        </div>
  
  {/* course and lecture info */}
        <div className="grid grid-cols-[1fr_2fr] gap-x-[2px] gap-y-4 mt-8 border-t py-6 border-primary bg-base-100">
          <h2 className="text-base  tracking-wide text-gray-600">
            Skill level
          </h2>
          <h2 className=" text-base  tracking-wide text-gray-600">
            All levels
          </h2>

          <h2 className="text-base  tracking-wide text-gray-600">
            Lectures
          </h2>
          <h2 className=" text-base  tracking-wide text-gray-600">
            5 lectures
          </h2>

          <h2 className="text-base  tracking-wide text-gray-600">
            Total length
          </h2>
          <h2 className=" text-base  tracking-wide text-gray-600">
            1 hour
          </h2>
        </div>

        <div className="grid grid-cols-[1fr_2fr] gap-x-[2px] gap-y-4 mt-8 border-t py-8 border-primary bg-base-100">
          <h2 className=" text-base  tracking-wide text-gray-600">
            Description
          </h2>
          <h2 className=" text-base  tracking-wide text-gray-600">
            This is the actual description text. Because the parent container manages the rows, this text aligns perfectly with its corresponding label, even if it spans multiple lines.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque veniam deleniti perferendis sequi. Harum eos ducimus asperiores atque, illum deserunt quidem incidunt quibusdam nulla cum facere voluptatem nisi praesentium ea.
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus aliquid reiciendis impedit pariatur non? Laudantium animi debitis vel cupiditate tempora ut, fuga mollitia distinctio eaque dicta similique, et dolorum sit.
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium itaque rem iusto debitis, ipsam sint neque architecto perferendis veritatis illo officiis ducimus adipisci dolorem voluptas non consectetur error reprehenderit impedit!
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi vitae et cum accusamus minima quod. Velit ducimus labore et facere expedita eum, ad veniam libero soluta aliquam, iure ipsum obcaecati.
          </h2>
        </div>

        <div className="grid grid-cols-[1fr_2fr] gap-x-[2px] gap-y-4 mt-8 border-t py-8 border-primary bg-base-100">
          <h2 className="text-base tracking-wide text-gray-600">
            Instructor
          </h2>
          <h2 className="text-base tracking-wide text-gray-600">
            Instructor name
          </h2>
        </div>


      </main>


      {/* Sidebar Overlay */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={`fixed inset-0 z-40 bg-black/30 duration-300 ${
          sidebarOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />


      {/* Course content drawer */}
      <aside
        className={`fixed right-0 top-0 z-50 h-screen w-[380px] max-w-[90vw] bg-white shadow-2xl transition-transform duration-300 ease-out ${
          sidebarOpen
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >

        {/* Drawer header */}
        <div className="flex items-center justify-between bg-primary border-b px-4 py-2.5">

          <div>
            <h2 className="font-semibold text-base-100">
              Course Content
            </h2>

            <p className="mt-1 text-xs text-base-100">
              5 lessons · 1h 33m
            </p>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-lg text-base-100 transition hover:bg-secondary hover:text-primary"
          >
                <X />
          </button>

        </div>


        {/* Lessons */}
        <div className="overflow-y-auto p-3">

          {lessons.map((lesson) => (

            <button
              key={lesson.id}
              onClick={() => selectLesson(lesson)}
              className={`flex w-full items-center gap-3 rounded-xl p-3 text-left transition ${
                activeLesson.id === lesson.id
                  ? "bg-secondary"
                  : "hover:bg-[#F7F8F5]"
              }`}
            >

              {/* Status */}
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm ${
                  lesson.completed
                    ? "bg-[#163B33] text-white"
                    : activeLesson.id === lesson.id
                    ? "bg-[#163B33] text-white"
                    : "bg-[#EEF2EF] text-gray-500"
                }`}
              >
                {lesson.completed ? <Check size={16}/> : lesson.id}
              </div>


              {/* Lesson info */}
              <div className="min-w-0 flex-1">

                <p className="truncate text-sm font-medium text-[#163B33]">
                  {lesson.title}
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  {lesson.duration}
                </p>

              </div>

            </button>

          ))}

        </div>

      </aside>

    </div>
  );
  
}

export default LecturePage





 