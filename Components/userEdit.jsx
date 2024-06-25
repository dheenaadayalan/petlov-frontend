import React, { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { signInFailure, signInStart, signInSuccess } from "../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";

YupPassword(Yup);

function UserEdit(props) {
  const [see, setSee] = useState(false);
  const { currentuser } = useSelector((state) => state.user);
  const userToken = localStorage.getItem("Token");
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Name is requried"),
    email: Yup.string()
      .required("Email is requried")
      .matches(/@[^.]*\./, "Enter a proper Email address"),
    password: Yup.string()
      .required("Password is requried")
      .min(
        8,
        "Password must contain 8 or more characters with at least one of each: uppercase, lowercase, number and special"
      )
      .minLowercase(1, "Password must contain at least 1 lower case letter")
      .minUppercase(1, "Password must contain at least 1 upper case letter")
      .minNumbers(1, "Password must contain at least 1 number")
      .minSymbols(1, "Password must contain at least 1 special character"),
  });
  const formik = useFormik({
    initialValues: {
      email: currentuser.email,
      username: currentuser.username,
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      dispatch(signInStart());
      await axios
        .post("https://petlov-backend.onrender.com/api/auth/update", values, {
          headers: { token: userToken },
        })
        .then((res) => {
          if (res.data.success == true) {
            toast.success(res.data.message);
            dispatch(signInSuccess(res.data.data));
            document
              .getElementById("closeit")
              .setAttribute("data-bs-dismiss", "modal");
          }
        })
        .catch((error) => {
          toast.error(error.data.message);
          dispatch(signInFailure(error.message));
        });
    },
  });
  function myFunction() {
    var x = document.getElementById("myInput2");
    if (x.type === "password") {
      x.type = "text";
      setSee(false);
    } else {
      x.type = "password";
      setSee(true);
    }
  }
  return (
    <div className="tw-ml-auto">
      <button
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        className=" btn tw-text-lg tw-bg-primary tw-text-quaternary hover:tw-border-primary hover:tw-border-solid"
      >
        Edit
      </button>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog tw-text-start">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Edit Profile
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="tw-mt-3">
                  <label className="form-label">
                    Name <span className="tw-text-red-700">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control tw-rounded-xl"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="text-danger">
                  <p>{formik.errors.username}</p>
                </div>
                <div className="tw-mt-3">
                  <label className="form-label">
                    Email <span className="tw-text-red-700">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-control tw-rounded-xl"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="text-danger">
                  <p>{formik.errors.email}</p>
                </div>
                <div className="tw-mt-3">
                  <label className="form-label">
                    Password <span className="tw-text-red-700">*</span>
                  </label>
                  <div className="tw-flex tw-flex-row form-control tw-border-gray-600 tw-rounded-xl tw-p-0 tw-m-0">
                    <input
                      id="myInput2"
                      type="password"
                      className="form-contrl tw-border-none tw-w-[94%] tw-outline-none tw-rounded-xl"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                    <div
                      onClick={myFunction}
                      className="tw-my-auto tw-h-full hover:tw-cursor-pointer"
                    >
                      {see ? <FaRegEye /> : <FaEyeSlash />}
                    </div>
                  </div>
                </div>
                <div className="text-danger">
                  <p>{formik.errors.password}</p>
                </div>
                <div className="modal-footer">
                  <button
                    id="closeit"
                    type="submit"
                    //data-bs-dismiss="modal"
                    className="btn tw-text-lg tw-bg-primary tw-text-quaternary hover:tw-border-primary hover:tw-border-solid"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserEdit;
