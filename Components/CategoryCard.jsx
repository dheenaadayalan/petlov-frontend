import React from "react";

function CategoryCard({img, title}) {
  return (
    <div className="card tw-w-full md:tw-w-1/4 tw-h-[26rem] tw-bg-primary tw-p-4">
      <img
        src={img}
        className="card-img-top tw-h-[70%] tw-w-[75%] tw-mx-auto"
        alt="Dog Img"
      />
      <div className="card-body">
        <h5 className="card-title tw-font-bold tw-text-2xl tw-text-quaternary tw-text-center">
          {title}
        </h5>
        <button className="btn btn-light tw-w-full">Explore</button>
      </div>
    </div>
  );
}

export default CategoryCard;
