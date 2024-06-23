import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import axios from "axios";
import { toast } from "react-toastify";

function PetOwnersHome({ setPetId }) {
  const userToken = localStorage.getItem("Token");
  const [messagesData, setMessagesData] = useState([]);
  const [petsData, setPetsData] = useState([]);
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [pet, setPet] = useState();

  const handleDivClick = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    fetchData();
    fetchDataMessage();
  }, []);

  const fetchData = async () => {
    await axios
      .get("http://localhost:4000/api/user/petowner/data", {
        headers: { token: userToken },
      })
      .then((res) => {
        if (Object.keys(res.data.data).length > 0) {
          setPetsData(res.data.data);
          console.log(petsData);
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const fetchDataMessage = async () => {
    await axios
      .get("http://localhost:4000/api/user//get/all/petowner/message", {
        headers: { token: userToken },
      })
      .then((res) => {
        if (res.data.message.length > 0) {
          setMessagesData(res.data.message);
        }
      })
      .catch((error) => {
        toast.error(error);
      });
  };
  const handelEdit = (id) => {
    setPetId(id);
    navigate(`/pet/owners/edit/${id}`);
  };

  const petName = (id) => {
    let name = Object.keys(petsData).find((petsData) =>
      console.log(petsData._id)
    );
    console.log(name);
    //return name
  };
  return (
    <>
      <div
        className={`tw-bg-primary tw-w-full tw-h-full ${
          Object.keys(petsData).length > 0 ? "md:tw-h-full" : "md:tw-h-[90vh]"
        } tw-py-5 tw-px-[5%]`}
      >
        <h1 className="tw-text-4xl tw-text-quaternary">Manage your pets</h1>
        <div className="tw-py-10 tw-flex tw-flex-col tw-justify-evenly tw-gap-5">
          <h1 className="tw-text-2xl tw-text-quaternary">Messages</h1>
          <div className="card tw-mx-5 tw-h-[40vh]">
            {messagesData.length > 0 ? (
              <>
                <div className="card tw-flex tw-flex-row tw-h-[40vh]">
                  <div className="card tw-w-1/4 tw-overflow-auto tw-border-r-2 tw-border-primary tw-m-0 tw-p-0">
                    {messagesData.map((ele, i) => {
                      return (
                        <div
                          onClick={() => handleDivClick(i)}
                          className={`hover:tw-cursor-pointer tw-border-b-2 tw-p-2 tw-border-primary ${
                            activeIndex === i
                              ? "tw-bg-primary tw-text-quaternary"
                              : "tw-bg-quaternary tw-text-primary"
                          }`}
                          key={i}
                        >
                          <p>From:</p>
                          <p>{ele.email}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div className="tw-p-3 tw-overflow-auto tw-w-3/4">
                  <div className="tw-flex tw-flex-row">
                      <h1 className="tw-w-1/5 tw-text-lg tw-italic">
                        Pet Willing to adopt:
                      </h1>
                      <h1 className="tw-w-4/5 tw-text-lg tw-font-semibold">
                        {messagesData[activeIndex].petName}
                      </h1>
                    </div>
                    <div className="tw-flex tw-flex-row">
                      <h1 className="tw-w-1/5 tw-text-lg tw-italic">From:</h1>
                      <h1 className="tw-w-4/5 tw-text-lg tw-font-semibold">
                        {messagesData[activeIndex].email}
                      </h1>
                    </div>
                    <div className="tw-flex tw-flex-row">
                      <h1 className="tw-w-1/5 tw-text-lg tw-italic">Number:</h1>
                      <h1 className="tw-w-4/5 tw-text-lg tw-font-semibold">
                        {messagesData[activeIndex].number}
                      </h1>
                    </div>
                    <div className="tw-flex tw-flex-row">
                      <h1 className="tw-w-1/5 tw-text-lg tw-italic">
                        Message:
                      </h1>
                      <h1 className="tw-w-4/5 tw-text-lg tw-font-semibold">
                        {messagesData[activeIndex].message}
                      </h1>
                    </div>
                    <div className="tw-flex tw-flex-row">
                      <h1 className="tw-w-1/5 tw-text-lg tw-italic">
                        Meeting point:
                      </h1>
                      <h1 className="tw-w-4/5 tw-text-lg tw-font-semibold">
                        {messagesData[activeIndex].address}
                      </h1>
                    </div>
                    <div className="tw-flex tw-flex-row">
                      <h1 className="tw-w-1/5 tw-text-lg tw-italic">
                        Date n Time:
                      </h1>
                      <h1 className="tw-w-4/5 tw-text-lg tw-font-semibold">
                        {messagesData[activeIndex].meetingTime.slice(0, 10)}
                        <span className="tw-mx-2">at</span>
                        <span>
                          {messagesData[activeIndex].meetingTime.slice(11, 16)}
                        </span>
                      </h1>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="tw-mx-auto tw-my-auto">
                  <h1 className="tw-text-2xl tw-text-primary">
                    You no messages yet😃
                  </h1>
                </div>
              </>
            )}
          </div>
          <div className="tw-flex tw-flex-row tw-justify-between">
            <p className="tw-text-2xl tw-text-quaternary">Your Pets</p>
            <hr className="tw-w-1/4 md:tw-w-2/3 tw-my-auto tw-text-quaternary " />
            <button
              className="btn btn-outline-light "
              onClick={() => {
                navigate("/add/pets");
              }}
            >
              Add a Pet
            </button>
          </div>
          {Object.keys(petsData).length > 0 ? (
            <>
              <div className="container">
                <div className="row g-4 justify-content-evenly">
                  {/* card tw-w-[16.5rem] tw-h-[40vh] */}
                  {petsData.map((ele, index) => {
                    return (
                      <div
                        key={index}
                        className="card tw-w-[16.5rem] tw-h-[50vh] tw-pt-2 "
                      >
                        <img
                          src={ele.petPictures[0]}
                          className="card-img-top tw-h-[25vh]"
                          alt="..."
                        />
                        <div className="card-body tw-flex tw-flex-col tw-justify-between">
                          <h5 className="card-title tw-text-2xl tw-font-bold tw-text-primary">
                            {ele.name}
                          </h5>
                          <div className="tw-flex tw-flex-row tw-justify-start tw-gap-5">
                            <p className="tw-text-lg tw-font-semibold tw-text-primary">
                              Category:
                            </p>
                            <p className="tw-text-base tw-font-semibold tw-text-primary">
                              {ele.catorgry[0]}
                            </p>
                          </div>

                          <a
                            onClick={() => {
                              handelEdit(ele._id);
                            }}
                            className="btn tw-p-1 tw-text-quaternary tw-bg-primary hover:tw-border-solid hover:tw-border-2 hover:tw-border-primary"
                          >
                            Edit
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="tw-mx-auto tw-my-auto">
                <h1 className="tw-text-2xl tw-text-quaternary">
                  You have not yet added any pets!
                </h1>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PetOwnersHome;
