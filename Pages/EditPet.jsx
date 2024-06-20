import React, { useEffect, useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import PetPersonality from "../Components/Personality";
import PetBehaviors from "../Components/PetBehaviors";
import { storage } from "../src/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useSelector } from "react-redux";
import PetCatorgry from "../Components/PetCatorgry";

import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

function EditPet({ petId }) {
  const userToken = localStorage.getItem("Token");
  const { currentuser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  //For Images
  const [images, setImages] = useState([]);
  const [upImages, setUpImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  //For Data
  const [personality, setPersonality] = useState([]);
  const [petBehaviors, setPetBehaviors] = useState([]);
  const [catorgry, setCatorgry] = useState([]);
  const [name, setName] = useState("");
  const [requirements, setRequirements] = useState("");
  const [picUrl, setPicUrl] = useState([]);
  const [oldPic, setOldPic] = useState([]);
  const [isAdopted, setisAdopted] = useState(false);

  useEffect(() => {
    fetchPetData();
  }, []);

  const fetchPetData = async () => {
    await axios
      .get(`http://localhost:4000/api/user/petowner/pets/edit/${petId}`, {
        headers: { token: userToken },
      })
      .then((res) => {
        const petData = res.data.data;
        setPersonality(petData.personality);
        setPetBehaviors(petData.behavior);
        setCatorgry(petData.catorgry);
        setOldPic(petData.petPictures);
        formik.values.name = petData.name;
        formik.values.requirements = petData.requirements;
      })
      .catch((error) => [toast.error(error.data.message)]);
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is requried"),
    personality: Yup.array().required("Personality is requried"),
    behavior: Yup.array().required("Behavior is requried"),
    requirements: Yup.string().required("Requirements is requried"),
    petPictures: Yup.array().required("PetPictures is requried"),
    catorgry: Yup.array().required("Catorgry is requried"),
  });

  //Formik
  const formik = useFormik({
    initialValues: {
      name: "",
      personality: personality,
      behavior: petBehaviors,
      requirements: "",
      petPictures: picUrl,
      catorgry: catorgry,
      isAdopted: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      values.behavior = petBehaviors;
      values.personality = personality;
      values.catorgry = catorgry;
      values.isAdopted = isAdopted;
      if (upImages.length < 1) {
        values.petPictures = oldPic;
      } else {
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
      }

      await axios
        .post(
          `http://localhost:4000/api/user/petowner/pets/update/${petId}`,
          values,
          {
            headers: { token: userToken },
          }
        )
        .then((res) => {
          setUploading(false);
          toast.success(res.data.message);
          navigate("/pet/owners");
        })
        .catch((errer) => {
          setUploading(false);
          console.log(errer.message);
          toast.error(errer.message);
        });
    },
  });

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete you pet") == true) {
      console.log("its in");
      await axios
        .delete(
          `http://localhost:4000/api/user/petowner/pets/delete/${petId}`,
          {
            headers: { token: userToken },
          }
        )
        .then((res) => {
          toast.success(res.message);
          navigate("/pet/owners");
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };
  return (
    <div className="">
      <form
        onSubmit={formik.handleSubmit}
        className="tw-w-full tw-h-full tw-py-[3%] tw-flex tw-flex-col tw-justify-center tw-items-center tw-bg-primary tw-gap-7"
      >
        <input
          type="text"
          name="name"
          placeholder={name}
          className="tw-w-[90vw]  md:tw-w-[50vw] tw-rounded-xl"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        <div className="text-danger">
          <p>{formik.errors.name}</p>
        </div>
        <div className="form-check form-switch tw-flex tw-flex-row tw-justify-between tw-w-[90vw] md:tw-w-[50vw] tw-pl-0">
          <label className="form-check-label tw-text-quaternary tw-font-bold tw-text-xl tw-text-start ">
            Has the pet been adopted
          </label>
          <input
            className="form-check-input unique-class"
            type="checkbox"
            role="switch"
            onChange={() => {
              isAdopted ? setisAdopted(false) : setisAdopted(true);
            }}
          />
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
        <p className="tw-text-2xl tw-text-quaternary">Old Photos</p>

        <div id="carouselExample" className="carousel slide tw-w-[90vw]  md:tw-w-[50vw]">
          <div className="tw-w-full ">
            {oldPic.map((ele, index) => {
              return (
                <div key={index} className="carousel-item active">
                  <img src={ele} className="d-block tw-h-[35vh] tw-mx-auto" alt="..." />
                </div>
              );
            })}
          </div>
          <button
            className="carousel-control-prev "
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <PetPersonality
          personality={personality}
          setPersonality={setPersonality}
        />
        <div className="text-danger">
          <p>{formik.errors.personality}</p>
        </div>
        <PetBehaviors
          petBehaviors={petBehaviors}
          setPetBehaviors={setPetBehaviors}
        />
        <div className="text-danger">
          <p>{formik.errors.behavior}</p>
        </div>
        <PetCatorgry catorgry={catorgry} setCatorgry={setCatorgry} />
        <div className="text-danger">
          <p>{formik.errors.catorgry}</p>
        </div>
        <textarea
          className="tw-w-[90vw]  md:tw-w-[50vw] tw-rounded-xl"
          placeholder={requirements}
          name="requirements"
          rows="4"
          cols="50"
          value={formik.values.requirements}
          onChange={formik.handleChange}
        ></textarea>
        <div className="text-danger">
          <p>{formik.errors.requirements}</p>
        </div>
        <div className="tw-flex tw-flex-row tw-justify-between tw-w-[90vw] md:tw-w-[50vw]">
          <button
            type="button"
            className="btn btn-outline-danger tw-text-2xl "
            disabled={uploading ? true : false}
            onClick={() => {
              handleDelete(petId);
            }}
          >
            Delete
          </button>
          <button
            type="submit"
            className="btn btn-outline-light tw-text-2xl "
            disabled={uploading ? true : false}
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditPet;
