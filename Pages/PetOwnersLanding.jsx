import React from "react";
import Footer from "../Components/Footer";
import petPic from "../assets/c-all.png";
import { useNavigate } from "react-router-dom";

function PetOwnersLanding(props) {
  const navigate = useNavigate();
  return (
    <>
      <div className="tw-w-full tw-h-full tw-bg-primary  tw-pt-10">
        <h1 className="md:tw-text-5xl tw-text-3xl tw-text-quaternary tw-font-bold tw-text-center md:tw-px-[20%]">
          Don't Let Your Pet Feel Unwanted: Find Them a Perfect Match
        </h1>
        <div className="tw-flex tw-flex-col md:tw-flex-row tw-justify-center tw-p-10 tw-align-middle tw-gap-10">
          <img
            src={petPic}
            alt="pic of all pet"
            className="md:tw-w-1/2 tw-h-1/3"
          />
          <div className="card tw-bg-quaternary tw-h-full md:tw-h-[30vh] tw-py-10 md:tw-p-0 md:tw-m-auto md:tw-w-1/3">
            <div className="tw-text-center">
              <h1 className="tw-font-bold tw-text-2xl tw-text-primary tw-text-center tw-p-5">
                Sign-Up to find your loved ones a perfect home❤️
              </h1>
              <button
                onClick={() => navigate("/signup-petowner")}
                className="btn btn-lg hover:tw-text-quaternary  tw-bg-primary tw-font-bold tw-text-quaternary hover:tw-bg-primary"
              >
                Let's Go...
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PetOwnersLanding;
