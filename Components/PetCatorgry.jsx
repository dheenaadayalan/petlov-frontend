import React, { useEffect, useState } from "react";

function PetCatorgry({ setCatorgry, catorgry }) {
  const [arrayTwo, setArrayTwo] = useState([
    "Dogs",
    "Cats",
    "Small Animals",
    "Fish",
    "Birds",
    "Reptiles",
    "Exotic Pets",
    "Toads",
    "Horses",
    "Adoption & Rescued",
    "Others",
  ]);
  const [arrayOne, setArrayOne] = useState([]);

  useEffect(() => {
    setArrayOne(catorgry || []);
  }, [catorgry]);

  const handleItemClick = (
    item,
    fromArray,
    setFromArray,
    toArray,
    setToArray
  ) => {
    if (!fromArray.includes(item)) {
      return;
    } else {
      const newFromArray = fromArray.filter((i) => i !== item);
      const newToArray = [...toArray, item];
      setFromArray(newFromArray);
      setToArray(newToArray);
      if (fromArray == arrayTwo) {
        setCatorgry(newToArray);
      }
      if (fromArray == arrayOne) {
        setCatorgry(newFromArray);
      }
    }
  };

  const markedArrayTwo = arrayTwo.map((item) =>
    arrayOne.includes(item) ? `hidden-${item}` : item
  );

  return (
    <div className="md:tw-w-[50vw] tw-w-[90vw] tw-h-full tw-flex tw-flex-col tw-bg-quaternary tw-rounded-2xl tw-px-2 tw-pt-2">
      <div className="tw-w-full tw-h-full tw-border-solid tw-border-primary tw-p-2">
        {arrayOne.length > 0 ? (
          <ul className="tw-flex tw-flex-wrap hover:tw-cursor-pointer">
            {arrayOne.map((item) => (
              <li
                key={item}
                onClick={() =>
                  handleItemClick(
                    item,
                    arrayOne,
                    setArrayOne,
                    arrayTwo,
                    setArrayTwo
                  )
                }
                className="tw-px-4 tw-py-2 tw-mr-4 tw-rounded-xl tw-bg-primary tw-text-quaternary"
              >
                {item}
              </li>
            ))}
          </ul>
        ) : (
          <p className="tw-font-bold ">Select your Pet Category</p>
        )}
      </div>
      <div className="tw-w-full tw-h-full tw-border-t-4 tw-border-solid tw-border-primary tw-pb-0">
        <ul className="tw-flex tw-flex-wrap hover:tw-cursor-pointer tw-h-[6.2rem] signup tw-overflow-auto">
          {markedArrayTwo.map((item,index) => (
            <li
              key={`arrayTwo-${item}-${index}`}
              onClick={() =>
                handleItemClick(
                  item,
                  arrayTwo,
                  setArrayTwo,
                  arrayOne,
                  setArrayOne
                )
              }
              className="tw-px-3 tw-py-2 tw-m-1 tw-border-solid tw-border tw-border-primary tw-rounded-xl"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default PetCatorgry;
