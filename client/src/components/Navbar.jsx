

const Navbar = () => {
  return (
  
    <div className="w-full p-2 bg-primary">
      <div className="navbar bg-primary shadow-sm rounded-xl p-2">
        <div className="flex-1">
          <h1 className="text-primary-content text-2xl font-bold pl-2">SKILLMATRIX</h1>
        </div>
        <div className="flex-none gap-2 pr-2">
          <input 
            type="text" 
            placeholder="Search" 
            className="input w-24 md:w-auto bg-secondary text-secondary-content placeholder:text-secondary-content/60 rounded-xl" 
          />
        </div>
      </div>
    </div>
  )
}

export default Navbar;
