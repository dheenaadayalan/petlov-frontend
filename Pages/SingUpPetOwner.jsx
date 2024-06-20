import React from "react";
import Sentents from "../Components/sentents";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { signInFailure, signInStart } from "../Redux/userSlice";
import { toast } from "react-toastify";

const SingUpPetOwner = () => {
  const userToken = localStorage.getItem("Token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentuser } = useSelector((state) => state.user);

  const validationSchema = Yup.object().shape({
    address:Yup.string().required("Address is requried"),
    dob:Yup.string().required("Data for birth is requried"),
  })

  const formik = useFormik({
    initialValues: {
      email:currentuser.email,
      username: currentuser.username,
      address:"",
      dob:"",
      isPetOwner:true,
    },
    validationSchema,
    onSubmit: async (values)=>{
      dispatch(signInStart());
      await axios
      .post('http://localhost:4000/api/user/petowner/signup', values,{
        headers: { token: userToken },
      } )
      .then((res)=>{
        toast.success(res.data.message)
        localStorage.setItem('Token',res.data.token)
        navigate("/pet/owners");
      })
      .catch((error)=>{
        toast.error(error.data.message);
        dispatch(signInFailure(error.message));
      })
    }
  })

  return (
    <div className="tw-bg-primary tw-w-full tw-h-full md:tw-h-[90vh] tw-px-[10%] tw-pt-[6%]">
      <div className="tw-flex tw-flex-col-reverse md:tw-flex-row tw-justify-evenly tw-mx-auto">
        <div className="md:tw-w-1/2  tw-flex-none">
          <Sentents />
        </div>
        <div className="md:tw-w-1/2 tw-h-[52vh] signup tw-rounded-2xl tw-flex-none md:tw-mb-0 tw-mb-16 ">
          <div className="card tw-w-full ">
            <div className="card-body">
            <h1 className="card-title tw-text-center tw-text-xl tw-font-semibold">Sign-Up to find a home</h1>
              <form onSubmit={formik.handleSubmit}>
              <div className="tw-mt-3">
                <label className="form-label">
                  Name <span className="tw-text-red-700">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  placeholder={formik.values.username}
                  value={formik.values.username}
                  disabled
                />
              </div>
              <div className="tw-mt-3">
                <label className="form-label">
                  Email <span className="tw-text-red-700">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  placeholder={formik.values.email}
                  value={formik.values.email}
                  disabled
                />
              </div>
              <div className="tw-mt-3">
                <label className="form-label">
                  Address <span className="tw-text-red-700">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="text-danger">
                <p>{formik.errors.address}</p>
              </div>
              <div className="tw-mt-3">
                <label className="form-label">
                  Data of Birth <span className="tw-text-red-700">*</span>
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="dob"
                  value={formik.values.dob}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="text-danger">
                <p>{formik.errors.dob}</p>
              </div>
              <button
              type="submit"
              className="btn tw-mt-3 tw-text-primary hover:tw-bg-primary hover:tw-text-quaternary tw-border-primary tw-font-bold tw-border-2 tw-w-full"
              >
                Submit
              </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingUpPetOwner;
