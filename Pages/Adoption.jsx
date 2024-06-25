import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Fuse from "fuse.js";
import KnowMore from "../Components/KnowMore";
import SentMessage from "../Components/SentMessage";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { catorgry, personality, Behaviors } from "../assets/data";

function Adoption(props) {
  const userToken = localStorage.getItem("Token");
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [modalContent, setModalContent] = useState({});

  const handleClose = () => {
    setShow(false);
  };
  const handleCloseMessage = () => {
    setShowMessage(false);
  };
  const handleShow = (item) => {
    setModalContent(item);
    setShow(true);
  };

  const handleShowMessage = (item) => {
    setModalContent(item);
    setShowMessage(true);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await axios
        .get("https://petlov-backend.onrender.com/api/user/pets/all", {
          headers: { token: userToken },
        })
        .then((response) => {
          setData(response.data.data);
          setResults(response.data.data);
          setModalContent(response.data.data[0]);
          setLoading(false);
        });
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const fuseOptions = {
    keys: ["name", "catorgry", "behavior", "personality", "address"], // Adjust according to your data structure
    threshold: 0.3,
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setQuery(query);

    if (query) {
      const fuse = new Fuse(data, fuseOptions);
      const fuseResults = fuse.search(query);
      setResults(fuseResults.map((result) => result.item));
    } else {
      setResults(data);
    }
  };

  const handleFilter = (key, filterValue) => {
    const filteredResults = results.filter((data) => {
      if (Array.isArray(data[key])) {
        return data[key].includes(filterValue);
      }
      return data[key] === filterValue;
    });
    if (filteredResults.length < 1) {
      return toast.error(`No pet found as ${filterValue}`);
    }
    setResults(filteredResults);
    console.log(results);
  };

  return (
    <>
      <div
        className={`${
          results.length > 4 ? "tw-h-full" : "tw-h-full lg:tw-h-[90vh]"
        } tw-w-full tw-bg-primary tw-flex tw-flex-col tw-mx-auto`}
      >
        <div className="tw-mx-auto tw-flex lg:tw-flex-row tw-flex-col tw-justify-between tw-bg-transparent tw-pt-8">
          <form className="tw-bg-quaternary tw-rounded-3xl ">
            <input
              type="text"
              placeholder="Search Pets...."
              className="md:tw-w-[70vw] lg:tw-w-[60vw] tw-bg-quaternary tw-rounded-3xl tw-border-r-0 tw-w-[80vw]"
              onChange={handleSearch}
            />
          </form>

          <div className="tw-pl-3 tw-flex lg:tw-flex-row tw-flex-col tw-gap-2 lg:tw-pt-0 tw-pt-4">
            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn btn-outline-light dropdown-toggle tw-rounded-2xl"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Category
              </button>
              <ul className="dropdown-menu">
                {catorgry.map((ele, i) => {
                  return (
                    <li key={i}>
                      <a
                        onClick={() => handleFilter("catorgry", ele)}
                        className="dropdown-item hover:tw-cursor-pointer hover:tw-font-semibold btn"
                      >
                        <p className="tw-text-primary">{ele}</p>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn btn-outline-light dropdown-toggle tw-rounded-2xl"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Personality
              </button>
              <ul className="dropdown-menu">
                {personality.map((ele, i) => {
                  return (
                    <li key={i}>
                      <a
                        onClick={() => handleFilter("personality", ele)}
                        className="dropdown-item hover:tw-cursor-pointer hover:tw-font-semibold"
                      >
                        <p className="tw-text-primary">{ele}</p>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="btn-group" role="group">
              <button
                type="button"
                className="btn btn-outline-light dropdown-toggle tw-rounded-2xl"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Behavior
              </button>
              <ul className="dropdown-menu">
                {Behaviors.map((ele, i) => {
                  return (
                    <li key={i}>
                      <a
                        onClick={() => handleFilter("behavior", ele)}
                        className="dropdown-item hover:tw-cursor-pointer hover:tw-font-semibold"
                      >
                        <p className="tw-text-primary">{ele}</p>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        {loading ? (
          <>
            <div className="tw-flex tw-flex-row tw-mt-[30vh] tw-mx-auto">
              <i className="fa fa-refresh fa-spin fa-5x fa-fw tw-text-quaternary"></i>
              <h1 className="tw-text-6xl tw-text-quaternary  tw-text-center">
                Loading...
              </h1>
            </div>
          </>
        ) : (
          <>
            <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-3 xl:tw-grid-cols-4 tw-mt-5 tw-mx-auto tw-gap-10">
              {results.map((ele, index) => {
                return (
                  <div
                    key={index}
                    className={`card tw-w-[16.5rem] tw-h-[56vh] ${
                      ele.isAdopted ? "tw-opacity-80" : "tw-opacity-100"
                    }`}
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

                      <Button
                        onClick={() => {
                          if (ele.isAdopted == true) {
                            toast.dark(
                              "Sorry! The pet is already been adopted."
                            );
                          } else {
                            handleShow(ele);
                          }
                        }}
                        className="btn  btn-outline-light tw-text-primary tw-bg-quaternary tw-border-solid tw-border-primary hover:tw-bg-primary hover:tw-text-quaternary"
                      >
                        Know More
                      </Button>
                      <Button
                        onClick={() => {
                          if (ele.isAdopted == true) {
                            toast.dark(
                              "Sorry! The pet is already been adopted."
                            );
                          } else {
                            handleShowMessage(ele);
                          }
                        }}
                        className="btn tw-font-bold btn-secondary tw-text-quaternary  tw-bg-primary tw-border-solid tw-border-primary hover:tw-bg-primary"
                      >
                        Meet {ele.name}
                      </Button>
                      <KnowMore
                        show={show}
                        handleClose={handleClose}
                        content={modalContent}
                      />
                      <SentMessage
                        show={showMessage}
                        handleClose={handleCloseMessage}
                        content={modalContent}
                      />
                      {/* <SentMessage ele={ele}/> */}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default Adoption;
