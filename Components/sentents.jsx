import React, { useEffect, useState } from "react";

function Sentents(props) { 
  const sentences = [
    "You must be 18 years or older to donate a pet.",
    "You agree to truthfully represent your pet's health and temperament.",
    "We may use your contact information to follow up on the rehoming process.",
    "ou acknowledge transferring ownership of your pet upon successful adoption.",
    "We reserve the right to verify pet information and deny unsuitable placements.",
  ];
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSentenceIndex(
        (prevIndex) => (prevIndex + 1) % sentences.length
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [sentences.length]);
  return (
    <div className="tw-p-4">
      <h1>
      <span
      className="tw-text-primary tw-font-bold tw-text-2xl  md:tw-text-4xl tw-mb-5 tw-rounded-2xl tw-border-solid tw-bg-white tw-p-1">
      Terms And Conditons!
      </span>
      </h1>
      <ol className="tw-list-decimal tw-space-y-2 md:tw-ml-16 tw-mt-5" type="1">
        {sentences.map((sentence, index) => (
          <li
            key={index}
            className={`tw-transition-opacity tw-text-quaternary tw-duration-1000 ${
              index === currentSentenceIndex ? "tw-opacity-100 tw-font-bold md:tw-text-2xl tw-text-xl tw-italic" : "tw-opacity-50"
            }`}
          >
            {sentence}
          </li>
        ))}
      </ol>
    </div>
  );
}

export default Sentents;
