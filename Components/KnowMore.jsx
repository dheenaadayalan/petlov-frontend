import React from "react";
import { Button, Modal, Carousel } from "react-bootstrap";
import { FaLocationDot } from "react-icons/fa6";

function KnowMore({ show, handleClose, content }) {
  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header className="" closeButton>
        <Modal.Title>
          <div className="tw-flex tw-flex-col tw-gap-1">
            <h1 className="tw-font-bold tw-text-2xl">{content.name}</h1>
            <p className="tw-font-semibold tw-flex tw-flex-row tw-align-bottom tw-text-base">
              <FaLocationDot />
              {content.address}
            </p>
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="tw-flex tw-flex-col tw-justify-evenly">
          <div className="">
            <Carousel>
              {content.petPictures.map((ele, i) => {
                return (
                  <Carousel.Item key={i}>
                    <img
                      src={ele}
                      alt={`${content.name}'s pics`}
                      className="tw-h-[30vh] tw-w-full"
                    />
                  </Carousel.Item>
                );
              })}
            </Carousel>
          </div>
          <div className="tw-grid tw-grid-cols-4 tw-gap-4 tw-mt-3">
            <div className="tw-col-span-1">
              <p>Behavior</p>
            </div>
            <div className="tw-col-span-3">
              <ul className="tw-flex tw-flex-wrap hover:tw-cursor-pointer">
                {content.behavior.map((item) => (
                  <li
                    key={item}
                    className="tw-px-4 tw-py-2 tw-mr-4 tw-rounded-xl tw-bg-primary tw-text-quaternary"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="tw-grid tw-grid-cols-4 tw-gap-4 tw-mt-3">
            <div className="tw-col-span-1">
              <p>Personality</p>
            </div>
            <div className="tw-col-span-3">
              <ul className="tw-flex tw-flex-wrap hover:tw-cursor-pointer">
                {content.personality.map((item) => (
                  <li
                    key={item}
                    className="tw-px-4 tw-py-2 tw-mr-4 tw-rounded-xl tw-bg-primary tw-text-quaternary"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className=" tw-grid tw-grid-cols-4 tw-gap-4 tw-mt-3">
            <div className="tw-col-span-1">
              <p>Owners Requirement</p>
            </div>
            <div className="tw-col-span-3">{content.requirements}</div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default KnowMore;
