import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Fuse from "fuse.js";
import KnowMore from "../Components/KnowMore";
import SentMessage from "../Components/SentMessage";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function Adoption(props) {
  const userToken = localStorage.getItem("Token");
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
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
        .get("http://localhost:4000/api/user/pets/all", {
          headers: { token: userToken },
        })
        .then((response) => {
          setData(response.data.data);
          setResults(response.data.data);
          setModalContent(response.data.data[0]);
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

  return (
    <>
      <div
        className={`${
          results.length > 4 ? "tw-h-full" : "tw-h-full lg:tw-h-[90vh]"
        } tw-w-full tw-bg-primary tw-flex tw-flex-col`}
      >
        <nav className=" navbar navbar-expand-lg tw-bg-transparent tw-border-solid tw-border-primary tw-border-y-2 tw-px-5 tw-pt-8">
          <div className="container-fluid tw-mx-2 sm:tw-mx-10">
            <form className="tw-bg-quaternary tw-rounded-xl">
              <input
                type="text"
                placeholder="Search"
                className="md:tw-w-[40vw] tw-bg-quaternary tw-rounded-xl tw-border-r-0 tw-w-[80vw]"
                onChange={handleSearch}
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
        <div className="tw-w-full tw-mt-5">
          <div className="container">
            <div className="row g-4 justify-content-evenly">
              {results.map((ele, index) => {
                return (
                  <div
                    key={index}
                    className="card tw-w-[16.5rem] tw-h-[57vh] tw-pt-2 "
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
                        onClick={() => handleShow(ele)}
                        className="btn  btn-outline-light tw-text-primary tw-bg-quaternary tw-border-solid tw-border-primary hover:tw-bg-primary hover:tw-text-quaternary"
                      >
                        Know More
                      </Button>
                      <Button
                        onClick={() => handleShowMessage(ele)}
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Adoption;
