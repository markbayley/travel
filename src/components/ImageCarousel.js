import React, { useEffect, useRef, useState } from "react";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { ImportantDevices } from "@material-ui/icons";

const ImageCarousel = ({ photos, flag, name }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState();
  const carouselItemsRef = useRef([]);

  // const [favourites, setFavourites] = useState([]);

  // const addFavouriteMovie = (e, name) => {
  //   const newFavouriteList = [...favourites, name];
  //   setFavourites(newFavouriteList);
  // };

  // console.log(favourites, "favorites");

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
          behavior: "smooth",
        });
      }
    }
  };

  // const handleRightClick = () => {
  //   if (photos && photos.length > 0) {
  //     let newIdx = selectedImageIndex + 1;
  //     if (newIdx >= photos.length) {
  //       newIdx = 0;
  //     }
  //     handleSelectedImageChange(newIdx);
  //   }
  // };

  // const handleLeftClick = () => {
  //   if (photos && photos.length > 0) {
  //     let newIdx = selectedImageIndex - 1;
  //     if (newIdx < 0) {
  //       newIdx = photos.length - 1;
  //     }
  //     handleSelectedImageChange(newIdx);
  //   }
  // };

  return (
    <div className="carousel-container">
      <div
        className="selected-image"
        style={{
          position: "relative",
          backgroundImage: `url(${selectedImage?.urls.regular})`,
        }}
      >
        {/* <strong
          style={{
            float: "left",
            zIndex: 10,
            margin: '10px'
          }}
        >
          <img
            src={flag}
            alt="flag"
            width="25px"
            style={{ marginBottom: "3px" }}
          />{" "}
          {selectedImage?.location.name
            ? selectedImage?.location.name
            : "Unknown"}
        </strong> */}
        <IconButton
          button
          aria-label="share"
          style={{ position: "absolute", top: 10, right: 10, color: "#fff" }}
        >
          <Badge
            badgeContent={selectedImage?.likes}
            style={{ marginBottom: "25px", marginRight: "-25px" }}
          ></Badge>
          <FavoriteBorderIcon />
        </IconButton>
      </div>
      <h4
        style={{
          textTransform: "capitalize",
          whiteSpace: "nowrap",
          display: "flex",
        }}
      >
        <em
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            minWidth: "10%"
          }}
        >
          "
          {selectedImage?.alt_description
            ? selectedImage?.alt_description
            : "Unititled"}
          "
        </em>
        <img
          src={selectedImage?.user.profile_image.small}
          alt="avatar"
          style={{
            borderRadius: "15px",
            border: "1px solid gold",
            width: "20px",
            height: "20px",
            margin: "0px 5px 5px 5px",
          }}
        />

        {selectedImage?.user.name}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "100%",
          }}
        >
          <div>
            <strong>
              {selectedImage?.location.city
                ? selectedImage?.location.city
                : "Unknown"}
              , {name}
              <img
                src={flag}
                alt="flag"
                height="17px"
                style={{
                  marginBottom: "3px",
                  border: "1px solid gold",
                  marginLeft: "5px",
                }}
              />{" "}
            </strong>
          </div>
        </div>
      </h4>

      <div className="carousel">
        <div className="carousel__images">
          {photos &&
            photos.map((photo, idx) => (
              <div
                title={photo.location.name}
                onClick={() => handleSelectedImageChange(idx)}
                style={{ cursor: "pointer", backgroundImage: `url(${photo.urls.small})` }}
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
