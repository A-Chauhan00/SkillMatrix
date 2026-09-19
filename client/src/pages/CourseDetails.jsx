import React from 'react'

const CourseDetails = () => {
    return (
        <div className='bg-primary min-h-screen'>
        {/* course hero section with details */}
            <div className="hero bg-base-100 flex">
                <div className="hero-content ml-48 text-primary">

                    <div>
                        <h1 className="text-4xl font-bold">This is the course title</h1>
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
         
         {/* floating course purchase card */}
            <div className="card bg-base-100 w-96 shadow-sm absolute top-2/12 right-1/12">
                <figure className="h-full w-full">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                        alt="Shoes"
                        className="rounded-xl" />
                </figure>
                <div className="card-body ">
                    <h1 className=" text-4xl text-primary font-bold ml-2">$ 6700</h1>
                    <p className='ml-2 text-primary'> Full life time access</p>
                    <div className="card-actions w-80 m-auto">
                        <button className="btn btn-primary w-full">Buy Now</button>
                    </div>
                </div>
            </div>

            {/* Course content  */}
            <div className='max-w-1/2 ml-48'> 
              <div className='text-primary'>
                <h1 className='text-3xl py-4 text-base-100'>Course Content</h1>
                <p  className='text-md py-2 text-base-100'> Sections.Lectures.Duration</p>
              </div>

                {/* Section 1 */}
                <div tabIndex={0} className="collapse collapse-arrow bg-base-100 text-primary border border-primary ">
                    <div className="collapse-title font-semibold after:start-5 after:end-auto pe-4 ps-12">Section 1</div>
                    <div className="collapse-content text-sm">
                        <div tabIndex={0} className="collapse collapse-arrow bg-base-100 border-primary border">
                            <div className="collapse-title font-semibold after:start-5 after:end-auto pe-4 ps-12">Lecture 1</div>
                            <div className="collapse-content text-sm">
                                  THis is the description for the first lecture of this course
                            </div>
                        </div>
                        <div tabIndex={0} className="collapse collapse-arrow bg-base-100 border-primary border">
                            <div className="collapse-title font-semibold after:start-5 after:end-auto pe-4 ps-12">Lecture 2</div>
                            <div className="collapse-content text-sm">
                                  THis is the description for the second lecture of this course
                            </div>
                        </div>
                         <div tabIndex={0} className="collapse collapse-arrow bg-base-100 border-primary border">
                            <div className="collapse-title font-semibold after:start-5 after:end-auto pe-4 ps-12">Lecture 3</div>
                            <div className="collapse-content text-sm">
                                  THis is the description for the third lecture of this course
                            </div>
                        </div>
                         <div tabIndex={0} className="collapse collapse-arrow bg-base-100 border-primary border">
                            <div className="collapse-title font-semibold after:start-5 after:end-auto pe-4 ps-12">Lecture 4</div>
                            <div className="collapse-content text-sm">
                                  THis is the description for the fourth lecture of this course
                            </div>
                        </div>
                    </div>
                </div>
                 
                 {/* Description */}
                 <div className='bg-primary text-base-100 mt-8'>
                      <h1 className="text-3xl">Description</h1>
                      <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas possimus nihil dicta, nobis voluptate repellendus totam voluptatibus magnam culpa ab sapiente distinctio accusamus doloribus suscipit perferendis alias, ducimus enim unde?
                      </p>
                 </div>

            </div>
        </div>
    )
}

export default CourseDetails;