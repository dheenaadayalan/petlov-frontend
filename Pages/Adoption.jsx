import React from "react";
import { FaSearch } from "react-icons/fa";

function Adoption(props) {
  return (
    <>
      <div className="tw-h-[90vh] tw-w-full tw-bg-primary">
        <nav className=" navbar navbar-expand-lg tw-bg-transparent tw-border-solid tw-border-primary tw-border-y-2 tw-px-5">
          <div className="container-fluid tw-mx-2 sm:tw-mx-10">
            <form className="tw-bg-quaternary tw-rounded-xl">
              <input
                type="text"
                placeholder="Search"
                className="md:tw-w-[40vw] tw-bg-quaternary tw-rounded-xl tw-border-r-0 tw-w-[80vw]"
              />
            </form>

            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn tw-text-quaternary dropdown-toggle hover:tw-text-quaternary hover:tw-border-none tw-border-none"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Category
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item">Dropdown link</a>
                </li>
                <li>
                  <a className="dropdown-item">Dropdown link</a>
                </li>
              </ul>
            </div>
            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn tw-text-quaternary dropdown-toggle hover:tw-text-quaternary hover:tw-border-none tw-border-none"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Personality
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item">Dropdown link</a>
                </li>
                <li>
                  <a className="dropdown-item">Dropdown link</a>
                </li>
              </ul>
            </div>
            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn tw-text-quaternary dropdown-toggle hover:tw-text-quaternary hover:tw-border-none tw-border-none"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Behavior
              </button>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item">Dropdown link</a>
                </li>
                <li>
                  <a className="dropdown-item">Dropdown link</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Adoption;
