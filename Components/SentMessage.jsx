import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function SentMessage({ show, handleClose, content }) {
  const navigate = useNavigate();
  const userToken = localStorage.getItem("Token");
  const { currentuser } = useSelector((state) => state.user);
  const validationSchema = Yup.object().shape({
    message: Yup.string().required("Message is requried"),
    number: Yup.number().required("Requried phone number"),
    address: Yup.string().required("Meeting point is requried"),
    meetingTime: Yup.date().required("Date and time is requried"),
  });

  const formik = useFormik({
    initialValues: {
      email: currentuser.email,
      fromId: currentuser._id,
      message: "",
      number: "",
      address: "",
      meetingTime: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      const requestData = {
        petId: content._id,
        petName: content.name,
        petOwnerId: content.petOwnerId,
        ...values,
      };
      await axios
        .post("http://localhost:4000/api/user/send/message", requestData, {
          headers: { token: userToken },
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.feedback.isFeedBackGiven == false) {
            toast.success(res.data.message)
            navigate("/feedback")
          }else{
            toast.success(res.data.message)
            navigate("/")
          }
        })
        .catch((error)=>{
          console.log(error);
        })
    },
  });

  return (
    <Modal
      show={show}
      onHide={() => {
        handleClose();
      }}
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title className="tw-font-bold tw-text-xl">
          <>
            <span className="tw-text-base tw-font-semibold">from:</span>
            {currentuser.username},
            <span className="tw-text-base tw-font-semibold">to:</span>
            {content.name}
          </>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="tw-flex tw-flex-col">
          <form onSubmit={formik.handleSubmit}>
            <div className="tw-mt-3">
              <label className="form-label">
                Message <span className="tw-text-red-700">*</span>
              </label>
              <textarea
                className="form-control tw-rounded-lg"
                name="message"
                value={formik.values.message}
                onChange={formik.handleChange}
              ></textarea>
            </div>
            <div className="text-danger">
              <p>{formik.errors.message}</p>
            </div>
            <div className="tw-mt-3">
              <label className="form-label">
                Phone Number <span className="tw-text-red-700">*</span>
              </label>
              <input
                type="number"
                className="form-control tw-rounded-lg"
                name="number"
                value={formik.values.number}
                onChange={formik.handleChange}
              />
            </div>
            <div className="text-danger">
              <p>{formik.errors.number}</p>
            </div>
            <div className="tw-mt-3">
              <label className="form-label">
                Place, Date n Time <span className="tw-text-red-700">*</span>
              </label>
              <div className="tw-flex tw-flex-row  tw-gap-4">
                <div className="tw-flex tw-flex-col">
                  <input
                    type="text"
                    className="form-control tw-rounded-lg"
                    name="address"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    placeholder="Place"
                  />
                  <div className="text-danger">
                    <p>{formik.errors.address}</p>
                  </div>
                </div>
                <div className="tw-flex tw-flex-col">
                  <input
                    type="datetime-local"
                    className="tw-rounded-xl"
                    name="meetingTime"
                    value={formik.values.meetingTime}
                    onChange={formik.handleChange}
                  />
                  <div className="text-danger">
                    <p>{formik.errors.meetingTime}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="tw-mt-4 tw-justify-end tw-flex">
              <Button
                type="submit"
                onChange={()=>{}}
                className="btn btn-outline-light tw-bg-primary tw-text-quaternary tw-font-bold hover:tw-bg-primary hover:tw-text-quaternary"
              >
                Request vist
              </Button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default SentMessage;
