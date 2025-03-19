import React from "react";
import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const Header = () => {
  return (
    <header className="bg-themePrimary text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link to="/">Book Reader App</Link>
        </h1>
        <Menu as="nav" className="relative">
          {({ open }) => (
            <>
              <MenuButton className="focus:outline-none md:hidden">
                Menú
              </MenuButton>
              <MenuItems
                className={`${
                  open ? "block" : "hidden"
                } absolute right-0 mt-2 w-40 bg-white text-black shadow-lg md:static md:flex md:space-x-4 md:bg-transparent md:shadow-none md:text-white`}
              >
                <MenuItem>
                  {({ active }) => (
                    <Link
                      className={`${
                        active ? "bg-gray-200 md:bg-transparent" : ""
                      } block p-2 md:p-0`}
                      to="/"
                    >
                      Inicio
                    </Link>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <Link
                      className={`${
                        active ? "bg-gray-200 md:bg-transparent" : ""
                      } block p-2 md:p-0`}
                      to="/favorites"
                    >
                      Favoritos
                    </Link>
                  )}
                </MenuItem>
                <MenuItem>
                  {({ active }) => (
                    <Link
                      className={`${
                        active ? "bg-gray-200 md:bg-transparent" : ""
                      } block p-2 md:p-0`}
                      to="/new"
                    >
                      Nuevo Libro
                    </Link>
                  )}
                </MenuItem>
              </MenuItems>
            </>
          )}
        </Menu>
        <nav className="hidden md:flex space-x-4">
          <Link to="/" className="hover:text-themeSecondary">
            Inicio
          </Link>
          <Link to="/favorites" className="hover:text-themeSecondary">
            Favoritos
          </Link>
          <Link to="/new" className="hover:text-themeSecondary">
            Nuevo Libro
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
