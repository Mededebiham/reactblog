import React, {useContext, useState} from 'react';
import {NavLink} from 'react-router-dom';
import {routes} from '../routes';
import Link from './Link';
import {UserContext} from '../context';

const brightnessMode = {
    dark: "Dunkler Modus", light: "Heller Modus"
};

const Navbar = () => {

    const [isDark, setIsDark] = useState(true);
    const [userIcon, setUserIcon] = useState(false);

    const toggleDarkmode = () => {
        const html = document.documentElement;
        if (html.classList.contains("dark")) {
            html.classList.remove("dark");
            setIsDark(false);
        } else {
            html.classList.add("dark");
            setIsDark(true);
        }
    };

    const { userRole, setRole } = useContext(UserContext);

    const toggleLoginAndIcon = () => {
        const newRole = userRole === 'admin' ? null : 'admin';
        setRole(newRole);
        setUserIcon(!userIcon);
    }

    return (<>
            <nav className="bg-mantle">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Blog Logo"/>
                        <span
                            className="self-center text-2xl font-semibold whitespace-nowrap">3M's Blog</span>
                    </NavLink>
                    <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                            <button onClick={() => toggleLoginAndIcon()} className={`${userIcon ? "hidden" : ""}`}>Login</button>
                            <button type="button"
                                    className={`flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-overlay2 ${userIcon ? "" : "hidden"}`}
                                    id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown"
                                    data-dropdown-placement="bottom">
                                <span className="sr-only">Open user menu</span>
                                <img className="w-8 h-8 rounded-full" src="../assets/unknown.jpg"
                                     alt="NN"/>
                            </button>
                            {/*Dropdown menu*/}
                            <div
                                className="z-50 hidden my-4 text-base list-none bg-mantle divide-y divide-surface2 rounded-lg shadow"
                                id="user-dropdown">
                                <div className="px-4 py-3">
                                    <span className="block text-sm text-text">Bonnie Green</span>
                                    <span
                                        className="block text-sm  text-overlay1 truncate">name@flowbite.com</span>
                                </div>
                                <ul className="py-2" aria-labelledby="user-menu-button">
                                    <li>
                                        <button onClick={toggleDarkmode}
                                                className="block px-4 py-2 text-sm text-text hover:bg-surface0 w-full text-left">{isDark ? brightnessMode.light : brightnessMode.dark}</button>
                                    </li>
                                    <li>
                                        <NavLink to="/settings"
                                                 className="block px-4 py-2 text-sm text-text hover:bg-surface0 w-full text-left">Settings</NavLink>
                                    </li>
                                    <li>
                                        <button onClick={() => toggleLoginAndIcon()}
                                                 className="block px-4 py-2 text-sm text-text hover:bg-surface0 w-full text-left">Sign
                                            out</button>
                                    </li>
                                </ul>
                            </div>
                        <button data-collapse-toggle="navbar-user" type="button"
                                className="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-overlay0 hover:bg-surface0 focus:ring-overlay2 focus:outline-none focus:ring-2 md:hidden"
                                aria-controls="navbar-user" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 17 14">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                      stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                            </svg>
                        </button>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                         id="navbar-user">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-surface0 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
                            {routes.map((route, index) => (route.renderNav && <li key={index}>
                                <Link to={route.path}>
                                    {route.name}
                                </Link>
                            </li>))}
                        </ul>
                    </div>
                </div>
            </nav>
        </>);
};

export default Navbar;
