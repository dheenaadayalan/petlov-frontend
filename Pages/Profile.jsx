import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import UserEdit from "../Components/userEdit";
import winner from "../assets/winner.png";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../src/firebase";
import { toast } from "react-toastify";
import { signInSuccess } from "../Redux/userSlice";

function Profile(props) {
  const dispatch = useDispatch();
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();
  const { currentuser } = useSelector((state) => state.user);
  const [isPetOwner, setIsPetOwner] = useState(false);
  const userToken = localStorage.getItem("Token");
  const [petOwnerData, setPetOwnerData] = useState(null);
  const [img, setImg] = useState([]);
  const imgU = [];
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    await axios
      .get("https://petlov-backend.onrender.com/api/user/profile/petowner", {
        headers: { token: userToken },
      })
      .then((res) => {
        setPetOwnerData(res.data.data);
        setIsPetOwner(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="tw-bg-primary tw-py-[5%] md:tw-h-[90vh] tw-w-full tw-h-full tw-flex md:tw-flex-row tw-flex-col tw-justify-center tw-gap-10">
      <div className="card md:tw-w-[30%] tw-w-[80%] tw-text-center md:tw-mx-0 tw-mx-auto ">
        <div className="card-body tw-flex tw-flex-col tw-justify-between">
          <div className="">
            <figure>
              <img
                src={currentuser.profilePicture}
                alt="profile pic"
                className="tw-w-[40%] tw-mx-auto tw-rounded-2xl"
              />
              <figcaption>
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  className="input-img"
                  style={{ display: "none" }}
                  onChange={async (e) => {
                    setUploading(true);
                    imgU.push(e.target.files[0]);
                    if (!imgU) {
                      return;
                    }
                    const imgRef = ref(
                      storage,
                      `profile/${currentuser._id}/${imgU[0].name}`
                    );
                    await uploadBytes(imgRef, imgU[0])
                      .then((snapshot) => {
                        // toast.success("Uploaded successfully");
                      })
                      .catch((error) => {
                        setUploading(false);
                        console.log(error);
                        toast.error(error.message);
                      });
                    const url = await getDownloadURL(
                      ref(storage, `profile/${currentuser._id}/${imgU[0].name}`)
                    ).catch((error) => {
                      setUploading(false);
                      console.log(error);
                      toast.error(error.message);
                    });
                    const newPic = {
                      profilePicture: url,
                    };
                    console.log(newPic);
                    await axios
                      .post(
                        "https://petlov-backend.onrender.com/api/user/update/profile",
                        newPic,
                        {
                          headers: { token: userToken },
                        }
                      )
                      .then((res) => {
                        setUploading(false);
                        dispatch(signInSuccess(res.data.data));
                        toast.success(res.data.message);
                      })
                      .catch((errer) => {
                        setUploading(false);
                        console.log(errer.message);
                        toast.error(errer.message);
                      });
                  }}
                />
                <button
                  disabled={uploading}
                  className="hover:tw-bg-primary tw-rounded-lg tw-mt-3 hover:tw-text-quaternary tw-p-1"
                  onClick={() => {
                    document.getElementById("file").click();
                  }}
                >
                  Edit Pic
                </button>
              </figcaption>
            </figure>
            <h1 className="card-title tw-font-bold tw-text-2xl tw-mt-3">
              Welcome,{currentuser.username}
            </h1>
            <h1 className="card-title">{currentuser.email}</h1>
            <div className="card tw-flex tw-flex-row tw-justify-between tw-px-3 tw-my-3 tw-bg-quaternary tw-shadow-2xl">
              <div className="card-title tw-my-auto">
                Privacy & personalization
              </div>
              <a href="" className="tw-my-auto">
                <FaArrowRight />
              </a>
            </div>
            <div className="card tw-flex tw-flex-row tw-justify-between tw-px-3 tw-my-3 tw-bg-quaternary tw-shadow-2xl">
              <div className="card-title tw-my-auto">Legal & Terms</div>
              <a href="" className="tw-my-auto">
                <FaArrowRight />
              </a>
            </div>
          </div>
          <UserEdit />
        </div>
      </div>
      <div className="card tw-w-[80%] md:tw-w-[50%]  tw-text-center md:tw-mx-0 tw-mx-auto ">
        <div className="card-body tw-align-middle">
          {isPetOwner ? (
            <>
              {/* <div className="card tw-col-span-2 tw-bg-quaternary tw-shadow-2xl tw-w-[65%] tw-mx-auto"> */}
              <img
                src={winner}
                alt="winner pic"
                className="tw-h-[30vh] tw-m-auto"
              />
              <div className="card tw-bg-primary tw-text-quaternary tw-p-5 tw-mx-10 tw-text-start">
                <div className="tw-flex tw-flex-row">
                  <h1 className="tw-w-2/5 tw-text-lg tw-italic">Location:</h1>
                  <h1 className="tw-w-3/5 tw-text-lg tw-font-semibold">
                    {petOwnerData.address}
                  </h1>
                </div>
                <div className="tw-w-1/2 tw-p-3">
                  <hr />
                </div>
                <div className="tw-flex tw-flex-row">
                  <h1 className="tw-w-2/5 tw-text-lg tw-italic">
                    Pets Listed:
                  </h1>
                  <h1 className="tw-w-3/5 tw-text-lg tw-font-semibold">
                    <span className="card tw-inline tw-px-2 tw-rounded-2xl tw-text-primary">
                      {petOwnerData.pets.length}
                    </span>{" "}
                    Pet's
                  </h1>
                </div>
                <div className="tw-ml-[50%] tw-p-3">
                  <hr />
                </div>
                <div className="tw-flex tw-flex-row">
                  <h1 className="tw-w-2/5 tw-text-lg tw-italic">
                    Member from:
                  </h1>
                  <h1 className="tw-w-3/5 tw-text-lg tw-font-semibold">
                    {petOwnerData.createdAt.slice(0, 10)}
                  </h1>
                </div>
              </div>
              {/* </div> */}
            </>
          ) : (
            <>
              <h1 className="card-title tw-text-2xl tw-font-semibold">
                Your not a pet owner🐕
              </h1>
              <button
                onClick={() => navigate("/signup-petowner")}
                className="btn btn-lg tw-bg-primary tw-text-quaternary hover:tw-border-solid hover:tw-border-primary"
              >
                Sign up to PetOwner
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
