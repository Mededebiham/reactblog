import React from 'react';
import {NavLink} from 'react-router-dom';
import {routes} from '../routes';

const navStyles = {
    active: "block py-2 px-3 text-base bg-blue rounded md:bg-mantle md:text-blue md:p-0",
    inactive: "block py-2 px-3 md:p-0 rounded md:hover:text-yellow",
}

const Navbar = () => {
    return (
        <>
            <nav className="bg-mantle">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <NavLink to='/' className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Blog Logo"/>
                        <span
                            className="self-center whitespace-nowrap text-2xl font-semibold">3M's Blog</span>
                    </NavLink>
                    <button data-collapse-toggle="navbar-default" type="button"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-overlay0 hover:bg-surface0 focus:ring-overlay2 focus:outline-none focus:ring-2 md:hidden"
                            aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 17 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-surface0 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                            {routes.map((route, index) => (route.renderNav &&
                                <li key={index}>
                                    <NavLink to={route.path} className={({isActive}) => isActive ? navStyles.active : navStyles.inactive}
                                             end>
                                        {route.name}
                                    </NavLink>
                                </li>))}
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    );
};

export default Navbar;