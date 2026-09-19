import React from 'react'

const Megamenu = () => {
  return (
   <div>
     <button className="btn sm:hidden text-primary" popoverTarget="my-megamenu-2">Menu</button>
<div className="megamenu max-sm:hidden megamenu-wide p-2 bg-base-100 border" id="my-megamenu-2" popover="auto">
  <span className="megamenu-active"></span>

  <button popoverTarget="b1" className='text-primary'>Development</button>
  <div id="b1" popover="auto" className=' bg-primary'>
    <ul className="menu menu-horizontal text-base-100">
      <li><a>Enterprise</a></li>
      <li><a>CRM software</a></li>
      <li><a>Security</a></li>
      <li><a>Consulting</a></li>
    </ul>
  </div>

  <button popoverTarget="b2" className='text-primary'>Business</button>
  <div id="b2" popover="auto" className=' bg-primary'>
    <ul className="menu menu-horizontal text-base-100">
      <li><a>AI infrastructure</a></li>
      <li><a>Image generation</a></li>
      <li><a>MCP servers</a></li>
    </ul>
  </div>

  <button popoverTarget="b3" className='text-primary'>Finance & Accounting</button>
  <div id="b3" popover="auto" className=' bg-primary'>
    <ul className="menu menu-horizontal text-base-100">
      <li><a>Cloud computing</a></li>
      <li><a>Storage solutions</a></li>
      <li><a>Database services</a></li>
      <li><a>CDN performance</a></li>
    </ul>
  </div>

    <button popoverTarget="b4" className='text-primary'>IT & Software</button>
  <div id="b4" popover="auto" className=' bg-primary'>
    <ul className="menu menu-horizontal text-base-100">
      <li><a>AI infrastructure</a></li>
      <li><a>Image generation</a></li>
      <li><a>MCP servers</a></li>
    </ul>
  </div>

    <button popoverTarget="b5" className='text-primary'>Office Productivity</button>
  <div id="b5" popover="auto" className=' bg-primary'>
    <ul className="menu menu-horizontal text-base-100">
      <li><a>AI infrastructure</a></li>
      <li><a>Image generation</a></li>
      <li><a>MCP servers</a></li>
    </ul>
  </div>

    <button popoverTarget="b6" className='text-primary'>Personal Development</button>
  <div id="b6" popover="auto" className=' bg-primary'>
    <ul className="menu menu-horizontal text-base-100">
      <li><a>AI infrastructure</a></li>
      <li><a>Image generation</a></li>
      <li><a>MCP servers</a></li>
    </ul>
  </div>

    <button popoverTarget="b7" className='text-primary'>Design</button>
  <div id="b7" popover="auto" className=' bg-primary'>
    <ul className="menu menu-horizontal text-base-100">
      <li><a>AI infrastructure</a></li>
      <li><a>Image generation</a></li>
      <li><a>MCP servers</a></li>
    </ul>
  </div>

    <button popoverTarget="b8" className='text-primary'>Marketing</button>
  <div id="b8" popover="auto" className=' bg-primary'>
    <ul className="menu menu-horizontal text-base-100">
      <li><a>AI infrastructure</a></li>
      <li><a>Image generation</a></li>
      <li><a>MCP servers</a></li>
    </ul>
  </div>

    <button popoverTarget="b9" className='text-primary'>Health & Fitness</button>
  <div id="b9" popover="auto" className=' bg-primary'>
    <ul className="menu menu-horizontal text-base-100">
      <li><a>AI infrastructure</a></li>
      <li><a>Image generation</a></li>
      <li><a>MCP servers</a></li>
    </ul>
  </div>

    <button popoverTarget="b10" className='text-primary'>Music</button>
  <div id="b10" popover="auto" className=' bg-primary'>
    <ul className="menu menu-horizontal text-base-100">
      <li><a>AI infrastructure</a></li>
      <li><a>Image generation</a></li>
      <li><a>MCP servers</a></li>
    </ul>
  </div>

</div>
   </div>
  )
}

export default Megamenu