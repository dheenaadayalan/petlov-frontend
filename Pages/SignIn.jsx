import React, { useState } from "react";
import logo from "../assets/3771.jpg";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import * as Yup from "yup";
import YupPassword from "yup-password";
import { Link, useNavigate } from "react-router-dom";
import { signInFailure, signInStart, signInSuccess } from "../Redux/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";

YupPassword(Yup);

function SignIn(props) {
  const [see, setSee] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error: errorMessage } = useSelector((state) => state.user);

  const validationSchema = Yup.object().shape({
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
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(signInStart());
      await axios
        .post("https://petlov-backend.onrender.com/api/auth/sign-in", values)
        .then((res) => {
          if (res.data.success == false) {
            toast.error(res.data.message);
            dispatch(signInFailure(res.data.message));
          }
          if (res.data.success == true) {
            dispatch(signInSuccess(res.data.result));
            toast.success(res.data.message);
            localStorage.setItem("Token", res.data.token);
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.data);
          dispatch(signInFailure(error.message));
        });
    },
  });

  function myFunction() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
      x.type = "text";
      setSee(false);
    } else {
      x.type = "password";
      setSee(true);
    }
  }

  return (
    <>
      <div className="tw-w-full tw-bg-primary tw-h-[90vh] tw-py-5 tw-flex tw-flex-col md:tw-flex-row  tw-gap-4 tw-justify-center">
        <div className="tw-m-auto md:tw-w-[40%] tw-w-full tw-flex tw-flex-col tw-gap-3">
          <h1 className="tw-text-quaternary tw-font-bold md:tw-text-4xl tw-text-2xl md:tw-leading-normal tw-leading-normal md:tw-text-start tw-text-center">
            <span className="tw-bg-quaternary tw-border-solid tw-border-2 tw-rounded-2xl tw-text-primary tw-p-1 tw-mr-2">
              {" "}
              Unleash the Love!{" "}
            </span>
            Sign Up to Adopt Your New Pet
          </h1>
          <h6 className="tw-text-quaternary tw-font-semibold tw-text-md tw-hidden md:tw-block">
            Make a life-changing difference for a deserving animal. Sign up to
            browse adoptable pets and find your new best friend.
          </h6>
          <div className="md:tw-text-start tw-text-center ">
            <h3 className="tw-text-quaternary tw-underline tw-underline-offset-2">
              Don't have any account?{" "}
              <span className="tw-font-bold tw-bg-quaternary tw-border-solid tw-border-2 tw-rounded-2xl tw-text-primary tw-p-1 tw-mr-2">
                <Link to="/signup">Sign-up</Link>
              </span>
            </h3>
          </div>
        </div>

        <div className="card tw-w-[90%] md:tw-w-[30%] tw-h-[70%] md:tw-h-[90%] tw-m-auto tw-overflow-auto tw-p-5 tw-rounded-2xl signup tw-text-start">
          <img
            src={logo}
            className="card-img-top tw-h-[30%] tw-w-[40%] tw-mx-auto"
            alt="Dog Img"
          />
          <div className="card-body ">
            <form onSubmit={formik.handleSubmit}>
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
                    id="myInput"
                    type="password"
                    className="form-contrl tw-border-none tw-w-[94%] tw-outline-none tw-rounded-xl"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                  <div onClick={myFunction} className="tw-my-auto tw-h-full hover:tw-cursor-pointer">
                    {see ? <FaRegEye /> : <FaEyeSlash />}
                  </div>
                </div>
              </div>
              <div className="text-danger">
                <p>{formik.errors.password}</p>
              </div>
              <div className="tw-text-center tw-mt-5">
                <button
                  disabled={loading}
                  type="submit"
                  className="btn tw-mt-3 tw-text-primary hover:tw-bg-primary hover:tw-text-quaternary tw-border-primary tw-font-bold tw-border-2 tw-w-[70%]"
                >
                  {loading ? "Loading" : "Sign Up to Adopt!"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignIn;
