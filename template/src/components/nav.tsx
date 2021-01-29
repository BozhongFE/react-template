import React from 'react';
import { Link } from 'react-router-dom';

import routes from 'src/routes';
import 'src/assets/css/nav.css'

function Nav() {
  return (
    <div className='nav'>
      <ul>
        {routes.map((r, i) => (
          <li key={i}>
            <Link to={r.path}>
              {r.meta && r.meta.title ? r.meta.title : r.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Nav;
