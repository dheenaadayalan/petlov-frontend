import React, { useEffect, useState } from "react";
import homePic from "../assets/home.png";
import { RiSecurePaymentLine } from "react-icons/ri";
import { FaRegHandshake } from "react-icons/fa";
import { GoVerified } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../Components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import axios from "axios";

function Home(props) {
  const navigate = useNavigate();
  const [loaded, setLoaded] = useState(true);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await axios
        .get("http://localhost:4000/api/user/pets/home/all")
        .then((response) => {
          console.log("its");
          setResults(response.data.data);
          console.log(results);
          setLoaded(false);
        });
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  const { currentuser } = useSelector((state) => state.user);
  return (
    <div>
      <div className="tw-bg-primary tw-w-full tw-p-4 tw-h-[90vh] tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-center tw-gap-5">
        <div className="md:tw-w-1/2 tw-flex tw-flex-col tw-gap-7">
          <h1 className="tw-text-4xl tw-text-quaternary tw-font-bold tw-text-center md:tw-text-start">
            Find Your Furever Friend: Adopt a Loving Pet Today!
          </h1>
          <h6 className="tw-text-lg tw-text-quaternary tw-text-start">
            Looking for love on four legs? Find your perfect match here!
          </h6>
          {currentuser ? (
            <>
              <button
                type="button"
                className="btn btn-light tw-max-w-sm tw-rounded-lg tw-font-bold tw-text-xl tw-text-primary"
                onClick={() => navigate("/adoption")}
              >
                Find Your Pet
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-light tw-max-w-sm tw-rounded-lg tw-font-bold tw-text-xl"
                onClick={() => navigate("/signup")}
              >
                Find Your Pet
              </button>
            </>
          )}
        </div>
        <img
          src={homePic}
          alt="Pic of a dog and a cat"
          className="tw-w-[85%] tw-h-[80%] md:tw-w-[40%]"
        />
      </div>
      <div className="tw-bg-quaternary tw-w-full tw-p-6 tw-h-full md:tw-h-[90vh] ">
        <div className="tw-flex tw-flex-col tw-px-10">
          <div className="tw-mt-5 tw-text-center tw-my-auto">
            <h1 className="  card-spl-text text-spl md:tw-text-6xl tw-text-4xl tw-text-quaternary tw-font-bold">
              Why Choose PetLov <br />
              over Others?
            </h1>
          </div>
          <div className="tw-flex md:tw-flex-row tw-flex-col md:tw-mt-14 tw-justify-evenly">
            <div className="tw-p-4 hover:card card-spl md:tw-w-[28%] tw-h-[45vh] tw-rounded-2xl tw-text-primary hover:tw-text-quaternary tw-flex tw-flex-col tw-justify-center tw-mx-auto">
              <h1 className="tw-text-9xl tw-mx-auto">
                <GoVerified />
              </h1>
              <h1 className="tw-text-2xl tw-font-bold tw-mx-auto tw-text-center tw-mt-5">
                Maximum Exposure
              </h1>
              <h1 className="tw-text-sm tw-mx-auto tw-text-center">
                Reach a wide network of potential adopters searching for their
                furry friend through our platform.
              </h1>
            </div>
            <div className="tw-p-4 hover:card card-spl md:tw-w-[28%] tw-h-[45vh] tw-rounded-2xl tw-text-primary hover:tw-text-quaternary tw-flex tw-flex-col tw-justify-center tw-mx-auto">
              <h1 className="tw-text-9xl tw-mx-auto">
                <FaRegHandshake />
              </h1>
              <h1 className="tw-text-2xl tw-font-bold tw-mx-auto tw-text-center tw-mt-5">
                Find Responsible Adopters
              </h1>
              <h1 className="tw-text-sm tw-mx-auto tw-text-center">
                We connect your pet with loving families who have been screened
                and vetted for a perfect fit.
              </h1>
            </div>
            <div className="tw-p-4 hover:card card-spl md:tw-w-[28%] tw-h-[45vh] tw-rounded-2xl tw-text-primary hover:tw-text-quaternary tw-flex tw-flex-col tw-justify-center tw-mx-auto">
              <h1 className="tw-text-9xl tw-mx-auto">
                <RiSecurePaymentLine />
              </h1>
              <h1 className="tw-text-2xl tw-font-bold tw-mx-auto tw-text-center tw-mt-5">
                Safe and Secure
              </h1>
              <h1 className="tw-text-sm tw-mx-auto tw-text-center">
                We prioritize responsible pet placement and ensure all pet
                information is accurately disclosed.
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="tw-bg-primary tw-w-full tw-p-6 tw-h-full md:tw-h-[90vh]">
        <div className="tw-flex tw-flex-row tw-justify-between">
          <h1 className="tw-text-4xl tw-font-semibold tw-text-quaternary">
            Pets
          </h1>
          <button
            onClick={() => {
              navigate("/adoption");
            }}
            className="btn tw-text-quaternary hover:tw-bg-quaternary hover:tw-text-primary tw-border-quaternary tw-border-2"
          >
            Explore all
          </button>
        </div>
        <div className="container tw-mt-10 tw-pt-10">
          <div className="row g-4 justify-content-evenly">
            {loaded ? (
              <>
                <div className="tw-text-center tw-flex tw-flex-row tw-justify-center tw-mt-10">
                  <i className="fa fa-refresh fa-spin fa-5x fa-fw tw-text-quaternary"></i>
                  <h1 className="tw-text-6xl tw-text-quaternary  tw-text-center">
                    Loading...
                  </h1>
                </div>
              </>
            ) : (
              <>
                {results.map((ele, index) => {
                  return (
                    <div
                      key={index}
                      className="card tw-w-[16.5rem] tw-h-[52vh] tw-pt-2 "
                    >
                      <img
                        src={ele.petPictures[0]}
                        className="card-img-top tw-h-[25vh]"
                        alt="..."
                      />
                      <div className="card-body tw-flex tw-flex-col tw-justify-between">
                        <h5 className="card-title tw-text-3xl tw-font-bold tw-text-primary">
                          {ele.name}
                        </h5>
                        <div className="tw-flex tw-flex-row tw-justify-start tw-gap-5">
                          <p className="tw-text-lg tw-font-semibold tw-text-primary">
                            Category:
                          </p>
                          <p className="tw-text-lg tw-font-semibold tw-text-primary">
                            {ele.catorgry[0]}
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            navigate("/adoption");
                          }}
                          className="btn tw-bg-primary tw-text-quaternary hover:tw-bg-primary hover:tw-text-quaternary tw-border-quaternary tw-border-2"
                        >
                          Explore all
                        </button>
                      </div>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer bgCol="quaternary" />
    </div>
  );
}

export default Home;
