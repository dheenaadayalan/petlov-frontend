import React from "react";
import { Button, Modal } from "react-bootstrap";

function KnowMore({ show, handleClose, content }) {
  console.log(content.petPictures);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{content.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="tw-flex tw-flex-col">
          <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
              {content.petPictures.map((ele, index) => {
                return (
                  <div className="carousel-item active" key={index}>
                    <img
                      src={ele}
                      className="d-block w-100 tw-h-[40vh]"
                      alt="..."
                    />
                  </div>
                );
              })}
            </div>
            <button
              className="carousel-control-prev"
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
