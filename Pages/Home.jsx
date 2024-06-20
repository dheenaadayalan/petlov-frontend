import React from "react";
import homePic from "../assets/home.png";
import dog from "../assets/c-dog.png";
import cat from "../assets/c-cat.png";
import rabbit from "../assets/c-rabbit.png";
import CategoryCard from "../Components/CategoryCard";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../Components/Footer";

function Home(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentuser } = useSelector((state) => state.user);
  return (
    <div>
      <div className="tw-bg-primary tw-w-full tw-p-4 tw-h-[90vh] tw-flex tw-flex-col md:tw-flex-row tw-items-center tw-justify-center tw-gap-5">
        <div className="md:tw-w-1/2 tw-flex tw-flex-col tw-gap-7">
          <h1 className="tw-text-4xl tw-text-quaternary tw-font-bold tw-text-center md:tw-text-start">
            Find Your Furever Friend: Adopt a Loving Pet Today!
          </h1>
          <h6 className="tw-text-lg tw-text-quaternary tw-text-start">
            Looking for love on four legs? Find your perfect match here!
          </h6>
          {currentuser ? (
            <>
              <button type="button" className="btn btn-light tw-max-w-sm tw-rounded-lg tw-font-bold tw-text-xl tw-text-primary" onClick={()=>navigate('/adoption')}>
                Find Your Pet
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-light tw-max-w-sm tw-rounded-lg tw-font-bold tw-text-xl" onClick={()=>navigate('/signup')}>
                Find Your Pet
              </button>
            </>
          )}
        </div>
        <img
          src={homePic}
          alt="Pic of a dog and a cat"
          className="tw-w-[85%] tw-h-[80%] md:tw-w-[40%]"
        />
      </div>
      <div className="tw-bg-quaternary tw-w-full tw-p-6 tw-h-full md:tw-h-[90vh] ">
        <div className="tw-flex tw-flex-row tw-justify-between">
          <h1 className="tw-text-4xl tw-font-semibold tw-text-primary">
            Category
          </h1>
          <button className="btn tw-text-primary hover:tw-bg-primary hover:tw-text-quaternary tw-border-primary tw-border-2">
            Explore all
          </button>
        </div>
        <div className="tw-flex tw-flex-col md:tw-flex-row tw-gap-14 tw-items-center tw-justify-center tw-py-6 tw-mt-2">
          <CategoryCard img={dog} title={"Dogs"} />
          <CategoryCard img={rabbit} title={"Rabbits"} />
          <CategoryCard img={cat} title={"Cats"} />
        </div>
      </div>
      <div className="tw-bg-primary tw-w-full tw-p-6 tw-h-full md:tw-h-[90vh]">
        <div className="tw-flex tw-flex-row tw-justify-between">
          <h1 className="tw-text-4xl tw-font-semibold tw-text-quaternary">
            Pets
          </h1>
          <button 
          onClick={()=>{navigate('/adoption')}}
          className="btn tw-text-quaternary hover:tw-bg-quaternary hover:tw-text-primary tw-border-quaternary tw-border-2">
            Explore all
          </button>

        </div>
        <div className="tw-flex tw-flex-col md:tw-flex-row tw-gap-14 tw-items-center tw-justify-center tw-p-6 tw-mt-2">
          <div className=""></div>
        </div>
      </div>
      <Footer bgCol='quaternary'/>
    </div>
  );
}

export default Home;
