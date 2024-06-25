import React, { useState } from "react";
import { Button } from "react-bootstrap";
import thank from "../assets/thank.png";
import Footer from "../Components/Footer";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function FeedBack(props) {
    const navigate = useNavigate();
  const userToken = localStorage.getItem("Token");
  const [feedback, setFeedback] = useState("");
  const { currentuser } = useSelector((state) => state.user);
  const handleSubmitFeedback = async (e) => {
    e.preventDefault();
    if (!feedback || feedback.length < 10) {
      alert("Feedback messaage should be atlest 10 Char");
    }
    const requestData = {
      userId: currentuser._id,
      feedback: feedback,
    };
    await axios.post("https://petlov-backend.onrender.com/api/user/feedback", requestData, {
      headers: { token: userToken },
    })
    .then((res)=>{
        if(res.data.success == true){
            toast.success(res.data.message)
            navigate('/adoption')
        }
    })
    .catch((erroe)=>{
        toast.error(erroe)
    })
  };
  return (
    <div className=" tw-w-full tw-bg-primary">
      <div className="tw-flex md:tw-flex-row tw-flex-col tw-justify-evenly tw-p-5 md:tw-h-[90vh] tw-h-full">
        <div className=" tw-my-auto tw-flex-col tw-gap-5 tw-flex">
          <h1 className="tw-text-quaternary tw-mx-auto tw-font-bold tw-text-2xl">
            Help Us Improve Your PetLov Experience!
          </h1>
          <form
            onSubmit={handleSubmitFeedback}
            className="card tw-w-full tw-h-[35vh] md:tw-w-[40vw] tw-p-3"
          >
            <label className="form-label tw-mt-3">Your Feedback</label>
            <textarea
              className="tw-mt-3 form-control tw-rounded-lg"
              name="feedback"
              id="feedback"
              onChange={(e) => {
                setFeedback(e.target.value);
              }}
            ></textarea>
            <Button
              type="submit"
              className="tw-mx-16 btn btn-outline-light tw-mt-3 tw-bg-primary tw-text-quaternary tw-font-bold hover:tw-bg-primary hover:tw-text-quaternary"
            >
              Submit
            </Button>
          </form>
        </div>
        <div className="tw-w-full  md:tw-w-1/2 tw-p-10 tw-items-center tw-my-auto">
          <div className="tw-flex tw-flex-col tw-justify-center tw-mx-auto">
            <img
              src={thank}
              alt="Thnak You"
              className="tw-h-[60vh] md:tw-w-[40vw] tw-w-[80vw] tw-mx-auto"
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default FeedBack;
