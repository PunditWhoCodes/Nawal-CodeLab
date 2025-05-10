import React, { useEffect, useState } from "react";
import { close, menu } from '../assets/icons';

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [menuClass, setMenuClass] = useState('');

  const toggleMenu = () => {
    setToggle((prev) => !prev);
  };

  const handleLinkClick = () => {
    setToggle(false); // Close the menu
  };

  useEffect(() => {
    setMenuClass(
      toggle
        ? 'transition-opacity ease-in-out duration-300 transform translate-y-0 opacity-100'
        : 'transition-opacity ease-in-out duration-300 transform translate-y-full opacity-0'
    );
  }, [toggle]);

  return (
    <section className="w-full bg-black text-white flex justify-between items-center px-8 py-6 lg:px-16 sticky top-0 z-40">
      <h1 className="text-green-600 text-3xl font-bold">Nawal's CodeLab</h1>

      {/* Desktop Menu */}
      <div className="hidden lg:flex justify-end items-center gap-2">
        <ul className="flex justify-center items-center gap-3">
          {['home', 'courses', 'testimonials', 'pricing', 'contact'].map((section) => (
            <li key={section}>
              <a
                href={`#${section}`}
                className="text-lg text-slate-100 cursor-pointer rounded-sm px-5 py-2 hover:bg-green-600 hover:text-white active:text-white"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu */}
      <div className="flex lg:hidden flex-col">
        <img
          src={toggle ? close : menu}
          alt="menu icon"
          width={40}
          height={40}
          onClick={toggleMenu}
        />

        {toggle && (
          <div
            id="mob-menu"
            className={`bg-green-500 text-white py-4 absolute top-20 right-0 w-full ${menuClass}`}
          >
            <ul className="flex flex-col justify-center items-center gap-2">
              {['home', 'courses', 'testimonials', 'pricing', 'contact'].map((section) => (
                <li
                  key={section}
                  className="text-xl text-white font-semibold hover:bg-green-600 hover:text-white w-full py-3 text-center"
                >
                  <a href={`#${section}`} onClick={handleLinkClick}>
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default Header;
