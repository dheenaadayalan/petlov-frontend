import React, { useEffect, useState } from "react";
import homePic from "../assets/home.png";
import dog from "../assets/c-dog.png";
import cat from "../assets/c-cat.png";
import rabbit from "../assets/c-rabbit.png";
import CategoryCard from "../Components/CategoryCard";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../Components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import axios from "axios";

function Home(props) {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await axios
        .get("http://localhost:4000/api/user/pets/home/all")
        .then((response) => {
          setResults(response.data.data);
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
        <div className="tw-flex tw-flex-row tw-justify-between">
          <h1 className="tw-text-4xl tw-font-semibold tw-text-primary">
            Category
          </h1>
          <button className="btn tw-text-primary hover:tw-bg-primary hover:tw-text-quaternary tw-border-primary tw-border-2">
            Explore all
          </button>
        </div>
        <div className="tw-flex tw-flex-col md:tw-flex-row tw-gap-14 tw-items-center tw-justify-center tw-py-6 tw-mt-2">
          <CategoryCard img={dog} title={"Dogs"} />
          <CategoryCard img={rabbit} title={"Rabbits"} />
          <CategoryCard img={cat} title={"Cats"} />
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
            {results.length < 0 ? (
              <>
                <div className="">
                  <i className="fa fa-refresh fa-spin fa-5x fa-fw tw-text-primary"></i>
                  <span className="sr-only">Loading...</span>
                </div>
                <h1 className="tw-text-6xl tw-text-primary  tw-text-center">
                  Loading...
                </h1>
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
