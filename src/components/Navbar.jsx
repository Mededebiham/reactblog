import React from 'react';
import {NavLink} from 'react-router-dom';
import {routes} from '../routes';

const Navbar = () => {
    return (
        <div>
            <ul>
                {routes.map((route, index) => (route.renderNav &&
                    <li key={index}>
                        <NavLink to={route.path}
                                 end>
                            {route.name}
                        </NavLink>
                    </li>))}
            </ul>
        </div>
    );
};

export default Navbar;