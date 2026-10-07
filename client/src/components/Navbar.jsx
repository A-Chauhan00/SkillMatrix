

const Navbar = () => {
  return (
  
    <div className="w-full  bg-primary sticky">
      <div className="navbar bg-primary shadow-sm rounded-xl p-2">
        <div className="flex-1">
          <h1 className="text-base-100 text-xl font-bold pl-2">SKILLMATRIX</h1>
        </div>
        <div className="flex-none gap-2 pr-2">
          <input 
            type="text" 
            placeholder="Search" 
            className="input w-24 md:w-auto bg-base-100  text-primary placeholder:text-primary rounded-md" 
          />
        </div>
      </div>
    </div>
  )
}

export default Navbar;
