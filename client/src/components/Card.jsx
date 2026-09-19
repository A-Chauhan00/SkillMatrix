import React from 'react'

 const Card = () => {
  return (
   <div className="card bg-base-100 w-96 shadow-sm m-4 rounded-2xl">
  <figure>
    <img
      src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
      alt="Shoes" />
  </figure>
  <div className="card-body bg-base-100 rounded-b-2xl">
    <h2 className="card-title text-primary">Card Title</h2>
    <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
    <div className="card-actions justify-between content-center mt-2">
      <h1 className='text-primary  text-3xl font-bold'>$ 6700 </h1>
      <button className="btn text-accent border-2 border-accent rounded-xl">Buy Now</button>
    </div>
  </div>
</div>
  )
}

export default Card;