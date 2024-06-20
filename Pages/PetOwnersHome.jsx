import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import axios from "axios";

function PetOwnersHome({setPetId}) {
  const userToken = localStorage.getItem("Token");
  const [messagesData, setMessagesData] = useState(false);
  const [petsData, setPetsData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios
      .get("http://localhost:4000/api/user/petowner/data", {
        headers: { token: userToken },
      })
      .then((res) => {
        console.log();
        if (Object.keys(res.data.data).length > 0) {
          setMessagesData(false), setPetsData(res.data.data);
        }
      });
  };
  const handelEdit = (id)=>{
    setPetId(id)
    navigate(`/pet/owners/edit/${id}`)
  }
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
            {messagesData ? (
              <></>
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

                          <a
                          onClick={()=>{handelEdit(ele._id)}} 
                          className="btn tw-p-1 tw-text-quaternary tw-bg-primary hover:tw-border-solid hover:tw-border-2 hover:tw-border-primary">
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
