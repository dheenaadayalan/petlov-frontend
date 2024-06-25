import React, { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import PetPersonality from "./Personality";
import PetBehaviors from "./PetBehaviors";
import { storage } from "../src/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSelector } from "react-redux";
import PetCatorgry from "./PetCatorgry";

import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";


function AddPets(props) {
  const userToken = localStorage.getItem("Token");
  const { currentuser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is requried"),
    requirements: Yup.string().required("Requirements is requried"),
  });


  //For Images
  const [images, setImages] = useState([]);
  const [upImages, setUpImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  //For Data
  const [personality, setPersonality] = useState([]);
  const [Petbehavior, setPetBehaviors] = useState([]);
  const [catorgry, setCatorgry] = useState([])
  const picUrl = [];

  //Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      personality: personality,
      behavior: Petbehavior,
      requirements: "",
      petPictures: picUrl,
      catorgry:catorgry,
    },
    validationSchema,
    onSubmit: async (values) => {
      values.behavior = Petbehavior;
      values.personality = personality;
      values.petPictures = picUrl;
      values.catorgry = catorgry;
      if (upImages.length<1 || Petbehavior.length<1 || personality.length<1 ||catorgry.length<1){

        toast.error('Enter all the values')
        return
      }
      for (const property in upImages) {
        if (typeof upImages[property] == "object") {
          const imgRef = ref(
            storage,
            `pets/${currentuser._id}/${upImages[property].name}`
          );
          setUploading(true);
          await uploadBytes(imgRef, upImages[property])
            .then((snapshot) => {})
            .catch((error) => {
              setUploading(false);
              console.log(error);
              toast.error(error.message);
            });

          await getDownloadURL(
            ref(storage, `pets/${currentuser._id}/${upImages[property].name}`)
          )
            .then((url) => {
              picUrl.push(url);
              values.petPictures = picUrl;
              
            })
            .catch((error) => {
              setUploading(false);
              console.log(error);
              toast.error(error.message);
            });
        }
      }
      await axios
      .post('https://petlov-backend.onrender.com/api/user/petowner/pets/add',values,{
        headers: { token: userToken },
      })
      .then((res)=>{
        setUploading(false);
        toast.success(res.data.message);
        navigate("/pet/owners");
      })
      .catch((errer)=>{
        setUploading(false);
        console.log(errer);
        toast.error(errer.data.message)
      })
      
    },
  });

  return (
    <div className="">
      <form
        onSubmit={formik.handleSubmit}
        className="tw-w-full tw-h-full tw-py-[3%] tw-flex tw-flex-col tw-justify-center tw-items-center tw-bg-primary tw-gap-7"
      >
        <input
          type="text"
          name="name"
          placeholder={`Pets Name*`}
          className="tw-w-[90vw]  md:tw-w-[50vw] tw-rounded-xl"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <div className="text-danger">
          <p>{formik.errors.name}</p>
        </div>
        <div
          className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-[40vh] tw-w-[90vw]  md:tw-w-[50vw] tw-border-dotted tw-border-2 tw-border-quaternary tw-rounded-xl"
          onClick={() => document.querySelector(".input-img").click()}
        >
          <input
            type="file"
            accept="image/*"
            className="input-img"
            hidden
            multiple
            onChange={({ target: { files } }) => {
              if (files) {
                const newImages = Array.from(files).map((file) =>
                  URL.createObjectURL(file)
                );
                setUpImages(files);
                setImages([...images, ...newImages]);
              }
            }}
          />
          {images.length > 0 ? (
            <div
              className={`tw-w-full tw-h-full tw-grid tw-grid-cols-3 tw-gap-2 tw-overflow-y-auto ${
                uploading ? "tw-animate-pulse" : "tw-animate-none"
              }`}
            >
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`Selected ${index}`}
                  className="tw-w-full tw-h-full tw-object-cover tw-rounded"
                />
              ))}
            </div>
          ) : (
            <MdCloudUpload color="white" size={50} />
          )}
        </div>
        <div className="text-danger">
          <p>{formik.errors.petPictures}</p>
        </div>
        <PetPersonality setPersonality={setPersonality} />
        <div className="text-danger">
          <p>{formik.errors.personality}</p>
        </div>
        <PetBehaviors setPetBehaviors={setPetBehaviors} />
        <div className="text-danger">
          <p>{}</p>
        </div>
        <PetCatorgry setCatorgry={setCatorgry}/>
        <div className="text-danger">
          <p>{formik.errors.catorgry}</p>
        </div>
        <textarea
          className="tw-w-[90vw]  md:tw-w-[50vw] tw-rounded-xl"
          placeholder="Your requirements*"
          name="requirements"
          rows="4"
          cols="50"
          value={formik.values.requirements}
          onChange={formik.handleChange}
        ></textarea>
        <div className="text-danger">
          <p>{formik.errors.requirements}</p>
        </div>
        <button
          type="submit"
          className="btn btn-outline-light tw-text-2xl "
          disabled={uploading ? true : false}
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default AddPets;
