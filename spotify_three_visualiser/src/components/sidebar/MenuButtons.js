import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IconContext } from 'react-icons';

export function MenuButtons({ to, icon, label }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  const btnClass = isActive ? 'btn-body active' : 'btn-body';

  return (
    <Link to={to} className='sidebarLink' style={{ textDecoration: 'none' }}>
      <IconContext.Provider value={{ className: btnClass, size: '1.5em' }}>
        <div className='btnBody'>
          {icon}
          <span>{label}</span>
        </div>
      </IconContext.Provider>
    </Link>
  );
}
