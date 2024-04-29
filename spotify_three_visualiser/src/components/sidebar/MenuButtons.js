import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconContext } from "react-icons";

export function MenuButtons({ to, icon, label }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  const btnClass = isActive ? "btn-body active" : "btn-body";

  return (
    <Link to={to} onSubmit={e => e.preventDefault()} className='sidebarLink' style={{ textDecoration: 'none' }}>
      <div className='btnBody'>
        <IconContext.Provider value={btnClass}>
          <span className='btnClass'>{label}</span> </IconContext.Provider> </div> 
          <div className='IconContext'>{icon} <span className='btnIcon'></span></div> 
        <IconContext.Provider value={{ size: '1.5em', className: "btn-icon" }}>

        </IconContext.Provider>

    </Link>
  );
}

