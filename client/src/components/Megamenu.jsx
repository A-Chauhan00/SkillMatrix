import React from 'react'

const Megamenu = () => {
  return (
   <div>
     <button className="btn sm:hidden" popoverTarget="my-megamenu-2">Menu</button>
<div className="megamenu max-sm:megamenu-vertical megamenu-wide p-2 bg-secondary border" id="my-megamenu-2" popover="auto">
  <span className="megamenu-active"></span>

  <button popoverTarget="b1" className='text-primary'>One</button>
  <div id="b1" popover="auto" className=' bg-primary'>
    <ul className="menu menu-horizontal text-secondary">
      <li><a>Enterprise</a></li>
      <li><a>CRM software</a></li>
      <li><a>Security</a></li>
      <li><a>Consulting</a></li>
    </ul>
  </div>

  <button popoverTarget="b2" className='text-primary'>Two</button>
  <div id="b2" popover="auto" className=' bg-primary'>
    <ul className="menu menu-horizontal text-secondary">
      <li><a>AI infrastructure</a></li>
      <li><a>Image generation</a></li>
      <li><a>MCP servers</a></li>
    </ul>
  </div>

  <button popoverTarget="b3" className='text-primary'>Three</button>
  <div id="b3" popover="auto" className=' bg-primary'>
    <ul className="menu menu-horizontal text-secondary">
      <li><a>Cloud computing</a></li>
      <li><a>Storage solutions</a></li>
      <li><a>Database services</a></li>
      <li><a>CDN performance</a></li>
    </ul>
  </div>
</div>
   </div>
  )
}

export default Megamenu