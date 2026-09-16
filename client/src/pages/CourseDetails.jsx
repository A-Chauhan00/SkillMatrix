import React from 'react'

const CourseDetails = () => {
    return (
        <>
        {/* course hero section with details */}
            <div className="hero bg-primary flex">
                <div className="hero-content ml-48">

                    <div>
                        <h3 className="text-4xl font-bold">This is the course title</h3>
                        <p className="py-5">
                            This is a long ass course subtitle that tells you a little more about the course
                        </p>
                        <p className="py-4">
                            Course Instructor
                        </p>
                        <p className="py-4">
                            Lat updated
                        </p>

                    </div>
                </div>
            </div>

            {/* Course content  */}
            <div className='max-w-1/2 ml-48'> 
              <div className='text-secondary'>
                <h2 className='text-3xl py-4'>Course Content</h2>
                <p  className='text-md py-3'> Sections.Lectures.Duration</p>
              </div>
                {/* Section 1 */}
                <div tabIndex={0} className="collapse collapse-arrow bg-secondary text-primary border border-primary ">
                    <div className="collapse-title font-semibold after:start-5 after:end-auto pe-4 ps-12">Section 1</div>
                    <div className="collapse-content text-sm">
                        <div tabIndex={0} className="collapse collapse-arrow bg-secondary border-primary border">
                            <div className="collapse-title font-semibold after:start-5 after:end-auto pe-4 ps-12">Lecture 1</div>
                            <div className="collapse-content text-sm">
                                  THis is the description for the first lecture of this course
                            </div>
                        </div>
                        <div tabIndex={0} className="collapse collapse-arrow bg-secondary border-primary border">
                            <div className="collapse-title font-semibold after:start-5 after:end-auto pe-4 ps-12">Lecture 2</div>
                            <div className="collapse-content text-sm">
                                  THis is the description for the second lecture of this course
                            </div>
                        </div>
                         <div tabIndex={0} className="collapse collapse-arrow bg-secondary border-primary border">
                            <div className="collapse-title font-semibold after:start-5 after:end-auto pe-4 ps-12">Lecture 3</div>
                            <div className="collapse-content text-sm">
                                  THis is the description for the third lecture of this course
                            </div>
                        </div>
                         <div tabIndex={0} className="collapse collapse-arrow bg-secondary border-primary border">
                            <div className="collapse-title font-semibold after:start-5 after:end-auto pe-4 ps-12">Lecture 4</div>
                            <div className="collapse-content text-sm">
                                  THis is the description for the fourth lecture of this course
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}

export default CourseDetails