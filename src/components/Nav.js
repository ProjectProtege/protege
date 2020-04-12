import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Nav = () => {
  const [active, setActive] = React.useState(false);

  function handleClick (e){
    return e.target.blur()
  }

  function handleMobileClick(){
    setActive(false)
  }

  return (
    <React.Fragment>
      <nav className="md:hidden text-blue-500 text-right relative">
        <button
          className="nav-toggle relative md:hidden text-3xl p-3"
          onClick={() => setActive((oldActive) => !oldActive)}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        <ul
          className={`${
            active ? "absolute" : "hidden"
          } mt-2 text-center uppercase right-0 font-semibold bg-white shadow-lg p-2 w-screen mx-auto`}
          onClick={handleMobileClick}
        >
          <li className="py-3 opacity-75 hover:opacity-100 border-b-2 border-gray-300">
            <Link to={ROUTES.JOB_BOARD}>Find a Job</Link>
          </li>

          <li className="py-3 opacity-75 hover:opacity-100 border-b-2 border-gray-300">
            <Link to={ROUTES.CONTRIBUTE}>Quick Filter</Link>
          </li>

          <li className="pt-3 pb-2 opacity-75 hover:opacity-100 border-b-2 border-gray-300">
            <Link to={ROUTES.CONTACT}>Learning Resources</Link>
          </li>
          <li className="bg-teal-300 px-4 mt-3 mb-1 w-1/2 py-1 mx-auto font-bold">
            <Link to={ROUTES.JOB_BOARD}>Post a Job</Link>
          </li>
        </ul>
      </nav>

      <nav
        className="hidden md:block text-blue-500 uppercase font-semibold"
        role="navigation"
      >
        <ul className="flex justify-between">
          <li className="menu-item mt-1 pr-4 lg:pr-10 opacity-75 hover:opacity-100">
            <Link
              to={ROUTES.JOB_BOARD}
              className="pb-3 border-b-2 border-white hover:border-teal-500 "
            >
              Find a Job
            </Link>
          </li>

          <li
            className="menu-item quick-filter mt-1 pr-4 lg:pr-10 cursor-pointer"
            aria-haspopup="true"
          >
            <Link to="/job-board" className="opacity-75 pb-3 hover:opacity-100 ">
              Quick Filter
            </Link>
            <ul
              className="submenu absolute mt-2 bg-white p-4 shadow-md rounded"
              aria-label="submenu"
            >
              <li className="mb-3">
                <Link
                  to={ROUTES.JOB_BOARD + "?f=Front-end"}
                  className="submenu-item opacity-75 hover:opacity-100 border-b-2 border-white hover:border-teal-500 w-full pb-1"
                  onClick={handleClick}
                >
                  Front-end
                </Link>
              </li>
              <li className="mb-3">
                <Link
                  to={ROUTES.JOB_BOARD + "?f=Back-end"}
                  className="submenu-item opacity-75 hover:opacity-100 border-b-2 border-white hover:border-teal-500 w-full pb-1"
                  onClick={handleClick}
                >
                  Back-end
                </Link>
              </li>
              <li>
                <Link
                  to={ROUTES.JOB_BOARD + "?f=Full-stack"}
                  className="submenu-item opacity-75 hover:opacity-100 border-b-2 border-white hover:border-teal-500 w-full pb-1"
                  onClick={handleClick}
                >
                  Full-stack
                </Link>
              </li>
            </ul>
          </li>

          <li className="menu-item mt-1 pr-4 lg:pr-10 opacity-75 hover:opacity-100">
            <Link
              to={ROUTES.JOB_BOARD}
              className="pb-3 border-b-2 border-white hover:border-teal-500 "
            >
              Learning Resources
            </Link>
          </li>

          <li className="btn btn-teal">
            <Link to={ROUTES.JOB_BOARD}>Post a Job</Link>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Nav;
