import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PetOwnersHome from "./PetOwnersHome";
import PetOwnersLanding from "./PetOwnersLanding";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function PetOwners({setPetId}) {
  const [loading, setLoading] = useState(true);
  const userToken = localStorage.getItem("Token");
  const [isPetOwner, setPetOwner] = useState(false);
  const navigate = useNavigate();

  if (userToken) {
    useEffect(() => {
      fetchState();
    }, []);
  }

  if (!userToken) {
    useEffect(() => {
      navigate("/signup");
    }, []);
  }

  const fetchState = async () => {
    await axios
      .get("http://localhost:4000/api/user/petowner", {
        headers: { token: userToken },
      })
      .then((res) => {
        console.log(res.data.isPetOwner);
        if (res.data.isPetOwner == true) {
          setPetOwner(true);
        }
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.data.isPetOwner == false) {
          setPetOwner(false);
          setLoading(false);
        }
      });
  };

  return (
    <>
      {loading ? (
        <>
          <div className="tw-w-full tw-h-[90vh] tw-m-auto">
            <h1 className="tw-w-[50vw]"><AiOutlineLoading3Quarters /> </h1>
          </div>
        </>
      ) : (
        <>{isPetOwner ? <PetOwnersHome setPetId={setPetId}/> : <PetOwnersLanding />}</>
      )}
    </>
  );
}

export default PetOwners;
