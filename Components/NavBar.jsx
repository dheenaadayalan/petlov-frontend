import React from "react";
import logo from "../assets/icons-pet.png";
import { Link, useNavigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signOutSuccess } from "../Redux/userSlice";

function NavBar(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeClassName = 'tw-border-b-2  tw-border-primary';
  const { currentuser } = useSelector((state) => state.user);

  const handleSignout = () => {
    dispatch(signOutSuccess());
    localStorage.removeItem("Token");
    navigate("/signin");
  };

  return (
    <>
      <nav className="sticky-top navbar navbar-expand-lg tw-bg-quaternary tw-border-solid tw-border-primary tw-border-y-2">
        <div className="container-fluid tw-mx-2 sm:tw-mx-10 ">
          <a
            className="navbar-brand tw-font-bold tw-text-3xl tw-text-primary hover:tw-text-primary"
            href="/"
          >
            <img
              src={logo}
              className="tw-bg-primary tw-rounded-lg tw-mx-2 tw-p-1 d-inline-block align-text-top"
              alt="Bootstrap"
              width="45"
              height="40"
            />
            PetLov
          </a>
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse lg:tw-ml-[55vw]" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink
                  to="/"
                  activeclassname="active"
                  className={({ isActive }) => `p-2 ${isActive ? activeClassName : 'border-transparent'}  tw-text-primary hover:tw-text-primary`}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/adoption"
                  activeclassname="active"
                  className={({ isActive }) => `p-2 ${isActive ? activeClassName : 'border-transparent'}  tw-text-primary hover:tw-text-primary`}
                >
                  Adoption
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/pet/owners"
                  activeclassname="active"
                  className={({ isActive }) => `p-2 ${isActive ? activeClassName : 'border-transparent'}  tw-text-primary hover:tw-text-primary`}
                >
                  Pet Owners
                </NavLink>
              </li>
            </ul>
            {currentuser ? (
              <>
                <div className="dropdown dropstart">
                  <button
                    className="btn btn-secondary btn-lg  tw-bg-primary tw-rounded-3xl"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="tw-text-2xl tw-text-quaternary">
                      {currentuser.username.slice(0, 1).toUpperCase()}
                    </span>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="dropdown-item tw-cursor-pointer hover:tw-bg-primary hover:tw-text-quaternary"
                        onClick={() => navigate("/profile")}
                      >
                        Profile
                      </a>
                    </li>
                    <li>
                    <a
                        className="dropdown-item tw-cursor-pointer hover:tw-bg-primary hover:tw-text-quaternary"
                        onClick={() => navigate("/signup")}
                      >
                        Create a account
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item tw-cursor-pointer hover:tw-bg-primary hover:tw-text-quaternary"
                        onClick={handleSignout}
                      >
                        Sign-Out
                      </a>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <button
                className="btn  tw-text-primary hover:tw-bg-primary hover:tw-text-quaternary tw-border-primary tw-font-bold tw-border-2"
                type="submit"
              >
                <Link to="/signup">Sign-Up</Link>
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
