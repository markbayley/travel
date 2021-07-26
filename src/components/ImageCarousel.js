import React, { useEffect, useRef, useState } from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import IconButton from "@material-ui/core/IconButton";

const ImageCarousel = ({ photos }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState();
  const carouselItemsRef = useRef([]);

  useEffect(() => {
    if (photos && photos[0]) {
      carouselItemsRef.current = carouselItemsRef.current.slice(
        0,
        photos.length
      );

      setSelectedImageIndex(0);
      setSelectedImage(photos[0]);
    }
  }, [photos]);

  const handleSelectedImageChange = (newIdx) => {
    if (photos && photos.length > 0) {
      setSelectedImage(photos[newIdx]);
      setSelectedImageIndex(newIdx);
      if (carouselItemsRef?.current[newIdx]) {
        carouselItemsRef?.current[newIdx]?.scrollIntoView({
          inline: "center",
          behavior: "smooth"
        });
      }
    }
  };

  const handleRightClick = () => {
    if (photos && photos.length > 0) {
      let newIdx = selectedImageIndex + 1;
      if (newIdx >= photos.length) {
        newIdx = 0;
      }
      handleSelectedImageChange(newIdx);
    }
  };

  const handleLeftClick = () => {
    if (photos && photos.length > 0) {
      let newIdx = selectedImageIndex - 1;
      if (newIdx < 0) {
        newIdx = photos.length - 1;
      }
      handleSelectedImageChange(newIdx);
    }
  };

  return (
    <div className="carousel-container">
      <div
        className="selected-image"
        style={{ backgroundImage: `url(${selectedImage?.urls.regular})` }}
      />
      <h4>
        <em style={{ textTransform: "capitalize" }}>
          "{selectedImage?.alt_description}"
        </em>{" "}
        by {selectedImage?.user.name}
        <strong style={{float: "right"}}>{selectedImage?.location.name}</strong>
      </h4>

      <div className="carousel">
        <div className="carousel__images">
          {photos &&
            photos.map((photo, idx) => (
              <div
                title={photo.location.name}
                onClick={() => handleSelectedImageChange(idx)}
                style={{ backgroundImage: `url(${photo.urls.small})` }}
                key={photo.id}
                className={`carousel__image ${
                  selectedImageIndex === idx && "carousel__image-selected"
                }`}
                ref={(el) => (carouselItemsRef.current[idx] = el)}
              />
            ))}
        </div>

        {/* <IconButton
          //   style={{ color: "#fff" }}
          className="carousel__button carousel__button-left"
          onClick={handleLeftClick}
        >
          <ArrowBackIosIcon />
        </IconButton>
        <IconButton
          //   style={{ color: "#fff" }}
          className="carousel__button carousel__button-right"
          onClick={handleRightClick}
        >
          <ArrowForwardIosIcon />
        </IconButton> */}
      </div>
    </div>
  );
};

export default ImageCarousel;