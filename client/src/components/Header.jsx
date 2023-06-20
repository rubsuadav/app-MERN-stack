import React, { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import swal from "sweetalert";

//local imports
import { useAuthContext } from "./routes/authContext";

const navigation = [
  { name: "Inicio", href: "/", current: true },
  { name: "Team", href: "#", current: false },
  { name: "Projects", href: "#", current: false },
  { name: "Calendar", href: "#", current: false },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const { isAuthenticated, logout } = useAuthContext();
  const token = localStorage.getItem("access_token");
  const [username, setUsername] = useState("");
  function handleLogout(e) {
    e.preventDefault();
    swal({
      text: "Estas seguro que deseas cerrar sesion?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
      timer: 5000,
    }).then((willLogout) => {
      if (willLogout) {
        logout();
        swal("Has cerrado sesion exitosamente", {
          icon: "success",
          timer: 5000,
        });
      }
    });
  }

  async function getUsername() {
    const response = await fetch("http://localhost:8000/api/users", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setUsername(data.username);
  }
  useEffect(() => {
    getUsername();
  }, [token]);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-full px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt="Your Company"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              {isAuthenticated ? (
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="sr-only">Ver notificaciones</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="h-8 w-8 rounded-full"
                          src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAODw4NBw0NDQ8ODxAOEA8PDw8NDQ0PFREXFhUdExMYHCggGBolGxMTITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NDw8PDysZFRkrKys3Ky0rNy0tKys3NysrKysrLSsrKy0rKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAABAUBAwIH/8QAMhABAAIAAgcGBQMFAAAAAAAAAAECBBEDBSExMkFREkJxgaHBIlJygtFhkbEUM2KS8f/EABYBAQEBAAAAAAAAAAAAAAAAAAABAv/EABYRAQEBAAAAAAAAAAAAAAAAAAABEf/aAAwDAQACEQMRAD8A/VAGmAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAetMPe26s+ex7RgLc5rH7oYkFc4C3Ka+ryvhb131z8NoY8R1xQAAAAAAAAAAAAAAAAAAAAB7YbQ9uct0RvlBzQaCbz8O7nPRpaDDVpujOes73pSkRERWMoh9I1IACgAPLTaCt+KNvWN7OxGGmn6x1/LWcmM9kiWMMUYvD9ic68M+idWQBQAAAAAAAAAAAAAAAB2I6NfD6LsViOe+fFn4Gmd/p2/hqosAEaAAAAAAfGlpFomtubHvWazMW3xOTbZ2sdHlaLddnnAlRgNMgAAAAAAAAAAAAAAAL9WxxT4QuQ6tnZbxhcy1AAUAAAAAASaxj4YnpZWl1hPwecCVmANMgAAAAAAAAAAAAAAALNXWytMdY/j/rRYuiv2bRaOUtms5xnHNK1HQEUAAAAAAQ6ytw18ZWsjE6Tt2mY3bo8BK8gGmQAAAAAAAAAAAAAAABdgMR3Lfb+ELqGtwRYXGd3S7+U9fFajYAAAACXE4uK7KbZ9IB847EZR2a753/pDOdmc9s7ZcVi0AUAAAAAAAAAAAAAAAAAAHtocTam6c46S8RBpaPHVnjiY9YesYqnzQyXDF1rziafNDyvjqxwxNvSGaGGqNLi7W/xjpH5TgYgAoAAAAAAAAAAAAAAAAA9NForXn4I8+UIPN2tZnZWJnwjNoaLAxH9ye1P7QqrWI2VjLw2GrIzaYK874ivi9q6v+a0+ULhFyJYwNOfanzfUYOny+sqAMT/0lPl9ZfM4KnLtR5qgMRW1fHdtPnGbwvgrxw5W8GoBkYl6TXjiY8Xy3LVidk7UulwVZ4Phn0/ZdSxmj102gtTijZ1jc8hABQAAAAAAAAAAdcaGDwuXxaTfyjohj4w2Dz26XZHTnPivrXKMq7Ih0RuAAAAAAAAAAAAOTHVFicFz0P8Ar+FwDDmOrjTxeG7W2my38s2Y5SrFjgCgAAAAAAD6rXOYiN8zkCnA6DtT2rbo3frLSfGipFYiK8n2y2AAAAAAAAAAAAAAAAIcfoO/X7vyuctGcZTukGI4+9NTs2ms8p9OT4aYAAAAAAFOApnfPpGaZbq2NtvL3QjQARsAAAAAAAAAAAAAAAAABn6ypti3WMkTR1lHwx9XtLOWM0AVAAAABdqzv/b7oV2rO/8Ab7osXgI0AAAAAAAAAAAAAAAAAAk1lwx9XtLNaWsuGPq9pZqxmgCoAAAALtWd/wC33QrtWd/7fdFi8BGgAAAAAAAAAAAAAAAAAEmsuGPq9pZrS1lwx9XtLNWM0AVAAAABdqzvfb7gixeAjQAAAAAAAAAAAAAAAAACTWXDH1e0s0FjNAFQAB//2Q=="
                          alt=""
                        />
                        {/* PONER IMAGEN DEL USUARIO LOGEADO EN EL CASO DE QUE LA TENGA */}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={`/profile/${username}`}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Ver perfil
                            </Link>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Configuración
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              onClick={(e) => handleLogout(e)}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Cerrar sesión
                            </Link>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              ) : (
                <div className="flex space-x-4">
                  <Link
                    to="/register"
                    className={classNames(
                      "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                  >
                    Registrase
                  </Link>
                </div>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
