import React from "react";
import logo from "../assets/icons-pet.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Footer() {
  return (
    <>
      <div className="tw-w-full  md:tw-h-[40vh] tw-h-full tw-bg-quaternary tw-flex tw-flex-col-reverse md:tw-flex-row tw-justify-evenly md:tw-gap-10 tw-items-center ">
        <div className="tw-pb-6 md:tw-pt-0">
          <div className="tw-flex tw-flex-row tw-gap-3">
            <img
              src={logo}
              alt="Logo"
              className="tw-h-[70%] tw-w-[75%] tw-mx-auto"
            />
            <h1 className="tw-text-3xl tw-font-bold tw-my-auto tw-text-primary">
              PetLov
            </h1>
          </div>
          <div className="tw-flex tw-flex-row tw-justify-evenly hidden md:tw-relative">
            <span>
              <Link to="/">Home</Link>
            </span>
            <span>
              <Link to="/adoption">Adoption</Link>
            </span>
            <span>
              <Link to="/pet/owners">PetOwner</Link>
            </span>
          </div>
          <h1 className="tw-text-primary">
            Copyright © {new Date().getFullYear()} PetLov LLP.
          </h1>
        </div>
        <div>
          <div className="card tw-bg-primary tw-p-5 tw-m-10 md:tw-m-0">
            <h5 className="card-title tw-text-quaternary tw-font-bold tw-text-xl">
              Sign-Up Weekley Newsletter!
            </h5>
            <div className="tw-flex-col tw-items-center ">
              <form action="">
                <label className="form-label tw-text-quaternary">
                  Email <span className="tw-text-red-700">*</span>
                </label>
                <input
                  type="email"
                  className="form-control tw-rounded-xl"
                  name="email"
                  placeholder="E-Mail"
                />
                <button
                  type="button"
                  onClick={() => {
                    toast.success("Registered Successfully");
                  }}
                  className="btn btn-outline-light tw-mt-2"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
